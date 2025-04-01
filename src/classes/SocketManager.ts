import { LancerAlternative } from "@/enums/LancerAlternative";
import { Logger } from "@/classes/Logger";

export class SocketManager 
{
    private static instance: SocketManager;
    public static getInstance(): SocketManager
    {
        if (!SocketManager.instance)
        {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }

    private socketName: string = `module.${LancerAlternative.Name}`;
    private socket: io.Socket;
    private registeredFunctions: Map<string, (...args: any[]) => void> = new Map();
    private awaitingResponse: Map<string, (data: any) => void> = new Map();

    private constructor()
    {
        if (!game.socket)
        {
            throw new Error("Lancer Alternative Sheets: SocketManager initialized before Foundry socket is available.");
        }
        this.socket = game.socket;
        this.socket.on(
            this.socketName,
            (
                data: any,
                caller: string
            ) =>
            {
                //@ts-expect-error
                if (data.type === "GM" && game.user.isGM)
                {
                    //@ts-expect-error
                    Logger.log(`GM proxy for ${data.func} requested by ${game.users?.get(caller).name}`, data);

                    const func = this.registeredFunctions.get(data.func);
                    if (!func)
                    {
                        throw new Error(`Function ${data.func} is not registered.`);
                    }
                    const response = func(...data.args);
                    if (data.responseID)
                    {
                        this.socket.emit(
                            this.socketName,
                            {
                                type: "response",
                                func: data.func,
                                args: response,
                                responseID: data.responseID,
                            }
                        );
                    }
                }
                if (data.type === "response")
                {
                    const callback = this.awaitingResponse.get(data.responseID);
                    if (!callback)
                    {
                        return;
                    }
                    Logger.log(`Response for ${data.func} received`, data.args);
                    callback(data.args);
                    this.awaitingResponse.delete(data.func);
                }
            });
    }

    public register(func: (...args: any[]) => void)
    {
        if (this.registeredFunctions.has(func.name))
        {
            throw new Error(`Function is already registered.`);
        }
        const wrappedCallback = (...args: any[]) => func(...args);
        this.registeredFunctions.set(func.name, wrappedCallback);

        Logger.log(`Registered socket function ${func.name}`);
    }

    public unregister(func: (...args: any[]) => void)
    {
        const wrappedCallback = this.registeredFunctions.get(func.name);
        if (!wrappedCallback)
        {
            throw new Error(`Function is not registered.`);
        }
        this.registeredFunctions.delete(func.name);
    }

    public runAsGM(func: (...args: any[]) => void, callback?: (data: any) => void, ...args: any[])
    {
        // @ts-expect-error
        if (game.user.isGM)
        {
            func(...args);
        }
        //@ts-expect-error
        if (!game.users.activeGM)
        {
            Logger.error(`An active GM must be online to run GM-proxied functions`);
            throw new Error("No active GM found.");
        }

        Logger.log(`Requested GM proxy for ${func.name}`, args);
        let responseID = undefined;
        if (callback)
        {
            responseID = randomID(16);
            this.awaitingResponse.set(responseID, callback);
        }

        this.socket.emit(
            this.socketName,
            {
                type: "GM",
                func: func.name,
                args: args,
                responseID: responseID,
            }
        );
    }
}
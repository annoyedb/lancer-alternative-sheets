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
    private registeredFunctions: Map<string, (...args: any[]) => any> = new Map();
    private awaitingResponse: Map<string, (data: any) => any> = new Map();

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
                        Logger.error(`Function ${data.func} is not registered.`);
                        return;
                    }
                    const response = func(...data.args);
                    if (data.responseID)
                        this.handleResponse(response, data);
                }
                else if (data.type === "response")
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

    private handleResponse(response: any, data: any)
    {
        if (response instanceof Promise)
        {
            Logger.log(`GM proxy for ${data.func} is a promise, waiting for resolution...`);
            response.then((resolvedResponse) =>
            {
                if (data.responseID)
                {
                    this.socket.emit(
                        this.socketName,
                        {
                            type: "response",
                            func: data.func,
                            args: resolvedResponse,
                            responseID: data.responseID,
                        }
                    );
                }
                Logger.log(`GM proxy for ${data.func} resolved`, resolvedResponse);
            }).catch((error) =>
            {
                Logger.error(`Error in GM proxy function ${data.func}:`, error);
            });
        }
        else
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

    public register(func: (...args: any[]) => void)
    {
        if (this.registeredFunctions.has(func.name))
        {
            Logger.error(`Function ${func.name} is already registered.`);
            return;
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
            Logger.error(`Function ${func.name} is not registered.`);
            return;
        }
        this.registeredFunctions.delete(func.name);
    }

    public runAsGM(func: (...args: any[]) => any, callback?: (data: any) => any, ...args: any[])
    {
        // @ts-expect-error
        if (game.user.isGM)
        {
            const response = func(...args);
            if (callback)
            {
                if (response instanceof Promise)
                {
                    response.then((resolvedResponse) =>
                    {
                        callback(resolvedResponse);
                    }).catch((error) =>
                    {
                        Logger.error(`Error in ${func.name}:`, error);
                    });
                }
                else
                {
                    callback(response);
                }
            }
            return;
        }
        //@ts-expect-error
        if (!game.users.activeGM)
        {
            Logger.error(`An active GM must be online to run GM-proxied functions`);
            return;
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
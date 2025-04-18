import { CustomFlowClass } from "@/enums/FlowClass";
import type { ChatData } from "@/interfaces/flows/ChatData";
import { FlowBase } from "./FlowBase";

// Boiler plate mostly and an example of how this module extends flows
export class SendUnknownToChatBase extends FlowBase
{
    public constructor() { super(); }

    setupFlow()
    {
        const SendUnknownToChat = class extends (game.lancer.flows as any).get("SimpleTextFlow")
        {
            static steps = ["printGenericCard"];

            constructor(uuid: string, data: ChatData)
            {
                super(uuid, {
                    title: data.title,
                    description: data.description,
                    tags: [],
                });
            }
        }

        // Export the SendUnknownToChat class
        return SendUnknownToChat;
    }

    setupFlowSteps(): any[]
    {
        return [];
    }

    /**
     * Starts the flow by creating an instance of the `SendUnknownToChat` class and beginning the flow.
     *
     * @param {string} uuid - All flows require a UUID, though not all will make use of it. The matching item will be included in the data when sent.
     * @param {any} data - The data to pass to the flow
     */
    startFlow(uuid: string, data: ChatData): void
    {
        const flows = game.lancer.flows as Map<string, any>;
        // UUID doesn't actually matter here, but flows require it
        let flow = new (flows.get(CustomFlowClass.SendUnknownToChat))(
            uuid,
            data
        );
        flow.begin();
    }

}

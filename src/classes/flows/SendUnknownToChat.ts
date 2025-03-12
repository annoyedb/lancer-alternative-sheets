import { CustomFlowClass } from "@/enums/FlowClass";
import type { ChatData } from "@/interfaces/flows/ChatData";

// Boiler plate mostly and an example of how this module extends flows
export class SendUnknownToChatBase
{
    static setupFlow()
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

    /**
     * Starts the flow by creating an instance of the `SendUnknownToChat` class and beginning the flow.
     *
     * @param {string} uuid - A dummy UUID for the flow instance to run.
     * @param {string} title - The title of the chat message.
     * @param {string} description - The description of the chat message.
     */
    static startFlow(uuid: string, title: string, description: string) 
    {
        const flows = game.lancer.flows as Map<string, any>;
        // UUID doesn't actually matter here, but flows require it
        let flow = new (flows.get(CustomFlowClass.SendUnknownToChat))(
            uuid, 
            {
                title: title,
                description: description,
            }
        );
        flow.begin();
    }
}

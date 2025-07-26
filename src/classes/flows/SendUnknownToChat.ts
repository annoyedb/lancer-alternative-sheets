import { CustomFlowClass } from "@/enums/FlowClass";
import type { FlowState } from "@/types/foundryvtt-lancer/module/flows/flow";
import type { ChatData } from "@/interfaces/flows/ChatData";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { renderTemplateStep } from "@/scripts/lancer/flows/_render";
import { FlowBase } from "./FlowBase";

// Boiler plate mostly and an example of how this module extends flows
export class SendUnknownToChatBase extends FlowBase
{
    public constructor() { super(); }

    setupFlow()
    {
        const SendUnknownToChat = class extends (game.lancer.Flow as any)<any>
        {
            static steps = ["printFeatureCard"];

            constructor(uuid: string, data: ChatData)
            {
                super(uuid, {
                    title: data.title,
                    description: data.description,
                    trigger: data.trigger,
                    effect: data.effect,
                    onHit: data.onHit,
                    onCrit: data.onCrit,
                    tags: data.tags,
                });
            }
        }

        // Export the SendUnknownToChat class
        return SendUnknownToChat;
    }

    setupFlowSteps(): any[]
    {
        return [
            this.printFeatureCard,
        ];
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

    async printFeatureCard(state: FlowState<any>, options?: { template?: string }): Promise<boolean>
    {
        if (!state.data) throw new TypeError(`Flow state missing!`);
        
        renderTemplateStep(
            state.actor,
            options?.template || TEMPLATE_PATHS.featureCard,
            state.data
        );
        
        return true;
    }
}

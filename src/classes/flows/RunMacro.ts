import { CustomFlowClass } from "@/enums/FlowClass";
import type { ChatData } from "@/interfaces/flows/ChatData";
import type { FlowState } from "@/types/foundryvtt-lancer/module/flows/flow";
import { FlowBase } from "./FlowBase";

// Boiler plate mostly and an example of how this module extends flows
export class RunMacroBase extends FlowBase
{
    public constructor() { super(); }

    setupFlow()
    {
        const RunMacro = class extends (game.lancer.Flow as any)<ChatData>
        {
            static steps = ["printGenericCard", "testStep"];

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
        return RunMacro;
    }

    setupFlowSteps(): any[]
    {
        return [
            this.testStep,
        ];
    }

    /**
     * Starts the flow by creating an instance of the `SendUnknownToChat` class and beginning the flow.
     *
     * @param {string} uuid - All flows require a UUID, though not all will make use of it. The matching item will be included in the data when sent.
     * @param {any} data - The data to pass to the flow
     */
    startFlow(uuid: string, data: any): void
    {
        const flows = game.lancer.flows as Map<string, any>;
        // UUID doesn't actually matter here, but flows require it
        let flow = new (flows.get(CustomFlowClass.RunMacro))(
            uuid, 
            {
                title: data.title,
                description: data.description,
            }
        );

        flow.begin();
    }

    async testStep(state: FlowState<any>): Promise<boolean>
    {
        console.log("Testing step: ", state);
        return true;
    }
}

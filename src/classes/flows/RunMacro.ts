import { CustomFlowClass } from "@/enums/FlowClass";
import type { FlowState } from "@/types/foundryvtt-lancer/module/flows/flow";
import { FlowBase } from "./FlowBase";
import type { UUIDData } from "@/interfaces/flows/UUIDData";

// Boiler plate mostly and an example of how this module extends flows
export class RunMacroBase extends FlowBase
{
    public constructor() { super(); }

    setupFlow()
    {
        const RunMacro = class extends (game.lancer.Flow as any)<UUIDData>
        {
            static steps = ["runMacroStep"];

            constructor(uuid: string, data: UUIDData)
            {
                super(uuid, data);
            }
        }

        // Export the SendUnknownToChat class
        return RunMacro;
    }

    setupFlowSteps(): any[]
    {
        return [
            this.runMacroStep,
        ];
    }

    /**
     * Starts the flow by creating an instance of the `SendUnknownToChat` class and beginning the flow.
     *
     * @param {string} uuid - All flows require a UUID, though not all will make use of it. The matching item will be included in the data when sent.
     * @param {any} data - The data to pass to the flow
     */
    startFlow(uuid: string, data: UUIDData): void
    {
        const flows = game.lancer.flows as Map<string, any>;
        // UUID doesn't actually matter here, but flows require it
        let flow = new (flows.get(CustomFlowClass.RunMacro))(
            uuid, 
            data
        );

        flow.begin();
    }

    async runMacroStep(state: FlowState<UUIDData>): Promise<boolean>
    {
        if (!state.data?.uuid)
        {
            console.error("Lancer Alternative Sheets: Missing UUID passed to runMacroStep.");
            return false;
        }

        fromUuid(state.data.uuid).then((item) => 
        {
            (item as Macro).execute();
        });
        return true;
    }
}

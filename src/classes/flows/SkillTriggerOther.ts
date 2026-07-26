import { CustomFlowClass } from "@/enums/FlowClass";
import { getLocalized } from "@/scripts/helpers";
import { FlowBase } from "./FlowBase";

// Boiler plate mostly and an example of how this module extends flows
export class SkillTriggerOtherBase extends FlowBase
{
    public constructor() { super(); }

    setupFlow()
    {
        const SkillTriggerOther = class extends (game.lancer.Flow as any)<any>
        {
            static steps = ["initStatRollData", "showStatRollHUD", "rollCheck", "printStatRollCard"];

            constructor(uuid: string, _data: any)
            {
                super(uuid, {
                    title: getLocalized("LA.pilot.skillTrigger.label"),
                    path: "system.__generic_skill_trigger", // This should never resolve to anything
                    roll_str: "1d20",
                });
            }
        }

        return SkillTriggerOther;
    }

    setupFlowSteps(): any[]
    {
        return [];
    }

    /**
     * Starts the flow by creating an instance of the `SkillTriggerOther` class and beginning the flow.
     *
     * @param {string} uuid - All flows require a UUID, though not all will make use of it. The matching item will be included in the data when sent.
     * @param {any} data - The data to pass to the flow
     */
    startFlow(uuid: string, data: any): void
    {
        const flows = game.lancer.flows as Map<string, any>;
        let flow = new (flows.get(CustomFlowClass.SkillTriggerOther))(
            uuid,
            data
        );
        
        flow.begin();
    }
}

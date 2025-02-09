import { EntryType } from "../../enums";
import { LancerDataModel } from "../shared";
import { SourceData } from "../../source-template";
declare const npc_schema: {
    stress: import("../shared").FullBoundedNumberField;
    structure: import("../shared").FullBoundedNumberField;
    heat: import("../shared").FullBoundedNumberField;
    action_tracker: any;
    lid: import("../shared").LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: import("../shared").FullBoundedNumberField;
    overshield: import("../shared").FullBoundedNumberField;
    inherited_effects: any;
    destroyed: any;
    meltdown_timer: any;
    notes: any;
    tier: any;
};
type NpcSchema = typeof npc_schema;
export declare class NpcModel extends LancerDataModel<"NpcModel"> {
    static defineSchema(): NpcSchema;
}
export declare function generateNpcDataFromClass(npc_class: {
    name: string;
    type: EntryType.NPC_CLASS;
    img: string | undefined;
    system: DeepPartial<SourceData.NpcClass>;
}): {
    name: string;
    type: EntryType.NPC;
    img: string | undefined;
    system: DeepPartial<SourceData.Npc>;
};
export {};

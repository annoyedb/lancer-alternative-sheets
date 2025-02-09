import { LancerDataModel, SyncUUIDRefField, FullBoundedNumberField } from "../shared";
declare const mech_schema: {
    stress: FullBoundedNumberField;
    structure: FullBoundedNumberField;
    heat: FullBoundedNumberField;
    action_tracker: any;
    lid: import("../shared").LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: FullBoundedNumberField;
    overshield: FullBoundedNumberField;
    inherited_effects: any;
    overcharge: any;
    repairs: FullBoundedNumberField;
    core_active: any;
    core_energy: any;
    loadout: any;
    meltdown_timer: any;
    notes: any;
    pilot: SyncUUIDRefField;
};
type MechSchema = typeof mech_schema;
export declare class MechModel extends LancerDataModel<"MechModel"> {
    static defineSchema(): MechSchema;
    static migrateData(data: any): any;
}
export {};

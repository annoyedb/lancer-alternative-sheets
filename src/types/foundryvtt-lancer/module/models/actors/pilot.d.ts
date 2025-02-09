import { LancerDataModel, SyncUUIDRefField, FullBoundedNumberField } from "../shared";
declare const pilot_schema: {
    action_tracker: any;
    lid: import("../shared").LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: FullBoundedNumberField;
    overshield: FullBoundedNumberField;
    inherited_effects: any;
    active_mech: SyncUUIDRefField;
    background: any;
    callsign: any;
    cloud_id: any;
    history: any;
    last_cloud_update: any;
    level: any;
    loadout: any;
    hull: any;
    agi: any;
    sys: any;
    eng: any;
    mounted: any;
    notes: any;
    player_name: any;
    status: any;
    text_appearance: any;
    bond_state: any;
};
type PilotSchema = typeof pilot_schema;
export declare class PilotModel extends LancerDataModel<"PilotModel"> {
    static defineSchema(): PilotSchema;
    static migrateData(data: any): any;
}
export {};

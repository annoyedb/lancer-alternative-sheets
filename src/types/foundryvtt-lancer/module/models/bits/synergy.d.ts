import { DamageTypeChecklist, RangeTypeChecklist, SynergyLocation, SystemTypeChecklist, WeaponSizeChecklist, WeaponTypeChecklist } from "../../enums";
import { PackedSynergyData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface SynergyData {
    locations: SynergyLocation[];
    detail: string;
    system_types?: SystemTypeChecklist | null;
    damage_types: DamageTypeChecklist | null;
    range_types: RangeTypeChecklist | null;
    weapon_types: WeaponTypeChecklist | null;
    weapon_sizes: WeaponSizeChecklist | null;
}
export declare class SynergyField extends fields.SchemaField {
    constructor(options?: {});
    migrateSource(sourceData: any, fieldData: any): any;
}
export declare function unpackSynergy(data: PackedSynergyData): SynergyData;
export {};

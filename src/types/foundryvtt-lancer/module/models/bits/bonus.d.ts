import { DamageTypeChecklist, RangeTypeChecklist, WeaponSizeChecklist, WeaponTypeChecklist } from "../../enums";
import { PackedBonusData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface BonusData {
    lid: string;
    val: string;
    damage_types: DamageTypeChecklist | null;
    range_types: RangeTypeChecklist | null;
    weapon_types: WeaponTypeChecklist | null;
    weapon_sizes: WeaponSizeChecklist | null;
    overwrite: boolean;
    replace: boolean;
}
export declare class BonusField extends fields.SchemaField {
    constructor(options?: {});
}
export declare function generateBonus(lid: string, val: string | number, replace?: boolean, overwrite?: boolean): BonusData;
export declare function unpackBonus(data: PackedBonusData): BonusData;
export {};

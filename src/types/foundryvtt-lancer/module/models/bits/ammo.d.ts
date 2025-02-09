import { WeaponSizeChecklist, WeaponTypeChecklist } from "../../enums";
import { PackedAmmoData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface AmmoData {
    name: string;
    description: string;
    cost: number | null;
    allowed_types: WeaponTypeChecklist | null;
    allowed_sizes: WeaponSizeChecklist | null;
    restricted_types: WeaponTypeChecklist | null;
    restricted_sizes: WeaponSizeChecklist | null;
}
export declare class AmmoField extends fields.SchemaField {
    constructor(options?: {});
}
export declare function unpackAmmo(data: PackedAmmoData): AmmoData;
export {};

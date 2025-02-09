import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedWeaponModData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext, WeaponSizeChecklistField, WeaponTypeChecklistField } from "../shared";
export declare class WeaponModModel extends LancerDataModel<"WeaponModModel"> {
    static defineSchema(): {
        uses: import("../shared").FakeBoundedNumberField;
        manufacturer: any;
        license_level: any;
        license: any;
        cascading: any;
        destroyed: any;
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        lid: import("../shared").LIDField;
        added_tags: any;
        added_damage: any;
        added_range: any;
        effect: any;
        description: any;
        sp: any;
        allowed_types: WeaponTypeChecklistField;
        allowed_sizes: WeaponSizeChecklistField;
    };
    static migrateData(data: any): any;
}
export declare function unpackWeaponMod(data: PackedWeaponModData, context: UnpackContext): {
    name: string;
    type: EntryType.WEAPON_MOD;
    system: DeepPartial<SourceData.WeaponMod>;
};

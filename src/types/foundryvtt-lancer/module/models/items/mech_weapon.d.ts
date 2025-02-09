import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedMechWeaponData } from "../../util/unpacking/packed-types";
import { ControlledLengthArrayField, LancerDataModel, LIDField, UnpackContext } from "../shared";
export declare class MechWeaponModel extends LancerDataModel<"MechWeaponModel"> {
    static defineSchema(): {
        uses: import("../shared").FakeBoundedNumberField;
        manufacturer: any;
        license_level: any;
        license: any;
        cascading: any;
        destroyed: any;
        lid: LIDField;
        deployables: any;
        integrated: any;
        sp: any;
        actions: any;
        profiles: ControlledLengthArrayField;
        loaded: any;
        selected_profile_index: any;
        size: any;
        no_core_bonuses: any;
        no_mods: any;
        no_bonuses: any;
        no_synergies: any;
        no_attack: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackMechWeapon(data: PackedMechWeaponData, context: UnpackContext): {
    name: string;
    type: EntryType.MECH_WEAPON;
    system: DeepPartial<SourceData.MechWeapon>;
};

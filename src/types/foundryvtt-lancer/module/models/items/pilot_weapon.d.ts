import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedPilotWeaponData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class PilotWeaponModel extends LancerDataModel {
    static defineSchema(): {
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        uses: import("../shared").FakeBoundedNumberField;
        lid: import("../shared").LIDField;
        description: any;
        range: any;
        damage: any;
        effect: any;
        loaded: any;
    };
}
export declare function unpackPilotWeapon(data: PackedPilotWeaponData, context: UnpackContext): {
    name: string;
    type: EntryType.PILOT_WEAPON;
    system: DeepPartial<SourceData.PilotWeapon>;
};

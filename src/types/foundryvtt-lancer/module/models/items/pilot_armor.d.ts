import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedPilotArmorData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class PilotArmorModel extends LancerDataModel {
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
    };
}
export declare function unpackPilotArmor(data: PackedPilotArmorData, context: UnpackContext): {
    name: string;
    type: EntryType.PILOT_ARMOR;
    system: DeepPartial<SourceData.PilotArmor>;
};

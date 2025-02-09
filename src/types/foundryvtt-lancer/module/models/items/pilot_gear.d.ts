import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedPilotGearData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class PilotGearModel extends LancerDataModel {
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
export declare function unpackPilotGear(data: PackedPilotGearData, context: UnpackContext): {
    name: string;
    type: EntryType.PILOT_GEAR;
    system: DeepPartial<SourceData.PilotGear>;
};

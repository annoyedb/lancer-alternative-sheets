import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedReserveData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class ReserveModel extends LancerDataModel {
    static defineSchema(): {
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        lid: import("../shared").LIDField;
        consumable: any;
        label: any;
        type: any;
        used: any;
        description: any;
    };
}
export declare function unpackReserve(data: PackedReserveData, context: UnpackContext): {
    name: string;
    type: EntryType.RESERVE;
    system: DeepPartial<SourceData.Reserve>;
};

import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedCoreBonusData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class CoreBonusModel extends LancerDataModel<"CoreBonusModel"> {
    static defineSchema(): {
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        lid: import("../shared").LIDField;
        description: any;
        effect: any;
        mounted_effect: any;
        manufacturer: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackCoreBonus(data: PackedCoreBonusData, context: UnpackContext): {
    name: string;
    type: EntryType.CORE_BONUS;
    system: DeepPartial<SourceData.CoreBonus>;
};

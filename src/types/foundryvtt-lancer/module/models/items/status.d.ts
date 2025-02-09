import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedStatusData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class StatusModel extends LancerDataModel<"StatusModel"> {
    static defineSchema(): {
        lid: import("../shared").LIDField;
        effects: any;
        type: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackStatus(data: PackedStatusData, _context: UnpackContext): {
    name: string;
    type: EntryType.STATUS;
    img: string;
    system: DeepPartial<SourceData.Status>;
};

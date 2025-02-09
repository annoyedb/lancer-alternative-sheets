import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedFrameData } from "../../util/unpacking/packed-types";
import { LancerDataModel, LIDField, UnpackContext } from "../shared";
export declare class FrameModel extends LancerDataModel<"FrameModel"> {
    static defineSchema(): {
        manufacturer: any;
        license_level: any;
        license: any;
        lid: LIDField;
        description: any;
        mechtype: any;
        mounts: any;
        stats: any;
        traits: any;
        core_system: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackFrame(data: PackedFrameData, context: UnpackContext): {
    name: string;
    type: EntryType.FRAME;
    img: string | undefined;
    system: DeepPartial<SourceData.Frame>;
};

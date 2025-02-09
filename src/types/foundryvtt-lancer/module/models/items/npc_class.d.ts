import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedNpcClassData } from "../../util/unpacking/packed-types";
import { ControlledLengthArrayField, LancerDataModel, LIDField, UnpackContext } from "../shared";
export declare class NpcClassModel extends LancerDataModel<"NpcClassModel"> {
    static defineSchema(): {
        lid: LIDField;
        role: any;
        flavor: any;
        tactics: any;
        base_features: any;
        optional_features: any;
        base_stats: ControlledLengthArrayField;
    };
    static migrateData(data: any): any;
}
export declare function unpackNpcClass(data: PackedNpcClassData, context: UnpackContext): {
    name: string;
    type: EntryType.NPC_CLASS;
    img: string | undefined;
    system: DeepPartial<SourceData.NpcClass>;
};

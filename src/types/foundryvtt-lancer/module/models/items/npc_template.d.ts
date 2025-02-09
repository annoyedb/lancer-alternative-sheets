import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedNpcTemplateData } from "../../util/unpacking/packed-types";
import { LancerDataModel, LIDField, UnpackContext } from "../shared";
export declare class NpcTemplateModel extends LancerDataModel<"NpcTemplateModel"> {
    static defineSchema(): {
        lid: LIDField;
        description: any;
        base_features: any;
        optional_features: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackNpcTemplate(data: PackedNpcTemplateData, context: UnpackContext): {
    name: string;
    type: EntryType.NPC_TEMPLATE;
    system: DeepPartial<SourceData.NpcTemplate>;
};

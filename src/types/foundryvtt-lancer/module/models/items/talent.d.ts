import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedTalentData } from "../../util/unpacking/packed-types";
import { LancerDataModel, LIDField, UnpackContext } from "../shared";
export declare class TalentModel extends LancerDataModel {
    static defineSchema(): {
        lid: LIDField;
        curr_rank: any;
        description: any;
        terse: any;
        ranks: any;
    };
}
export declare function unpackTalent(data: PackedTalentData, context: UnpackContext): {
    name: string;
    type: EntryType.TALENT;
    system: DeepPartial<SourceData.Talent>;
};

import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedSkillData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class SkillModel extends LancerDataModel {
    static defineSchema(): {
        lid: import("../shared").LIDField;
        description: any;
        detail: any;
        curr_rank: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackSkill(data: PackedSkillData, context: UnpackContext): {
    name: string;
    type: EntryType.SKILL;
    system: DeepPartial<SourceData.Skill>;
};

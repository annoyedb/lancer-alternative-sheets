import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedBondData } from "../../util/unpacking/packed-types";
import { LancerDataModel } from "../shared";
export declare class BondModel extends LancerDataModel<"BondModel"> {
    static defineSchema(): {
        lid: import("../shared").LIDField;
        major_ideals: any;
        minor_ideals: any;
        questions: any;
        powers: any;
    };
}
export declare function unpackBond(data: PackedBondData): {
    name: string;
    type: EntryType.BOND;
    system: DeepPartial<SourceData.Bond>;
};

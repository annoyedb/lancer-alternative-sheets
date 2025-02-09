import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class LicenseModel extends LancerDataModel<"LicenseModel"> {
    static defineSchema(): {
        lid: import("../shared").LIDField;
        key: any;
        manufacturer: any;
        curr_rank: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackLicense(name: string, key: string, manufacturer: string, _context: UnpackContext): {
    name: string;
    type: EntryType.LICENSE;
    system: DeepPartial<SourceData.License>;
};

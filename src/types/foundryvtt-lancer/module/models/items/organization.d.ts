import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedOrganizationData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class OrganizationModel extends LancerDataModel {
    static defineSchema(): {
        lid: import("../shared").LIDField;
        description: any;
        actions: any;
        efficiency: any;
        influence: any;
        purpose: any;
    };
}
export declare function unpackOrganization(data: PackedOrganizationData, context: UnpackContext): {
    name: string;
    type: EntryType.ORGANIZATION;
    system: DeepPartial<SourceData.Organization>;
};

import { LancerDataModel, SyncUUIDRefField, UnpackContext } from "../shared";
import { PackedDeployableData } from "../../util/unpacking/packed-types";
import { SourceData } from "../../source-template";
declare const deployable_schema: {
    heat: import("../shared").FullBoundedNumberField;
    lid: import("../shared").LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: import("../shared").FullBoundedNumberField;
    overshield: import("../shared").FullBoundedNumberField;
    inherited_effects: any;
    actions: any;
    counters: any;
    synergies: any;
    tags: any;
    activation: any;
    stats: any;
    cost: any;
    instances: any;
    deactivation: any;
    detail: any;
    recall: any;
    redeploy: any;
    type: any;
    avail_mounted: any;
    avail_unmounted: any;
    deployer: SyncUUIDRefField;
    owner: SyncUUIDRefField;
};
type DeployableSchema = typeof deployable_schema;
export declare class DeployableModel extends LancerDataModel<"DeployableModel"> {
    static defineSchema(): DeployableSchema;
    static migrateData(data: any): any;
}
export declare function unpackDeployableData(data: PackedDeployableData): DeepPartial<SourceData.Deployable>;
export declare function unpackDeployable(data: PackedDeployableData, context: UnpackContext): string;
export {};

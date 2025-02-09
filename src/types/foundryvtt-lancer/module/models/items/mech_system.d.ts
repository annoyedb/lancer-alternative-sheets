import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedMechSystemData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class MechSystemModel extends LancerDataModel<"MechSystemModel"> {
    static defineSchema(): {
        uses: import("../shared").FakeBoundedNumberField;
        manufacturer: any;
        license_level: any;
        license: any;
        cascading: any;
        destroyed: any;
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        lid: import("../shared").LIDField;
        effect: any;
        sp: any;
        description: any;
        type: any;
        ammo: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackMechSystem(data: PackedMechSystemData, context: UnpackContext): {
    name: string;
    type: EntryType.MECH_SYSTEM;
    system: DeepPartial<SourceData.MechSystem>;
};

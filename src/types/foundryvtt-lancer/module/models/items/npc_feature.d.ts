import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedNpcReactionData, PackedNpcSystemData, PackedNpcTechData, PackedNpcTraitData, PackedNpcWeaponData } from "../../util/unpacking/packed-types";
import { ControlledLengthArrayField, LancerDataModel, NpcStatBlockField, UnpackContext } from "../shared";
export declare class NpcFeatureModel extends LancerDataModel<"NpcFeatureModel"> {
    static defineSchema(): {
        lid: import("../shared").LIDField;
        uses: import("../shared").FakeBoundedNumberField;
        cascading: any;
        destroyed: any;
        effect: any;
        bonus: NpcStatBlockField;
        override: NpcStatBlockField;
        tags: any;
        type: any;
        charged: any;
        loaded: any;
        tier_override: any;
        weapon_type: any;
        damage: any;
        range: any;
        on_hit: any;
        accuracy: ControlledLengthArrayField;
        attack_bonus: ControlledLengthArrayField;
        trigger: any;
        tech_type: any;
        tech_attack: any;
        origin: any;
    };
    static migrateData(data: any): any;
}
export declare function unpackNpcFeature(data: PackedNpcReactionData | PackedNpcSystemData | PackedNpcTechData | PackedNpcTraitData | PackedNpcWeaponData, context: UnpackContext): {
    name: string;
    type: EntryType.NPC_FEATURE;
    system: DeepPartial<SourceData.NpcFeature>;
};

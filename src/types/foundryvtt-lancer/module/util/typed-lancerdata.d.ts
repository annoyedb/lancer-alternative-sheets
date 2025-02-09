import { PackedActionData, PackedCoreBonusData, PackedEnvironmentData, PackedFrameData, PackedWeaponModData, PackedNpcClassData, AnyPackedNpcFeatureData, PackedNpcTemplateData, PackedPilotEquipmentData, PackedReserveData, PackedSitrepData, PackedSkillData, PackedStatusData, PackedMechSystemData, PackedTagTemplateData, PackedTalentData, PackedMechWeaponData } from "./unpacking/packed-types";
export interface GlossaryItem {
    name: string;
    description: string;
}
export declare const glossary: GlossaryItem[];
export declare const actions: PackedActionData[];
export declare const core_bonuses: PackedCoreBonusData[];
export declare const environments: PackedEnvironmentData[];
export declare const frames: PackedFrameData[];
export declare const info: {
    name: string;
    author: string;
    version: string;
    description: string;
    website: string;
    active: true;
};
export declare const mods: PackedWeaponModData[];
export declare const npc_classes: PackedNpcClassData[];
export declare const npc_features: AnyPackedNpcFeatureData[];
export declare const npc_templates: PackedNpcTemplateData[];
export declare const pilot_gear: PackedPilotEquipmentData[];
export declare const reserves: PackedReserveData[];
export declare const sitreps: PackedSitrepData[];
export declare const skills: PackedSkillData[];
export declare const statuses: PackedStatusData[];
export declare const systems: PackedMechSystemData[];
export declare const tags: PackedTagTemplateData[];
export declare const talents: PackedTalentData[];
export declare const weapons: PackedMechWeaponData[];

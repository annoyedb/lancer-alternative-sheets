import { LancerActor } from "../actor/lancer-actor";
import { LancerFRAME, LancerMECH_WEAPON, LancerNPC_CLASS, LancerNPC_FEATURE, LancerSTATUS } from "../item/lancer-item";
import { BonusData } from "../models/bits/bonus";
import { LancerActiveEffect, LancerActiveEffectConstructorData } from "./lancer-active-effect";
export declare function frameInnateEffect(frame: LancerFRAME): LancerActiveEffectConstructorData;
/**
 * Creates the "innate" ActiveEffect of a pilot, essentially just the buff supplied by being piloted by this mech
 */
export declare function pilotInnateEffects(pilot: LancerActor): LancerActiveEffect[];
/**
 * Creates the "innate" ActiveEffect of an NPC, conferring its tier as a grit bonus to its deployables
 */
export declare function npcInnateEffects(npc: LancerActor): LancerActiveEffect[];
/**
 * Creates the ActiveEffect data for a status/condition
 */
export declare function statusInnateEffect(status: LancerSTATUS): LancerActiveEffectConstructorData;
/**
 * Creates the pseudo-activeeffect-data that goes in the CONFIG.statusEffects variable,
 * based on a particular status
 * @param status Status to convert
 * @returns A value to be placed in CONFIG.statusEffects
 */
export declare function statusConfigEffect(status: LancerSTATUS): any;
export declare function npcClassInnateEffect(class_: LancerNPC_CLASS): LancerActiveEffectConstructorData;
export declare function npcFeatureBonusEffects(feature: LancerNPC_FEATURE): LancerActiveEffectConstructorData | null;
export declare function npcFeatureOverrideEffects(feature: LancerNPC_FEATURE): LancerActiveEffectConstructorData | null;
export declare function convertBonus(origin: string, name: string, bonus: BonusData): null | LancerActiveEffectConstructorData;
/**
 * Determine whether this Active Effect applies to the given weapon
 */
export declare function bonusAffectsWeapon(weapon: LancerMECH_WEAPON, bonus: BonusData): boolean;

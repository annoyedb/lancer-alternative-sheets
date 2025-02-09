import { ActiveEffectDataConstructorData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/activeEffectData";
import { LancerActor } from "../actor/lancer-actor";
import { EntryType } from "../enums";
export type LancerEffectTarget = EntryType.PILOT | EntryType.MECH | EntryType.NPC | EntryType.DEPLOYABLE | "only_drone" | "only_deployable" | "mech_and_npc";
export interface LancerActiveEffectFlags {
    lancer: {
        ephemeral?: boolean;
        target_type?: LancerEffectTarget;
        deep_origin?: string | null;
        status_type?: "status" | "effect" | "condition";
    };
}
export interface LancerActiveEffectConstructorData extends ActiveEffectDataConstructorData {
    name: string;
    flags: Record<string, unknown> & LancerActiveEffectFlags;
}
export declare class LancerActiveEffect extends ActiveEffect {
    /**
     * Determine whether this Active Effect is suppressed or not.
     */
    get isSuppressed(): boolean;
    /**
     * Determine whether this Active Effect is present only to be passed to descendants
     */
    affectsUs(): boolean;
    /**
     * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
     */
    static prepareActiveEffectCategories(actor: LancerActor): Array<{
        type: string;
        label: string;
        effects: [number, LancerActiveEffect][];
    }>;
    static initConfig(): Promise<void>;
    /**
     * Load statuses from the compendia and world items and backfill into CONFIG.statusEffects.
     */
    static populateFromItems(): Promise<void>;
}
export declare const AE_MODE_SET_JSON: any;
export declare const AE_MODE_APPEND_JSON: any;

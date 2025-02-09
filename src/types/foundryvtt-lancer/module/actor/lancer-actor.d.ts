import { EntryType } from "../enums";
import { AppliedDamage } from "./damage-calc";
import { SystemData, SystemDataType, SystemTemplates } from "../system-template";
import { SourceDataType } from "../source-template";
import { LancerFRAME, LancerItem, LancerNPC_CLASS, LancerNPC_FEATURE, LancerNPC_TEMPLATE } from "../item/lancer-item";
import { LancerActiveEffect } from "../effects/lancer-active-effect";
import { EffectHelper } from "../effects/effector";
import { LoadoutHelper } from "./loadout-util";
import { StrussHelper } from "./struss-util";
import { ActorDataConstructorData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData";
interface LancerActorDataSource<T extends EntryType> {
    type: T;
    data: SourceDataType<T>;
}
interface LancerActorDataProperties<T extends LancerActorType> {
    type: T;
    data: SystemDataType<T>;
}
type LancerActorSource = LancerActorDataSource<EntryType.PILOT> | LancerActorDataSource<EntryType.MECH> | LancerActorDataSource<EntryType.NPC> | LancerActorDataSource<EntryType.DEPLOYABLE>;
type LancerActorProperties = LancerActorDataProperties<EntryType.PILOT> | LancerActorDataProperties<EntryType.MECH> | LancerActorDataProperties<EntryType.NPC> | LancerActorDataProperties<EntryType.DEPLOYABLE>;
declare global {
    interface SourceConfig {
        Actor: LancerActorSource;
    }
    interface DataConfig {
        Actor: LancerActorProperties;
    }
    interface DocumentClassConfig {
        Actor: typeof LancerActor;
    }
}
/**
 * Extend the Actor class for Lancer Actors.
 */
export declare class LancerActor extends Actor {
    effectHelper: EffectHelper;
    loadoutHelper: LoadoutHelper;
    strussHelper: StrussHelper;
    system: SystemData.Pilot | SystemData.Mech | SystemData.Npc | SystemData.Deployable;
    npcClassSwapPromises: Promise<any>[];
    _configure(options: unknown): void;
    damageCalc(damage: AppliedDamage, { multiple, ap, paracausal, addBurn }: {
        multiple?: number | undefined;
        ap?: boolean | undefined;
        paracausal?: boolean | undefined;
        addBurn?: boolean | undefined;
    }): Promise<number>;
    /** @override
     * We require a customized active effect application workflow
     */
    prepareBaseData(): void;
    /** @override
     * We need to, in order:
     *  - Mark things as equipped
     *  - Finalize derived data on weaponry based on fully prepared actor statistics
     */
    prepareDerivedData(): void;
    /** Check which statuses this actor has active and set system.status accordingly */
    _markStatuses(): void;
    /** Mark our equipped items as equipped */
    _markEquipped(): void;
    /**
     * Want to yield from all items ephemeral effects
     * @override
     */
    allApplicableEffects(): Generator<any, void, any>;
    /**
     * Want to preserve our arrays, so we use full_update_data to hydrate our update data
     * @override
     */
    update(data: any, options?: any): Promise<this | undefined>;
    /** @override
     * This is mostly copy-pasted from Actor.modifyTokenAttribute to allow negative hps, which are useful for structure checks
     */
    modifyTokenAttribute(attribute: string, value: any, isDelta?: boolean, isBar?: boolean): Promise<this | undefined>;
    /** @override
     * This is overridden to pre-populate with slightly more sensible data,
     * such as nicer icons and default names, token dispositions, etc
     */
    protected _preCreate(...[data, options, user]: Parameters<Actor["_preCreate"]>): Promise<void>;
    /** @override
     * When an update is queued, trigger scrolling text on attached tokens
     */
    protected _preUpdate(...[data, options, user]: Parameters<Actor["_preUpdate"]>): Promise<void>;
    /** @override
     * Upon an actor being updated, we want to trigger automated cleanup, effect generation, etc
     */
    protected _onUpdate(...[changed, options, userId]: Parameters<Actor["_onUpdate"]>): void;
    /**
     * Makes us own (or rather, creates an owned copy of) the provided item if we don't already.
     * The second return value indicates whether a new copy was made (true), or if we already owned it/it is an actor (false)
     * Note: this operation also fixes limited to be the full capability of our actor
     * @param document
     * @returns The created item, and whether it was created. If it already existed or the document was an actor, the second value is false.
     */
    quickOwn(document: LancerItem): Promise<[LancerItem, boolean]>;
    /** @inheritdoc
     * Due to the complex effects equipment can have on an actors statistical values, it is necessary to be sure our
     * effects are kept in lockstep as items are created, updated, and deleted
     */
    _onCreateDescendantDocuments(parent: foundry.abstract.Document<any>, collection: "items" | "effects", documents: LancerItem[] | LancerActiveEffect[], changes: any[], options: any, userId: string): void;
    /** @inheritdoc */
    _onUpdateDescendantDocuments(parent: foundry.abstract.Document<any>, collection: "items" | "effects", documents: LancerItem[] | LancerActiveEffect[], changes: any[], options: any, userId: string): void;
    /** @inheritdoc */
    _onDeleteDescendantDocuments(parent: foundry.abstract.Document<any>, collection: "items" | "effects", documents: LancerItem[] | LancerActiveEffect[], changes: any[], options: any, userId: string): void;
    /**
     * Delete a descendant document without worrying if its been deleted before.
     * There is still technically an _exceedingly_ narrow window in which we can get duplicate deletion of effects, but this mitigates it
     */
    _safeDeleteDescendant(collection: "Item" | "ActiveEffect", effects: ActiveEffect[] | Item[], options?: DocumentModificationContext): Promise<any>;
    is_pilot(): this is LancerPILOT;
    is_mech(): this is LancerMECH;
    is_npc(): this is LancerNPC;
    is_deployable(): this is LancerDEPLOYABLE;
    hasHeatcap(): this is {
        system: SystemTemplates.heat;
    };
    removeClassFeatures(item: LancerItem): Promise<void>;
    /**
     * Taking a new and old frame/class, swaps the actor and/or token images if
     * we detect that the image isn't custom. Will check each individually
     * @param newFrame  New Frame or NPC Class
     * @returns         The newFrame if any updates were performed
     */
    swapFrameImage(newFrame: LancerFRAME | LancerNPC_CLASS): Promise<void>;
    /**
     * Taking a new frame/class, set the prototype token size
     * @param newFrame - The new frame or class to pull the size from.
     */
    updateTokenSize(newFrame: LancerFRAME | LancerNPC_CLASS): Promise<void>;
    findMatchingFeaturesInNpc(featureLids: string[]): LancerNPC_FEATURE[];
    /**
     * Internal utility method, intended to be called by _onCreateDescendantDocuments.
     * Removes features associated with the old class and adds features associated with the new class.
     * @param oldClass The old class which is being removed
     * @param newClass The new class which is being added
     */
    _swapNpcClass(oldClass: LancerNPC_CLASS | null, newClass: LancerNPC_CLASS | LancerNPC_TEMPLATE): Promise<void>;
    static fromUuid(x: string | LancerActor, messagePrefix?: string): Promise<LancerActor>;
    static fromUuidSync(x: string | LancerActor, messagePrefix?: string): LancerActor;
    statChangeScrollingText(data: DeepPartial<ActorDataConstructorData>): Promise<void>;
    beginFullRepairFlow(title?: string): Promise<boolean>;
    beginStabilizeFlow(title?: string): Promise<boolean>;
    beginOverchargeFlow(): Promise<boolean>;
    beginRechargeFlow(): Promise<boolean>;
    beginStatFlow(path: string, title?: string): Promise<boolean>;
    beginBurnFlow(title?: string): Promise<boolean>;
    beginBasicAttackFlow(title?: string): Promise<boolean>;
    beginDamageFlow(title?: string): Promise<boolean>;
    beginBasicTechAttackFlow(title?: string): Promise<boolean>;
    beginStructureFlow(): Promise<boolean>;
    beginOverheatFlow(): Promise<boolean>;
    tallyBondXP(): Promise<void>;
    static migrateData(source: any): any;
}
export type LancerPILOT = LancerActor & {
    system: SystemData.Pilot;
};
export type LancerMECH = LancerActor & {
    system: SystemData.Mech;
};
export type LancerNPC = LancerActor & {
    system: SystemData.Npc;
};
export type LancerDEPLOYABLE = LancerActor & {
    system: SystemData.Deployable;
};
export type LancerActorType = EntryType.MECH | EntryType.DEPLOYABLE | EntryType.NPC | EntryType.PILOT;
export declare const ACTOR_TYPES: LancerActorType[];
export declare function is_actor_type(type: any): type is LancerActorType;
export {};

import { SystemData, SystemDataType, SystemTemplates } from "../system-template";
import { SourceDataType } from "../source-template";
import { EntryType, RangeType } from "../enums";
import { ActionData } from "../models/bits/action";
import { RangeData } from "../models/bits/range";
import { Tag } from "../models/bits/tag";
import { LancerActiveEffect } from "../effects/lancer-active-effect";
import { BonusData } from "../models/bits/bonus";
import { DamageData } from "../models/bits/damage";
interface LancerItemDataSource<T extends LancerItemType> {
    type: T;
    system: SourceDataType<T>;
}
interface LancerItemDataProperties<T extends LancerItemType> {
    type: T;
    system: SystemDataType<T>;
}
/**
 * Union type for Item.data._source. Only really used in prepareData
 */
type LancerItemSource = LancerItemDataSource<EntryType.CORE_BONUS> | LancerItemDataSource<EntryType.FRAME> | LancerItemDataSource<EntryType.LICENSE> | LancerItemDataSource<EntryType.MECH_SYSTEM> | LancerItemDataSource<EntryType.MECH_WEAPON> | LancerItemDataSource<EntryType.NPC_CLASS> | LancerItemDataSource<EntryType.NPC_FEATURE> | LancerItemDataSource<EntryType.NPC_TEMPLATE> | LancerItemDataSource<EntryType.ORGANIZATION> | LancerItemDataSource<EntryType.PILOT_ARMOR> | LancerItemDataSource<EntryType.PILOT_GEAR> | LancerItemDataSource<EntryType.PILOT_WEAPON> | LancerItemDataSource<EntryType.RESERVE> | LancerItemDataSource<EntryType.SKILL> | LancerItemDataSource<EntryType.STATUS> | LancerItemDataSource<EntryType.TALENT> | LancerItemDataSource<EntryType.BOND> | LancerItemDataSource<EntryType.WEAPON_MOD>;
/**
 * Union type for Item.data
 * Can be discriminated by testing Item.data.type
 */
type LancerItemProperties = LancerItemDataProperties<EntryType.CORE_BONUS> | LancerItemDataProperties<EntryType.FRAME> | LancerItemDataProperties<EntryType.LICENSE> | LancerItemDataProperties<EntryType.MECH_SYSTEM> | LancerItemDataProperties<EntryType.MECH_WEAPON> | LancerItemDataProperties<EntryType.NPC_CLASS> | LancerItemDataProperties<EntryType.NPC_FEATURE> | LancerItemDataProperties<EntryType.NPC_TEMPLATE> | LancerItemDataProperties<EntryType.ORGANIZATION> | LancerItemDataProperties<EntryType.PILOT_ARMOR> | LancerItemDataProperties<EntryType.PILOT_GEAR> | LancerItemDataProperties<EntryType.PILOT_WEAPON> | LancerItemDataProperties<EntryType.RESERVE> | LancerItemDataProperties<EntryType.SKILL> | LancerItemDataProperties<EntryType.STATUS> | LancerItemDataProperties<EntryType.TALENT> | LancerItemDataProperties<EntryType.BOND> | LancerItemDataProperties<EntryType.WEAPON_MOD>;
declare global {
    interface SourceConfig {
        Item: LancerItemSource;
    }
    interface DataConfig {
        Item: LancerItemProperties;
    }
    interface DocumentClassConfig {
        Item: typeof LancerItem;
    }
}
export declare class LancerItem extends Item {
    system: SystemData.CoreBonus | SystemData.Frame | SystemData.License | SystemData.MechSystem | SystemData.MechWeapon | SystemData.WeaponMod | SystemData.NpcClass | SystemData.NpcFeature | SystemData.NpcTemplate | SystemData.Organization | SystemData.PilotArmor | SystemData.PilotGear | SystemData.PilotWeapon | SystemData.Reserve | SystemData.Skill | SystemData.Status | SystemData.Talent | SystemData.Bond;
    /**
     * Returns all ranges for the item that match the provided range types
     */
    rangesFor(types: Set<RangeType> | RangeType[]): RangeData[];
    currentProfile(): {
        range: RangeData[];
        damage?: DamageData[];
        accuracy?: number;
        attack?: number;
    };
    /** Sets this item to its default equipped state */
    _resetEquipped(): void;
    /**
     * Perform preliminary item preparation.
     * Set equipped to its initial value (to be later finalized)
     * Set active weapon profile
     * Set limited max based on tags
     */
    prepareBaseData(): void;
    /**
     * Method used by mech weapons (and perhaps some other miscellaneous items???) to prepare their individual stats
     * using bonuses.
     *
     * Note that it is still necessary that items without actors call this in order to prepare weapon tags
     */
    prepareFinalAttributes(): void;
    /** @override
     * Want to preserve our arrays
     */
    update(data: any, options?: {}): Promise<this | undefined>;
    /**
     * Generates the effect data for this items bonuses and innate effects (such as those from armor, a frame, etc).
     * Generates no effects if item is destroyed, or unequipped.
     * Result will be a mix of
     * - Bonus effects (aka from compcon Bonus type bonuses)
     * - Innate effects (e.x. the statistical affect of a frames base stats)
     * Result is a temporary ActiveEffect document - it is not persisted to DB
     */
    _generateEphemeralEffects(): LancerActiveEffect[];
    /** @inheritdoc */
    static _onDeleteDocuments(): Promise<void>;
    protected _preCreate(...[data, options, user]: Parameters<Item["_preCreate"]>): Promise<void>;
    is_core_bonus(): this is LancerCORE_BONUS;
    is_frame(): this is LancerFRAME;
    is_license(): this is LancerLICENSE;
    is_mech_system(): this is LancerMECH_SYSTEM;
    is_mech_weapon(): this is LancerMECH_WEAPON;
    is_npc_class(): this is LancerNPC_CLASS;
    is_npc_feature(): this is LancerNPC_FEATURE;
    is_npc_template(): this is LancerNPC_TEMPLATE;
    is_organization(): this is LancerORGANIZATION;
    is_pilot_armor(): this is LancerPILOT_ARMOR;
    is_pilot_gear(): this is LancerPILOT_GEAR;
    is_pilot_weapon(): this is LancerPILOT_WEAPON;
    is_reserve(): this is LancerRESERVE;
    is_skill(): this is LancerSKILL;
    is_status(): this is LancerSTATUS;
    is_talent(): this is LancerTALENT;
    is_bond(): this is LancerBOND;
    is_weapon_mod(): this is LancerWEAPON_MOD;
    is_weapon(): this is LancerMECH_WEAPON | LancerPILOT_WEAPON | LancerNPC_FEATURE;
    getTags(): Tag[] | null;
    getBonuses(): BonusData[] | null;
    getLimitedBase(): number | null;
    _hasUses(): this is {
        system: SystemTemplates.uses;
    };
    isLimited(): this is {
        system: SystemTemplates.uses;
    };
    isLoading(): boolean;
    isRecharge(): boolean;
    isUnique(): boolean;
    isAI(): boolean;
    isSmart(): boolean;
    isAP(): boolean;
    isOverkill(): boolean;
    isReliable(): boolean;
    hasActions(): this is {
        system: {
            actions: ActionData[];
        };
    };
    isEquipped(): boolean;
    static fromUuid(x: string | LancerItem, messagePrefix?: string): Promise<LancerItem>;
    static fromUuidSync(x: string | LancerItem, messagePrefix?: string): LancerItem;
    beginWeaponAttackFlow(): Promise<void>;
    beginTechAttackFlow(): Promise<void>;
    beginDamageFlow(): Promise<void>;
    beginSystemFlow(): Promise<void>;
    beginActivationFlow(path?: string): Promise<void>;
    beginCoreActiveFlow(path?: string): Promise<void>;
    beginSkillFlow(): Promise<void>;
    beginBondPowerFlow(powerIndex: number): Promise<void>;
    refreshPowers(): Promise<void>;
}
export type LancerCORE_BONUS = LancerItem & {
    system: SystemData.CoreBonus;
};
export type LancerFRAME = LancerItem & {
    system: SystemData.Frame;
};
export type LancerLICENSE = LancerItem & {
    system: SystemData.License;
};
export type LancerMECH_SYSTEM = LancerItem & {
    system: SystemData.MechSystem;
};
export type LancerMECH_WEAPON = LancerItem & {
    system: SystemData.MechWeapon;
};
export type LancerNPC_CLASS = LancerItem & {
    system: SystemData.NpcClass;
};
export type LancerNPC_FEATURE = LancerItem & {
    system: SystemData.NpcFeature;
};
export type LancerNPC_TEMPLATE = LancerItem & {
    system: SystemData.NpcTemplate;
};
export type LancerORGANIZATION = LancerItem & {
    system: SystemData.Organization;
};
export type LancerPILOT_ARMOR = LancerItem & {
    system: SystemData.PilotArmor;
};
export type LancerPILOT_GEAR = LancerItem & {
    system: SystemData.PilotGear;
};
export type LancerPILOT_WEAPON = LancerItem & {
    system: SystemData.PilotWeapon;
};
export type LancerRESERVE = LancerItem & {
    system: SystemData.Reserve;
};
export type LancerSKILL = LancerItem & {
    system: SystemData.Skill;
};
export type LancerSTATUS = LancerItem & {
    system: SystemData.Status;
};
export type LancerTALENT = LancerItem & {
    system: SystemData.Talent;
};
export type LancerBOND = LancerItem & {
    system: SystemData.Bond;
};
export type LancerWEAPON_MOD = LancerItem & {
    system: SystemData.WeaponMod;
};
export type LancerItemType = EntryType.CORE_BONUS | EntryType.FRAME | EntryType.LICENSE | EntryType.MECH_WEAPON | EntryType.MECH_SYSTEM | EntryType.NPC_CLASS | EntryType.NPC_TEMPLATE | EntryType.NPC_FEATURE | EntryType.ORGANIZATION | EntryType.PILOT_ARMOR | EntryType.PILOT_WEAPON | EntryType.PILOT_GEAR | EntryType.RESERVE | EntryType.SKILL | EntryType.STATUS | EntryType.TALENT | EntryType.BOND | EntryType.WEAPON_MOD;
export declare const ITEM_TYPES: EntryType[];
export declare function is_item_type(type: EntryType): type is LancerItemType;
export {};

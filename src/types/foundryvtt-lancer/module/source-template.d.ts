import { ActionTrackingData } from "./action";
import { InheritedEffectsState } from "./effects/effector";
import { ActivationType, DeployableType, EntryType, FittingSize, FrameEffectUse, MechType, MountType, NpcFeatureType, NpcTechType, OrgType, ReserveType, SystemType, WeaponSize, WeaponSizeChecklist, WeaponType, WeaponTypeChecklist } from "./enums";
import { ActionData } from "./models/bits/action";
import { AmmoData } from "./models/bits/ammo";
import { BonusData } from "./models/bits/bonus";
import { CounterData } from "./models/bits/counter";
import { DamageData } from "./models/bits/damage";
import { PowerData } from "./models/bits/power";
import { BondQuestionData } from "./models/bits/question";
import { RangeData } from "./models/bits/range";
import { SynergyData } from "./models/bits/synergy";
import { TagData } from "./models/bits/tag";
export type DataTypeMap = {
    [key in EntryType]: object;
};
export interface BoundedNum {
    min?: number;
    max?: number;
    value: number;
}
export type WithNullableProperties<T> = {
    [K in keyof T]: T[K] | null;
};
export type FullBoundedNum = Required<BoundedNum>;
export type UUIDRef = string;
export type EmbeddedRef = string;
export type LIDRef = string;
export declare namespace SourceTemplates {
    interface actor_universal {
        lid: string;
        hp: FullBoundedNum;
        overshield: FullBoundedNum;
        burn: number;
        activations: number;
        custom_counters: CounterData[];
        inherited_effects: InheritedEffectsState | null;
    }
    interface item_universal {
        lid: string;
    }
    interface licensed {
        manufacturer: string;
        license_level: number;
        license: string;
    }
    interface bascdt {
        bonuses: BonusData[];
        actions: ActionData[];
        synergies: SynergyData[];
        counters: CounterData[];
        deployables: LIDRef[];
        integrated: LIDRef[];
        tags: TagData[];
    }
    interface destructible {
        cascading: boolean;
        destroyed: boolean;
    }
    interface action_tracking {
        action_tracker: ActionTrackingData;
    }
    interface heat {
        heat: FullBoundedNum;
    }
    interface uses {
        uses: FullBoundedNum;
    }
    interface struss {
        stress: FullBoundedNum;
        structure: FullBoundedNum;
    }
    namespace NPC {
        interface StatBlock {
            activations: number;
            armor: number;
            hp: number;
            evasion: number;
            edef: number;
            heatcap: number;
            speed: number;
            sensor_range: number;
            save: number;
            hull: number;
            agi: number;
            sys: number;
            eng: number;
            size: number;
            structure: number;
            stress: number;
        }
        type NullableStatBlock = WithNullableProperties<StatBlock>;
        interface BaseFeatureData extends uses, destructible {
            lid: string;
            effect: string;
            bonus: NullableStatBlock;
            override: NullableStatBlock;
            tags: TagData[];
            type: NpcFeatureType;
            charged: boolean;
            loaded: boolean;
            tier_override: number;
        }
        interface WeaponData extends BaseFeatureData {
            weapon_type: string;
            damage: DamageData[][];
            range: RangeData[];
            on_hit: string;
            accuracy: number[];
            attack_bonus: number[];
            type: NpcFeatureType.Weapon;
        }
        interface TraitData extends BaseFeatureData {
            type: NpcFeatureType.Trait;
        }
        interface ReactionData extends BaseFeatureData {
            type: NpcFeatureType.Reaction;
            trigger: string;
        }
        interface SystemData extends BaseFeatureData {
            type: NpcFeatureType.System;
        }
        interface TechData extends BaseFeatureData {
            type: NpcFeatureType.Tech;
            tech_type: NpcTechType;
            tech_attack: boolean;
            accuracy: number[] | null;
            attack_bonus: number[] | null;
        }
        type AnyFeature = TechData | SystemData | ReactionData | TraitData | WeaponData;
        type AllFeature = TechData & SystemData & ReactionData & TraitData & WeaponData;
    }
}
export declare namespace SourceData {
    interface CoreBonus extends SourceTemplates.item_universal, SourceTemplates.bascdt {
        description: string;
        effect: string;
        mounted_effect: string;
        manufacturer: string;
    }
    interface Deployable extends SourceTemplates.actor_universal, SourceTemplates.heat {
        actions: ActionData[];
        bonuses: BonusData[];
        counters: CounterData[];
        synergies: SynergyData[];
        tags: TagData[];
        activation: ActivationType;
        stats: {
            armor: number;
            edef: number;
            evasion: number;
            heatcap: number;
            hp: string;
            save: number;
            size: number;
            speed: number;
        };
        cost: number;
        instances: number;
        deactivation: ActivationType;
        detail: string;
        recall: ActivationType;
        redeploy: ActivationType;
        type: DeployableType;
        avail_mounted: boolean;
        avail_unmounted: boolean;
        deployer: UUIDRef | null;
        owner: UUIDRef | null;
    }
    interface Frame extends SourceTemplates.item_universal, SourceTemplates.licensed {
        description: string;
        mechtype: MechType[];
        mounts: MountType[];
        stats: {
            armor: number;
            edef: number;
            evasion: number;
            heatcap: number;
            hp: number;
            repcap: number;
            save: number;
            sensor_range: number;
            size: number;
            sp: number;
            speed: number;
            stress: number;
            structure: number;
            tech_attack: number;
        };
        traits: Array<{
            name: string;
            description: string;
            bonuses: BonusData[];
            counters: CounterData[];
            integrated: LIDRef[];
            deployables: LIDRef[];
            actions: ActionData[];
            synergies: SynergyData[];
            use: FrameEffectUse;
        }>;
        core_system: {
            name: string;
            description: string;
            activation: ActivationType;
            deactivation?: ActivationType;
            use?: FrameEffectUse;
            active_name: string;
            active_effect: string;
            active_synergies: SynergyData[];
            active_bonuses: BonusData[];
            active_actions: ActionData[];
            passive_name?: string;
            passive_effect?: string;
            passive_synergies?: SynergyData[];
            passive_actions: ActionData[];
            passive_bonuses: BonusData[];
            deployables: LIDRef[];
            counters: CounterData[];
            integrated: LIDRef[];
            tags: TagData[];
        };
    }
    interface License extends SourceTemplates.item_universal {
        manufacturer: string;
        key: string;
        curr_rank: number;
    }
    interface Mech extends SourceTemplates.actor_universal, SourceTemplates.action_tracking, SourceTemplates.heat, SourceTemplates.struss {
        overcharge: number;
        repairs: FullBoundedNum;
        core_active: boolean;
        core_energy: number;
        loadout: {
            frame: EmbeddedRef | null;
            weapon_mounts: Array<{
                slots: Array<{
                    weapon: EmbeddedRef | null;
                    mod: EmbeddedRef | null;
                    size: FittingSize;
                }>;
                type: MountType;
                bracing: boolean;
            }>;
            systems: Array<EmbeddedRef>;
        };
        meltdown_timer: number | null;
        notes: string;
        pilot: UUIDRef | null;
    }
    interface MechSystem extends SourceTemplates.item_universal, SourceTemplates.bascdt, SourceTemplates.destructible, SourceTemplates.licensed, SourceTemplates.uses {
        effect: string;
        sp: number;
        description: string;
        type: SystemType;
        ammo: AmmoData[];
    }
    interface MechWeapon extends SourceTemplates.item_universal, SourceTemplates.destructible, SourceTemplates.licensed, SourceTemplates.uses {
        deployables: LIDRef[];
        integrated: LIDRef[];
        sp: number;
        actions: ActionData[];
        profiles: Array<{
            name: string;
            type: WeaponType;
            damage: DamageData[];
            range: RangeData[];
            tags: TagData[];
            description: string;
            effect: string;
            on_attack: string;
            on_hit: string;
            on_crit: string;
            cost: number;
            skirmishable: boolean;
            barrageable: boolean;
            actions: ActionData[];
            bonuses: BonusData[];
            synergies: SynergyData[];
            counters: CounterData[];
        }>;
        loaded: false;
        selected_profile_index: number;
        size: WeaponSize;
        no_core_bonuses: boolean;
        no_mods: boolean;
        no_bonuses: boolean;
        no_synergies: boolean;
        no_attack: boolean;
    }
    interface Npc extends SourceTemplates.actor_universal, SourceTemplates.action_tracking, SourceTemplates.heat, SourceTemplates.struss {
        notes: string;
        meltdown_timer: number | null;
        tier: number;
    }
    interface NpcClass extends SourceTemplates.item_universal {
        role: string;
        flavor: string;
        tactics: string;
        base_features: Set<UUIDRef>;
        optional_features: Set<UUIDRef>;
        base_stats: Array<SourceTemplates.NPC.StatBlock>;
    }
    type NpcFeature = SourceTemplates.NPC.AnyFeature & {
        origin: {
            type: string;
            name: string;
        };
    };
    interface NpcTemplate extends SourceTemplates.item_universal {
        description: string;
        base_features: Set<UUIDRef>;
        optional_features: Set<UUIDRef>;
    }
    interface Organization extends SourceTemplates.item_universal {
        actions: string;
        description: string;
        efficiency: number;
        influence: number;
        purpose: OrgType;
    }
    interface PilotArmor extends SourceTemplates.item_universal, SourceTemplates.bascdt, SourceTemplates.uses {
        description: string;
    }
    interface PilotGear extends SourceTemplates.item_universal, SourceTemplates.bascdt, SourceTemplates.uses {
        description: string;
    }
    interface PilotWeapon extends SourceTemplates.item_universal, SourceTemplates.bascdt, SourceTemplates.uses {
        description: string;
        range: RangeData[];
        damage: DamageData[];
        effect: string;
        loaded: boolean;
    }
    interface Pilot extends SourceTemplates.actor_universal, SourceTemplates.action_tracking {
        active_mech: UUIDRef | null;
        background: string;
        callsign: string;
        cloud_id: string;
        history: string;
        last_cloud_update: string;
        level: number;
        loadout: {
            armor: Array<EmbeddedRef | null>;
            gear: Array<EmbeddedRef | null>;
            weapons: Array<EmbeddedRef | null>;
        };
        hull: number;
        agi: number;
        sys: number;
        eng: number;
        mounted: boolean;
        notes: string;
        player_name: string;
        status: string;
        text_appearance: string;
        bond_state: {
            xp: FullBoundedNum;
            stress: FullBoundedNum;
            xp_checklist: {
                major_ideals: Array<boolean>;
                minor_ideal: boolean;
                veteran_power: boolean;
            };
            answers: Array<string>;
            minor_ideal: string;
            burdens: Array<CounterData>;
            clocks: Array<CounterData>;
        };
    }
    interface Reserve extends SourceTemplates.item_universal, SourceTemplates.bascdt {
        consumable: boolean;
        label: string;
        type: ReserveType;
        used: boolean;
        description: string;
    }
    interface Skill extends SourceTemplates.item_universal {
        description: string;
        detail: string;
        curr_rank: number;
    }
    interface Status extends SourceTemplates.item_universal {
        terse: string;
        effects: string;
        type: "status" | "condition" | "effect";
    }
    interface Talent extends SourceTemplates.item_universal {
        curr_rank: number;
        description: string;
        ranks: Array<{
            name: string;
            description: string;
            exclusive: boolean;
            actions: ActionData[];
            bonuses: BonusData[];
            synergies: SynergyData[];
            deployables: LIDRef[];
            counters: CounterData[];
            integrated: LIDRef[];
        }>;
        terse: string;
    }
    interface Bond extends SourceTemplates.item_universal {
        major_ideals: string[];
        minor_ideals: string[];
        questions: BondQuestionData[];
        powers: PowerData[];
    }
    interface WeaponMod extends SourceTemplates.item_universal, SourceTemplates.bascdt, SourceTemplates.destructible, SourceTemplates.licensed, SourceTemplates.uses {
        added_tags: TagData[];
        added_damage: DamageData[];
        effect: string;
        description: string;
        sp: number;
        allowed_sizes: WeaponSizeChecklist;
        allowed_types: WeaponTypeChecklist;
        added_range: RangeData[];
    }
}
export type SourceDataTypesMap = {
    [EntryType.CORE_BONUS]: SourceData.CoreBonus;
    [EntryType.DEPLOYABLE]: SourceData.Deployable;
    [EntryType.FRAME]: SourceData.Frame;
    [EntryType.LICENSE]: SourceData.License;
    [EntryType.MECH]: SourceData.Mech;
    [EntryType.MECH_SYSTEM]: SourceData.MechSystem;
    [EntryType.MECH_WEAPON]: SourceData.MechWeapon;
    [EntryType.NPC]: SourceData.Npc;
    [EntryType.NPC_CLASS]: SourceData.NpcClass;
    [EntryType.NPC_FEATURE]: SourceData.NpcFeature;
    [EntryType.NPC_TEMPLATE]: SourceData.NpcTemplate;
    [EntryType.ORGANIZATION]: SourceData.Organization;
    [EntryType.PILOT_ARMOR]: SourceData.PilotArmor;
    [EntryType.PILOT_GEAR]: SourceData.PilotGear;
    [EntryType.PILOT_WEAPON]: SourceData.PilotWeapon;
    [EntryType.PILOT]: SourceData.Pilot;
    [EntryType.RESERVE]: SourceData.Reserve;
    [EntryType.SKILL]: SourceData.Skill;
    [EntryType.STATUS]: SourceData.Status;
    [EntryType.TALENT]: SourceData.Talent;
    [EntryType.WEAPON_MOD]: SourceData.WeaponMod;
};
export type SourceDataType<T extends EntryType> = T extends keyof SourceDataTypesMap ? SourceDataTypesMap[T] : never;

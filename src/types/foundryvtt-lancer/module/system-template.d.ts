import { LancerActor, LancerMECH, LancerPILOT } from "./actor/lancer-actor";
import { InheritedEffectsState } from "./effects/effector";
import { ActivationType, DeployableType, EntryType, FittingSize, FrameEffectUse, MechType, MountType, OrgType, SystemType, WeaponSize, WeaponSizeChecklist, WeaponType, WeaponTypeChecklist } from "./enums";
import { LancerBOND, LancerFRAME, LancerMECH_SYSTEM, LancerMECH_WEAPON, LancerNPC_CLASS, LancerNPC_TEMPLATE, LancerPILOT_ARMOR, LancerPILOT_GEAR, LancerPILOT_WEAPON, LancerWEAPON_MOD } from "./item/lancer-item";
import { ActionData } from "./models/bits/action";
import { BonusData } from "./models/bits/bonus";
import { CounterData } from "./models/bits/counter";
import { Damage } from "./models/bits/damage";
import { Range } from "./models/bits/range";
import { SynergyData } from "./models/bits/synergy";
import { Tag, TagData } from "./models/bits/tag";
import { PowerData } from "./models/bits/power";
import { BondQuestionData } from "./models/bits/question";
import { FullBoundedNum, LIDRef, SourceData, SourceTemplates } from "./source-template";
import { AmmoData } from "./models/bits/ammo";
export declare namespace SystemTemplates {
    interface item_universal extends SourceTemplates.item_universal {
        equipped: boolean;
    }
    interface licensed extends SourceTemplates.licensed {
    }
    interface destructible extends SourceTemplates.destructible {
    }
    interface action_tracking extends SourceTemplates.action_tracking {
    }
    interface RollBonusTargets {
        range_attack: number;
        melee_attack: number;
        tech_attack: number;
        ram: number;
        grapple: number;
        hull: number;
        agi: number;
        sys: number;
        eng: number;
    }
    type actor_universal = {
        lid: string;
        burn: number;
        activations: number;
        custom_counters: CounterData[];
        inherited_effects: InheritedEffectsState | null;
        hp: FullBoundedNum;
        overshield: FullBoundedNum;
        edef: number;
        evasion: number;
        speed: number;
        armor: number;
        size: number;
        save: number;
        sensor_range: number;
        tech_attack: number;
        statuses: {
            dangerzone: boolean;
            downandout: boolean;
            engaged: boolean;
            exposed: boolean;
            invisible: boolean;
            prone: boolean;
            shutdown: boolean;
            immobilized: boolean;
            impaired: boolean;
            jammed: boolean;
            lockon: boolean;
            shredded: boolean;
            slowed: boolean;
            stunned: boolean;
            hidden: boolean;
        };
        resistances: {
            kinetic: boolean;
            energy: boolean;
            explosive: boolean;
            heat: boolean;
            burn: boolean;
            variable: boolean;
        };
        hull: number;
        agi: number;
        sys: number;
        eng: number;
        bonuses: {
            weapon_bonuses: BonusData[];
        };
    };
    interface bascdt {
        bonuses: BonusData[];
        actions: ActionData[];
        synergies: SynergyData[];
        counters: CounterData[];
        deployables: LIDRef[];
        integrated: LIDRef[];
        tags: Tag[];
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
        export interface StatBlock extends SourceTemplates.NPC.StatBlock {
        }
        export interface NullableStatBlock extends SourceTemplates.NPC.NullableStatBlock {
        }
        type NPCFixup<T extends {
            tags: TagData[];
            uses: FullBoundedNum;
        }> = Omit<T, "tags" | "uses" | "range" | "damage"> & {
            tags: Tag[];
            uses: FullBoundedNum;
        };
        export interface WeaponData extends NPCFixup<SourceTemplates.NPC.WeaponData> {
            range: Range[];
            damage: Damage[][];
        }
        export interface TraitData extends NPCFixup<SourceTemplates.NPC.TraitData> {
        }
        export interface ReactionData extends NPCFixup<SourceTemplates.NPC.ReactionData> {
        }
        export interface SystemData extends NPCFixup<SourceTemplates.NPC.SystemData> {
        }
        export interface TechData extends NPCFixup<SourceTemplates.NPC.TechData> {
        }
        export type AnyFeature = TechData | SystemData | ReactionData | TraitData | WeaponData;
        export type AllFeature = TechData & SystemData & ReactionData & TraitData & WeaponData;
        export {};
    }
    type ResolvedEmbeddedRef<T> = {
        status: "resolved";
        id: string;
        value: T;
    } | {
        status: "missing";
        id: string;
        value: null;
    };
    type ResolvedSyncUuidRef<T> = ResolvedEmbeddedRef<T>;
}
export type Origined<T> = {
    label: string;
    origin: string;
    val: T;
};
export declare namespace SystemData {
    interface CoreBonus extends SystemTemplates.item_universal, SystemTemplates.bascdt {
        description: string;
        effect: string;
        mounted_effect: string;
        manufacturer: string;
    }
    interface Deployable extends SystemTemplates.actor_universal, SystemTemplates.heat {
        actions: ActionData[];
        counters: CounterData[];
        synergies: SynergyData[];
        tags: Tag[];
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
        deployer: SystemTemplates.ResolvedSyncUuidRef<LancerActor> | null;
        owner: SystemTemplates.ResolvedSyncUuidRef<LancerActor> | null;
        level: number;
        grit: number;
        hp_bonus: number;
    }
    interface Frame extends SystemTemplates.item_universal, SystemTemplates.licensed {
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
            passive_name: string;
            passive_effect: string;
            passive_synergies?: SynergyData[];
            passive_actions: ActionData[];
            passive_bonuses: BonusData[];
            deployables: LIDRef[];
            counters: CounterData[];
            integrated: LIDRef[];
            tags: Tag[];
        };
    }
    interface License extends SourceData.License {
    }
    interface Mech extends SystemTemplates.actor_universal, SystemTemplates.action_tracking, SystemTemplates.heat, SystemTemplates.struss {
        overcharge: number;
        repairs: FullBoundedNum;
        core_active: boolean;
        core_energy: number;
        loadout: {
            frame: SystemTemplates.ResolvedEmbeddedRef<LancerFRAME> | null;
            weapon_mounts: Array<{
                slots: Array<{
                    weapon: SystemTemplates.ResolvedEmbeddedRef<LancerMECH_WEAPON> | null;
                    mod: SystemTemplates.ResolvedEmbeddedRef<LancerWEAPON_MOD> | null;
                    size: FittingSize;
                }>;
                type: MountType;
                bracing: boolean;
            }>;
            systems: Array<SystemTemplates.ResolvedEmbeddedRef<LancerMECH_SYSTEM> | null>;
            sp: FullBoundedNum;
            ai_cap: FullBoundedNum;
            limited_bonus: number;
        };
        meltdown_timer: number | null;
        notes: string;
        pilot: SystemTemplates.ResolvedSyncUuidRef<LancerPILOT> | null;
        overcharge_sequence: string;
        structure_repair_cost: number;
        stress_repair_cost: number;
        level: number;
        grit: number;
    }
    interface MechSystem extends SystemTemplates.item_universal, SystemTemplates.bascdt, SystemTemplates.destructible, SystemTemplates.licensed, SystemTemplates.uses {
        effect: string;
        sp: number;
        description: string;
        type: SystemType;
        ammo: AmmoData[];
    }
    interface MechWeapon extends SystemTemplates.item_universal, SystemTemplates.destructible, SystemTemplates.licensed, SystemTemplates.uses {
        deployables: LIDRef[];
        integrated: LIDRef[];
        sp: number;
        actions: ActionData[];
        profiles: Array<{
            name: string;
            type: WeaponType;
            damage: Damage[];
            range: Range[];
            tags: Tag[];
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
            bonus_damage: Damage[];
            bonus_tags: Tag[];
            bonus_range: Range[];
            all_damage: Damage[];
            all_tags: Tag[];
            all_range: Range[];
        }>;
        loaded: false;
        selected_profile_index: number;
        size: WeaponSize;
        no_core_bonuses: boolean;
        no_mods: boolean;
        no_bonuses: boolean;
        no_synergies: boolean;
        no_attack: boolean;
        all_base_tags: Tag[];
        all_tags: Tag[];
        active_profile: this["profiles"][0];
        mod: LancerWEAPON_MOD;
    }
    interface Npc extends SystemTemplates.actor_universal, SystemTemplates.action_tracking, SystemTemplates.heat, SystemTemplates.struss {
        notes: string;
        meltdown_timer: number | null;
        tier: number;
        class: LancerNPC_CLASS | null;
        templates: LancerNPC_TEMPLATE[];
    }
    interface NpcClass extends SystemTemplates.item_universal {
        role: string;
        info: {
            flavor: string;
            tactics: string;
        };
        base_features: Set<LIDRef>;
        optional_features: Set<LIDRef>;
        base_stats: Array<SystemTemplates.NPC.StatBlock>;
    }
    type NpcFeature = SystemTemplates.NPC.AnyFeature & {
        origin: {
            type: string;
            name: string;
        };
    };
    interface NpcTemplate extends SystemTemplates.item_universal {
        description: string;
        base_features: Set<LIDRef>;
        optional_features: Set<LIDRef>;
    }
    interface Organization extends SystemTemplates.item_universal {
        actions: string;
        description: string;
        efficiency: number;
        influence: 0;
        purpose: OrgType;
    }
    interface PilotArmor extends SystemTemplates.item_universal, SystemTemplates.bascdt, SystemTemplates.uses {
        description: string;
    }
    interface PilotGear extends SystemTemplates.item_universal, SystemTemplates.bascdt, SystemTemplates.uses {
        description: string;
    }
    interface PilotWeapon extends SystemTemplates.item_universal, SystemTemplates.bascdt, SystemTemplates.uses {
        description: string;
        range: Range[];
        damage: Damage[];
        effect: string;
        loaded: boolean;
    }
    interface Pilot extends SystemTemplates.actor_universal, SystemTemplates.action_tracking {
        active_mech: SystemTemplates.ResolvedSyncUuidRef<LancerMECH> | null;
        background: string;
        callsign: string;
        cloud_id: string;
        history: string;
        last_cloud_update: string;
        level: number;
        loadout: {
            armor: Array<SystemTemplates.ResolvedEmbeddedRef<LancerPILOT_ARMOR> | null>;
            gear: Array<SystemTemplates.ResolvedEmbeddedRef<LancerPILOT_GEAR> | null>;
            weapons: Array<SystemTemplates.ResolvedEmbeddedRef<LancerPILOT_WEAPON> | null>;
        };
        mounted: boolean;
        notes: string;
        player_name: string;
        status: string;
        text_appearance: string;
        bond: LancerBOND | null;
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
        grit: number;
    }
    interface Reserve extends SourceData.Reserve {
    }
    interface Skill extends SourceData.Skill {
    }
    interface Status extends SourceData.Status {
    }
    interface Talent extends SystemTemplates.item_universal {
        curr_rank: number;
        description: string;
        terse: string;
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
        actions: ActionData[];
        bonuses: BonusData[];
        synergies: SynergyData[];
        counters: CounterData[];
    }
    interface Bond extends SystemTemplates.item_universal {
        major_ideals: string[];
        minor_ideals: string[];
        questions: BondQuestionData[];
        powers: PowerData[];
    }
    interface WeaponMod extends SystemTemplates.item_universal, SystemTemplates.bascdt, SystemTemplates.destructible, SystemTemplates.licensed, SystemTemplates.uses {
        added_tags: Tag[];
        added_damage: Damage[];
        effect: string;
        description: string;
        sp: number;
        allowed_sizes: WeaponSizeChecklist;
        allowed_types: WeaponTypeChecklist;
        added_range: Range[];
    }
}
export type SystemDataTypesMap = {
    [EntryType.CORE_BONUS]: SystemData.CoreBonus;
    [EntryType.DEPLOYABLE]: SystemData.Deployable;
    [EntryType.FRAME]: SystemData.Frame;
    [EntryType.LICENSE]: SystemData.License;
    [EntryType.MECH]: SystemData.Mech;
    [EntryType.MECH_SYSTEM]: SystemData.MechSystem;
    [EntryType.MECH_WEAPON]: SystemData.MechWeapon;
    [EntryType.NPC]: SystemData.Npc;
    [EntryType.NPC_CLASS]: SystemData.NpcClass;
    [EntryType.NPC_FEATURE]: SystemData.NpcFeature;
    [EntryType.NPC_TEMPLATE]: SystemData.NpcTemplate;
    [EntryType.ORGANIZATION]: SystemData.Organization;
    [EntryType.PILOT_ARMOR]: SystemData.PilotArmor;
    [EntryType.PILOT_GEAR]: SystemData.PilotGear;
    [EntryType.PILOT_WEAPON]: SystemData.PilotWeapon;
    [EntryType.PILOT]: SystemData.Pilot;
    [EntryType.RESERVE]: SystemData.Reserve;
    [EntryType.SKILL]: SystemData.Skill;
    [EntryType.STATUS]: SystemData.Status;
    [EntryType.TALENT]: SystemData.Talent;
    [EntryType.WEAPON_MOD]: SystemData.WeaponMod;
};
export type SystemDataType<T extends EntryType> = T extends keyof SystemDataTypesMap ? SystemDataTypesMap[T] : never;

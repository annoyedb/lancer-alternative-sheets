import { AttackType, DamageType, NpcFeatureType, StabOptions1, StabOptions2, SystemType } from "../enums";
import { AccDiffHudData } from "../apps/acc_diff";
import { ActionData } from "../models/bits/action";
import { DamageData } from "../models/bits/damage";
import { Tag, TagData } from "../models/bits/tag";
import { LancerToken } from "../token";
import { DamageHudData } from "../apps/damage";
export declare namespace LancerFlowState {
    interface BaseRollData {
        type: "base";
        title: string;
        roll_str: string;
        result?: RollResult;
        icon?: string;
    }
    export interface RollResult {
        roll: Roll;
        tt: string | HTMLElement | JQuery<HTMLElement>;
    }
    export interface StatRollData extends Omit<BaseRollData, "type"> {
        type: "stat";
        path: string;
        bonus: string | number;
        acc_diff?: AccDiffHudData;
        effect?: string;
    }
    export interface SaveRollData extends Omit<StatRollData, "type"> {
        type: "save";
    }
    export type AttackRolls = {
        roll: string;
        targeted: {
            target: LancerToken;
            roll: string;
            usedLockOn: boolean | null;
        }[];
    };
    export type AttackResult = {
        roll: Roll;
        tt: string | HTMLElement | JQuery<HTMLElement>;
    };
    export type DamageResult = {
        roll: Roll;
        tt: string | HTMLElement | JQuery<HTMLElement>;
        d_type: DamageType;
        bonus: boolean;
        target?: LancerToken;
    };
    export interface DamageResultSerialized extends Omit<DamageResult, "target"> {
        target?: string;
    }
    export type SelfHeatResult = {
        roll: Roll;
        tt: string | HTMLElement | JQuery<HTMLElement>;
    };
    export type HitResult = {
        target: LancerToken;
        total: string;
        usedLockOn: boolean;
        hit: boolean;
        crit: boolean;
    };
    export interface HitResultWithRoll extends HitResult {
        roll: Roll;
        tt: string | HTMLElement | JQuery<HTMLElement>;
    }
    export interface RolledDamage {
        type: DamageType;
        amount: number;
    }
    export interface DamageTargetResult {
        target: LancerToken;
        damage: RolledDamage[];
        hit: boolean;
        crit: boolean;
        ap: boolean;
        paracausal: boolean;
        half_damage: boolean;
    }
    export interface DamageTargetResultSerialized extends Omit<DamageTargetResult, "target"> {
        target: string;
    }
    export interface AttackRollData extends Omit<BaseRollData, "type"> {
        type: "attack";
        flat_bonus: number;
        acc_diff?: AccDiffHudData;
        attack_type: AttackType;
        action: ActionData | null;
        effect?: string;
        on_attack?: string;
        on_hit?: string;
        on_crit?: string;
        tags?: Tag[];
        self_heat?: string;
        self_heat_result?: SelfHeatResult;
        scene_uuid?: string;
        origin_space?: [number, number];
        target_spaces?: [number, number][];
        is_smart: boolean;
        defense?: string;
        attack_rolls: AttackRolls;
        attack_results: AttackResult[];
        hit_results: HitResult[];
        reroll_data: string;
    }
    export interface WeaponRollData extends Omit<AttackRollData, "type"> {
        type: "weapon";
        damage?: DamageData[];
        bonus_damage?: DamageData[];
        loaded?: boolean;
        destroyed?: boolean;
    }
    export interface TechAttackRollData extends Omit<AttackRollData, "type"> {
        type: "tech";
        invade: boolean;
        damage?: DamageData[];
        bonus_damage?: DamageData[];
        destroyed?: boolean;
    }
    export interface DamageRollData extends Omit<Omit<BaseRollData, "type">, "roll_str"> {
        type: "damage";
        configurable: boolean;
        add_burn: boolean;
        damage_hud_data?: DamageHudData;
        invade?: boolean;
        tags: Tag[];
        ap: boolean;
        paracausal: boolean;
        half_damage: boolean;
        overkill: boolean;
        overkill_heat?: number;
        reliable: boolean;
        reliable_val?: number;
        damage: DamageData[];
        bonus_damage?: DamageData[];
        hit_results: HitResult[];
        has_normal_hit: boolean;
        has_crit_hit: boolean;
        reliable_results?: DamageResult[];
        damage_results: DamageResult[];
        crit_damage_results: DamageResult[];
        reliable_total?: number;
        damage_total: number;
        crit_total: number;
        targets: DamageTargetResult[];
    }
    export interface BurnCheckData extends DamageRollData {
        check_total?: number;
        amount: number;
    }
    export interface ActionUseData extends Omit<BaseRollData, "type"> {
        type: "action";
        acc: number;
        action_path: string;
        action: ActionData | null;
        self_heat?: string;
        self_heat_result?: SelfHeatResult;
        detail: string;
        tags: Tag[];
    }
    export interface SystemUseData {
        title: string;
        type: SystemType.System | SystemType.Mod | NpcFeatureType | null;
        effect: string;
        tags?: Tag[];
        self_heat?: string;
        self_heat_result?: SelfHeatResult;
    }
    export interface TalentUseData {
        title: string;
        lvl: number;
        rank: {
            name: string;
            description: string;
        };
    }
    export interface BondPowerUseData {
        title: string;
        powerIndex: number;
        description: string;
    }
    export interface GenericData {
        title: string;
        effect: string;
    }
    export interface ReactionRollData {
        title: string;
        trigger: string;
        effect: string;
        tags?: TagData[];
    }
    export interface TextRollData {
        title: string;
        description: string;
        tags?: TagData[];
    }
    export interface HTMLToChatData {
        html: string;
    }
    export interface ActionTrackData extends TextRollData {
        start: boolean;
    }
    export interface OverchargeRollData extends Omit<BaseRollData, "type"> {
        type: "overcharge";
        level: number;
    }
    export interface RechargeRollData extends Omit<BaseRollData, "type"> {
        type: "recharge";
        recharging_uuids: string[];
        charged: {
            name: string;
            target: number;
            charged: boolean;
        }[];
    }
    export interface PrimaryStructureRollData extends Omit<BaseRollData, "type"> {
        type: "structure";
        desc: string;
        val: number;
        max: number;
        result?: {
            roll: Roll;
            tt: string | HTMLElement | JQuery<HTMLElement>;
            total: string;
        };
        reroll_data?: {
            structure: number;
        };
        remStruct: number;
        embedButtons?: Array<string>;
    }
    export interface SecondaryStructureRollData extends Omit<BaseRollData, "type"> {
        type: "secondary_structure";
        desc: string;
        result?: {
            roll: Roll;
            tt: string | HTMLElement | JQuery<HTMLElement>;
            total: string;
        };
    }
    export interface OverheatRollData extends Omit<BaseRollData, "type"> {
        type: "overheat";
        desc: string;
        val: number;
        max: number;
        result?: {
            roll: Roll;
            tt: string | HTMLElement | JQuery<HTMLElement>;
            total: string;
        };
        reroll_data?: {
            stress: number;
        };
        remStress: number;
        embedButtons?: Array<string>;
    }
    export interface CascadeRollData extends Omit<BaseRollData, "type"> {
        type: "cascade";
        desc: string;
        ai_systems: string[];
        result?: {
            roll: Roll;
            tt: string | HTMLElement | JQuery<HTMLElement>;
            total: string;
        };
    }
    export interface StabilizeData {
        title: string;
        description: string;
        option1: StabOptions1;
        option2: StabOptions2;
    }
    export interface InvocationData {
        fn: string;
        args: Array<any>;
        iconPath?: string;
        title: string;
    }
    type RollData = BaseRollData | StatRollData | AttackRollData | WeaponRollData | TechAttackRollData | ActionUseData;
    export function isStatRoll(data: RollData): data is StatRollData;
    export function isAttackRoll(data: RollData): data is AttackRollData;
    export function isWeaponRoll(data: RollData): data is WeaponRollData;
    export function isTechRoll(data: RollData): data is TechAttackRollData;
    export function isActionRoll(data: RollData): data is ActionUseData;
    export enum BasicFlowType {
        FullRepair = "FullRepair.label",
        Stabilize = "Stabilize",
        Overheat = "Overheat",
        Structure = "Structure",
        Burn = "Burn",
        Overcharge = "Overcharge",
        BasicAttack = "BasicAttack",
        Damage = "Damage",
        TechAttack = "TechAttack"
    }
    export {};
}

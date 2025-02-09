import { LancerItem } from "../item/lancer-item";
import { LancerActor } from "../actor/lancer-actor";
import { AccDiffHudData, AccDiffHudDataSerialized } from "../apps/acc_diff";
import { UUIDRef } from "../source-template";
import { LancerFlowState } from "./interfaces";
import { Flow, FlowState, Step } from "./flow";
/** Create the attack roll(s) for a given attack configuration */
export declare function attackRolls(flat_bonus: number, acc_diff: AccDiffHudData): LancerFlowState.AttackRolls;
export type AttackFlag = {
    origin: string;
    attackerUuid: string;
    attackerItemUuid?: string;
    invade?: boolean;
    targets: {
        id: string;
        setConditions?: object;
        total: string;
        hit: boolean;
        crit: boolean;
    }[];
};
export declare function registerAttackSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class BasicAttackFlow extends Flow<LancerFlowState.AttackRollData> {
    name: string;
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.AttackRollData>);
}
/**
 * Flow for rolling weapon attacks against one or more targets
 */
export declare class WeaponAttackFlow extends Flow<LancerFlowState.WeaponRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.WeaponRollData>);
    begin(data?: LancerFlowState.WeaponRollData): Promise<boolean>;
}
export declare function initAttackData(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData>, options?: {
    title?: string;
    flat_bonus?: number;
    acc_diff?: AccDiffHudDataSerialized;
}): Promise<boolean>;
export declare function checkWeaponLoaded(state: FlowState<LancerFlowState.WeaponRollData>): Promise<boolean>;
export declare function setAttackTags(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData>, options?: {}): Promise<boolean>;
export declare function setAttackEffects(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData>, options?: {}): Promise<boolean>;
export declare function setAttackTargets(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData>, options?: {}): Promise<boolean>;
export declare function showAttackHUD(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData>, options?: {}): Promise<boolean>;
export declare function rollAttacks(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData>, options?: {}): Promise<boolean>;
export declare function clearTargets(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.DamageRollData>): Promise<boolean>;
export declare function printAttackCard(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData>, options?: {
    template?: string;
}): Promise<boolean>;

import { Flow, FlowState, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerItemUtilSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare function checkItemDestroyed(state: FlowState<LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData | LancerFlowState.ActionUseData>): Promise<boolean>;
export declare function checkItemLimited(state: FlowState<LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData | LancerFlowState.ActionUseData>): Promise<boolean>;
export declare function checkItemCharged(state: FlowState<LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData | LancerFlowState.ActionUseData>): Promise<boolean>;
export declare function applySelfHeat(state: FlowState<LancerFlowState.AttackRollData | LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData | LancerFlowState.ActionUseData | LancerFlowState.SystemUseData>, options?: {}): Promise<boolean>;
export declare function updateItemAfterAction(state: FlowState<LancerFlowState.WeaponRollData | LancerFlowState.TechAttackRollData | LancerFlowState.ActionUseData | LancerFlowState.SystemUseData>, options?: {}): Promise<boolean>;

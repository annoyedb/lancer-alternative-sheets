import { UUIDRef } from "../source-template";
import { LancerFlowState } from "./interfaces";
import { Flow, FlowState, Step } from "./flow";
import { LancerActor } from "../actor/lancer-actor";
export declare function registerOverheatSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
/**
 * OverheatFlow manages all the steps necessary for the initial overheat rolls and outcomes.
 */
export declare class OverheatFlow extends Flow<LancerFlowState.OverheatRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerActor, data?: Partial<LancerFlowState.OverheatRollData>);
}
/**
 * Performs initial checks and verifications that should be made BEFORE rolling for overheat.
 *
 * @param actor   - Actor or ID of actor to overheat
 * @param reroll_data - Data to use if rerolling. Setting this also supresses the dialog.
 */
export declare function preOverheatRollChecks(state: FlowState<LancerFlowState.OverheatRollData>): Promise<boolean>;
/**
 * Perform roll on overheat table
 */
export declare function rollOverheatTable(state: FlowState<LancerFlowState.OverheatRollData>): Promise<boolean>;
/**
 * Handle logic for when a mech has no stress remaining.
 */
export declare function noStressRemaining(state: FlowState<LancerFlowState.OverheatRollData>): Promise<boolean>;
/**
 * Handle logic for multiple ones in the overheat check.
 */
export declare function checkOverheatMultipleOnes(state: FlowState<LancerFlowState.OverheatRollData>): Promise<boolean>;
/**
 * Check whether an ENGI check is needed, and construct the button if so.
 * @param state
 * @returns
 */
export declare function overheatInsertEngCheckButton(state: FlowState<LancerFlowState.OverheatRollData>): Promise<boolean>;

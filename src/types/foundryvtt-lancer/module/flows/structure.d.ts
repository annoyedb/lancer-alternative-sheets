import { UUIDRef } from "../source-template";
import { LancerFlowState } from "./interfaces";
import { Flow, FlowState, Step } from "./flow";
import { LancerActor } from "../actor/lancer-actor";
export declare function registerStructureSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
/**
 * StructureFlow manages all the steps necessary for the initial structure rolls and outcomes.
 */
export declare class StructureFlow extends Flow<LancerFlowState.PrimaryStructureRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerActor, data?: Partial<LancerFlowState.PrimaryStructureRollData>);
}
/**
 * Performs initial checks and verifications that should be made BEFORE rolling for structure.
 *
 * @param actor   - Actor or ID of actor to structure
 * @param reroll_data - Data to use if rerolling. Setting this also supresses the dialog.
 */
export declare function preStructureRollChecks(state: FlowState<LancerFlowState.PrimaryStructureRollData>): Promise<boolean>;
/**
 * Perform roll on structure table
 */
export declare function rollStructureTable(state: FlowState<LancerFlowState.PrimaryStructureRollData>): Promise<boolean>;
/**
 * Handle logic for when a mech has no structure remaining.
 */
export declare function noStructureRemaining(state: FlowState<LancerFlowState.PrimaryStructureRollData>): Promise<boolean>;
/**
 * Handle logic for multiple ones in the structure check.
 */
export declare function checkStructureMultipleOnes(state: FlowState<LancerFlowState.PrimaryStructureRollData>): Promise<boolean>;
/**
 * Check whether a Hull check is needed, and construct the button if so.
 * @param state
 * @returns
 */
export declare function structureInsertHullCheckButton(state: FlowState<LancerFlowState.PrimaryStructureRollData>): Promise<boolean>;
/**
 * Check whether a secondary roll is needed, and construct the button if so.
 */
export declare function structureInsertSecondaryRollButton(state: FlowState<LancerFlowState.PrimaryStructureRollData>): Promise<boolean>;
export declare function structureInsertCascadeRollButton(state: FlowState<LancerFlowState.PrimaryStructureRollData> | FlowState<LancerFlowState.OverheatRollData>): Promise<boolean>;
/*******************************
 * Secondary Structure Code    *
 *******************************/
/**
 * Helper function for beginning the secondary structure flow
 */
export declare function beginSecondaryStructureFlow(actorUuid: UUIDRef, flowArgs?: Partial<LancerFlowState.SecondaryStructureRollData>): Promise<boolean>;
/**
 * Flow for managing secondary structure rolls and effects
 */
export declare class SecondaryStructureFlow extends Flow<LancerFlowState.SecondaryStructureRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerActor, data?: Partial<LancerFlowState.SecondaryStructureRollData>);
}
/**
 * SECONDARY STRUCTURE ROLL LOGIC
 */
export declare function secondaryStructureRoll(state: FlowState<LancerFlowState.SecondaryStructureRollData>): Promise<boolean>;
/**
 * This function should be attached to the actor update hook to trigger structure/stress flows
 */
export declare function triggerStrussFlow(actor: LancerActor, changed: DeepPartial<LancerActor["data"]>): void;

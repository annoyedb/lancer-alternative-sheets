import { UUIDRef } from "../source-template";
import { LancerFlowState } from "./interfaces";
import { Flow, FlowState, Step } from "./flow";
import { LancerActor } from "../actor/lancer-actor";
export declare function registerCascadeSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
/*******************************
 * Cascade Code                *
 *******************************/
/**
 * Helper function for beginning the secondary structure flow
 */
export declare function beginCascadeFlow(actorUuid: UUIDRef, flowArgs?: Partial<LancerFlowState.CascadeRollData>): Promise<boolean>;
/**
 * Flow for managing secondary structure rolls and effects
 */
export declare class CascadeFlow extends Flow<LancerFlowState.CascadeRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerActor, data?: Partial<LancerFlowState.CascadeRollData>);
}
/**
 * CASCADE ROLL LOGIC
 */
export declare function initCascadeData(state: FlowState<LancerFlowState.CascadeRollData>): Promise<boolean>;
export declare function cascadeRoll(state: FlowState<LancerFlowState.CascadeRollData>): Promise<boolean>;

import { LancerActor } from "../actor/lancer-actor";
import { LancerFlowState } from "./interfaces";
import { Flow, Step } from "./flow";
export declare function registerNPCSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class NPCRechargeFlow extends Flow<LancerFlowState.RechargeRollData> {
    static steps: string[];
    constructor(uuid: LancerActor, data?: Partial<LancerFlowState.RechargeRollData>);
}

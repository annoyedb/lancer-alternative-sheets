import { LancerItem } from "../item/lancer-item";
import type { LancerActor } from "../actor/lancer-actor";
import { LancerFlowState } from "./interfaces";
import { Flow, FlowState, Step } from "./flow";
import { UUIDRef } from "../source-template";
export declare function registerFullRepairSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class FullRepairFlow extends Flow<LancerFlowState.TextRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.TextRollData>);
}
export declare function displayFullRepairDialog(state: FlowState<LancerFlowState.TextRollData>): Promise<boolean>;
export declare function executeFullRepair(state: FlowState<LancerFlowState.TextRollData>): Promise<boolean>;

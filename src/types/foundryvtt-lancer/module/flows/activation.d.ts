import { LancerItem } from "../item/lancer-item";
import type { LancerActor } from "../actor/lancer-actor";
import { LancerFlowState } from "./interfaces";
import { Flow, FlowState, Step } from "./flow";
import { UUIDRef } from "../source-template";
export declare function registerActivationSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class ActivationFlow extends Flow<LancerFlowState.ActionUseData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.ActionUseData>);
}
export declare function initActivationData(state: FlowState<LancerFlowState.ActionUseData>, options?: {
    title?: string;
    action_path?: string;
}): Promise<boolean>;
export declare function printActionUseCard(state: FlowState<LancerFlowState.ActionUseData>, options?: {
    template?: string;
}): Promise<boolean>;

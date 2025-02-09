import { LancerActor } from "../actor/lancer-actor";
import { AccDiffHudDataSerialized } from "../apps/acc_diff";
import { LancerFlowState } from "./interfaces";
import { LancerItem } from "../item/lancer-item";
import { Flow, FlowState, Step } from "./flow";
import { UUIDRef } from "../source-template";
export declare function registerTechAttackSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class TechAttackFlow extends Flow<LancerFlowState.TechAttackRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.TechAttackRollData>);
}
export declare function initTechAttackData(state: FlowState<LancerFlowState.TechAttackRollData>, options?: {
    title?: string;
    flat_bonus?: number;
    acc_diff?: AccDiffHudDataSerialized;
    action_path?: string;
}): Promise<boolean>;
export declare function printTechAttackCard(state: FlowState<LancerFlowState.TechAttackRollData>, options?: {
    template?: string;
}): Promise<boolean>;

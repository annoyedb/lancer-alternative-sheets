import { LancerActor } from "../actor/lancer-actor";
import { LancerFlowState } from "./interfaces";
import { ActivationFlow } from "./activation";
import { FlowState } from "./flow";
import { LancerItem } from "../item/lancer-item";
export declare function registerCoreActiveSteps(flowSteps: Map<string, any>): void;
export declare class CoreActiveFlow extends ActivationFlow {
    static steps: string[];
    constructor(uuid: string | LancerItem | LancerActor, data?: Partial<LancerFlowState.ActionUseData>);
}
export declare function checkCorePower(state: FlowState<LancerFlowState.ActionUseData>): Promise<boolean>;
export declare function consumeCorePower(state: FlowState<LancerFlowState.ActionUseData>): Promise<void>;

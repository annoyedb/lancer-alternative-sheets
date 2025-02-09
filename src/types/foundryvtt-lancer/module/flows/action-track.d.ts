import { LancerActor } from "../actor/lancer-actor";
import { Flow, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerActionTrackSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class ActionTrackFlow extends Flow<LancerFlowState.ActionTrackData> {
    static steps: string[];
    constructor(uuid: LancerActor, data?: Partial<LancerFlowState.ActionTrackData>);
}

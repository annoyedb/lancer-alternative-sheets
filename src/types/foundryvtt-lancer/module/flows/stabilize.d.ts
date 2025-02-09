import { LancerActor } from "../actor/lancer-actor";
import { Flow, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
import { UUIDRef } from "../source-template";
export declare function registerStabilizeSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class StabilizeFlow extends Flow<LancerFlowState.StabilizeData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerActor, data?: Partial<LancerFlowState.StabilizeData>);
}

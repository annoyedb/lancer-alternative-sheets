import { LancerActor } from "../actor/lancer-actor";
import { LancerFlowState } from "./interfaces";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { Flow, Step } from "./flow";
export declare function registerStatSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class StatRollFlow extends Flow<LancerFlowState.StatRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data: Partial<LancerFlowState.StatRollData>);
}

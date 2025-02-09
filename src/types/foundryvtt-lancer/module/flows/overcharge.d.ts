import { LancerActor } from "../actor/lancer-actor";
import { LancerFlowState } from "./interfaces";
import { Flow } from "./flow";
import { UUIDRef } from "../source-template";
import { LancerItem } from "../item/lancer-item";
export declare function registerOverchargeSteps(flowSteps: Map<string, any>): void;
export declare class OverchargeFlow extends Flow<LancerFlowState.OverchargeRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.OverchargeRollData>);
}

import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { Flow, Step } from "./flow";
import { DamageRollFlow } from "./damage";
import { LancerFlowState } from "./interfaces";
export declare function registerBurnSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class BurnFlow extends DamageRollFlow {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data: Partial<LancerFlowState.BurnCheckData>);
}

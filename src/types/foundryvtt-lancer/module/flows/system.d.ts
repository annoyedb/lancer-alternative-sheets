import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { LancerFlowState } from "./interfaces";
import { Flow } from "./flow";
export declare function registerSystemSteps(flowSteps: Map<string, any>): void;
export declare class SystemFlow extends Flow<LancerFlowState.SystemUseData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem, data?: Partial<LancerFlowState.SystemUseData>);
}

import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { Flow, FlowState, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerBondPowerSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class BondPowerFlow extends Flow<LancerFlowState.BondPowerUseData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.BondPowerUseData>);
    begin(data?: LancerFlowState.BondPowerUseData): Promise<boolean>;
}
export declare function initPowerData(state: FlowState<LancerFlowState.BondPowerUseData>, options?: {
    name?: string;
    powerIndex?: number;
    description?: string;
}): Promise<boolean>;
export declare function updatePowerUses(state: FlowState<LancerFlowState.BondPowerUseData>, options?: {}): Promise<boolean>;
export declare function printPowerCard(state: FlowState<LancerFlowState.BondPowerUseData>, options?: {
    template?: string;
}): Promise<boolean>;

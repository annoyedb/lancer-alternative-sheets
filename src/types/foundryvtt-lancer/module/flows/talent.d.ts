import { LancerItem } from "../item/lancer-item";
import { Flow, FlowState, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerTalentSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class TalentFlow extends Flow<LancerFlowState.TalentUseData> {
    static steps: string[];
    constructor(uuid: string | LancerItem, data: Partial<LancerFlowState.TalentUseData>);
}
/**
 * Simple wrapper for printGenericCard to override the HBS template used
 * @param state Flow state to print
 * @returns true if successful
 */
export declare function printTalentCard(state: FlowState<LancerFlowState.TalentUseData>): Promise<boolean>;

import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { Flow, FlowState, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerDamageSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
/**
 * Flow for rolling and applying damage to a token, typically from a weapon attack
 */
export declare class DamageRollFlow extends Flow<LancerFlowState.DamageRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.DamageRollData>);
}
export declare function rollReliable(state: FlowState<LancerFlowState.DamageRollData>): Promise<boolean>;
export declare function rollNormalDamage(state: FlowState<LancerFlowState.DamageRollData>): Promise<boolean>;
export declare function rollCritDamage(state: FlowState<LancerFlowState.DamageRollData>): Promise<boolean>;
/**
 * Given an evaluated roll, create a new roll that doubles the dice and reuses
 * the dice from the original roll.
 * @param normal The orignal Roll
 * @returns An evaluated Roll
 */
export declare function getCritRoll(normal: Roll): Promise<Roll<{}>>;
/*********************************************
    ======== Chat button handlers ==========
*********************************************/
/**
 * This function is attached to damage roll buttons in chat. It constructs the initial
 * data for a DamageFlow, then begins the flow.
 * @param event Click event on a button in a chat message
 */
export declare function rollDamageCallback(event: JQuery.ClickEvent): Promise<void>;
/**
 * This function is attached to damage application buttons in chat. It performs calls
 * LancerActor.damageCalc to calculate and apply the final damage, and sets a flag
 * on the chat message to indicate the damage for this target has been applied.
 * @param event Click event on a button in a chat message
 */
export declare function applyDamage(event: JQuery.ClickEvent): Promise<void>;
export declare function undoDamage(event: JQuery.ClickEvent): Promise<void>;

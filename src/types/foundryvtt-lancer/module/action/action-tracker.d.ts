/**
 * Module class for moderation of actor action data.
 */
import { ActionTrackingData, ActionType } from ".";
import { LancerActor } from "../actor/lancer-actor";
/**
 * Similar to activationIcon, but for action tracking data
 * @param action The action track action to get the icon for
 * @returns CSS classes for the matching icon
 */
export declare function actionIcon(action: keyof ActionTrackingData): string;
export declare const _defaultActionData: (target: LancerActor) => ActionTrackingData;
export declare const _endTurnActionData: () => ActionTrackingData;
/**
 * Get proxy for ease of migration when we change over to MM data backing.
 * @returns actions map.
 */
export declare function getActions(actor: LancerActor): ActionTrackingData | null;
/**
 * Set proxy for ease of migration when we change over to MM data backing.
 */
export declare function updateActions(actor: LancerActor, actions: ActionTrackingData): Promise<void>;
/**
 * Spends an action or triggers end turn effect (empty all actions).
 * @param actor actor to modify.
 * @param spend whether to refresh or spend an action.
 * @param type specific action to spend, or undefined for end-turn behavior.
 */
export declare function modAction(actor: LancerActor, spend: boolean, type?: ActionType): Promise<void>;
export declare function toggleAction(actor: LancerActor, type: ActionType): Promise<void>;

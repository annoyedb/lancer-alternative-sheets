import type { LancerCombat, LancerCombatant } from "./combat/lancer-combat";
export declare const registerSettings: () => void;
/**
 * Retrieve the automation settings for the system. If automation is turned
 * off, all keys will be `false`.
 * @param useDefault - Control if the returned value is the default.
 *                     (default: `false`)
 */
export declare function getAutomationOptions(useDefault?: boolean): AutomationOptions;
/**
 * Object for the various automation settings in the system
 */
export interface AutomationOptions {
    /**
     * Master switch for automation
     * @defaultValue `true`
     */
    enabled: boolean;
    /**
     * Toggle for whether or not you want the system to auto-calculate hits,
     * damage, and other attack related checks.
     * @defaultValue `true`
     */
    attacks: boolean;
    /**
     * When a mech rolls a structure/overheat macro, should it automatically
     * decrease structure/stress?
     * @defaultValue `true`
     */
    structure: boolean;
    /**
     * When a mech rolls an overcharge, should it automatically apply heat?
     * @defaultValue `true`
     */
    overcharge_heat: boolean;
    /**
     * When a mech rolls an attack with heat (self) and/or overkill, should it
     * automatically apply heat?
     * @defaultValue `true`
     */
    attack_self_heat: boolean;
    /**
     * Handle limited/loading items automatically, or leave that up to the user
     * @defaultValue `true`
     */
    limited_loading: boolean;
    /**
     * Automatically recharge NPC systems at the start of their turn
     * @defaultValue `true`
     */
    npc_recharge: boolean;
    /**
     * Remove measured templates created by attacks when the turn changes
     * @defaultValue `false`
     */
    remove_templates: boolean;
    /**
     * Automatically manage token sizes based on the actor
     * @defaultValue `true`
     */
    token_size: boolean;
}
/**
 * Retrieve the automation settings for the system. If automation is turned
 * off, all keys will be `false`.
 * @param useDefault - Control if the returned value is the default.
 *                     (default: `false`)
 */
export declare function getActionTrackerOptions(useDefault?: boolean): ActionTrackerOptions;
/**
 * Object for the various automation settings in the system
 */
export interface ActionTrackerOptions {
    /**
     * Whether the hotbar should be displayed.
     * @defaultValue `true`
     */
    showHotbar: boolean;
    /**
     * Whether the players (non-GMs) can modify actions.
     * @defaultValue `true`
     */
    allowPlayers: boolean;
    /**
     * Whether to print turn start/end chat messages.
     * @defaultValue `true`
     */
    printMessages: boolean;
}
/**
 * Retrieve the status icon configuration for the system.
 * @param useDefault - Control if the returned value is the default.
 *                     (default: `false`)
 */
export declare function getStatusIconConfigOptions(useDefault?: boolean): StatusIconConfigOptions;
/**
 * Object for the various automation settings in the system
 */
export interface StatusIconConfigOptions {
    /**
     * Enable the default icon set for conditions & status
     * @defaultValue `true`
     */
    defaultConditionsStatus: boolean;
    /**
     * Enable Cancermantis' icon set for conditions & status
     * @defaultValue `false`
     */
    cancerConditionsStatus: boolean;
    /**
     * Enable Cancermantis' icon set for NPC templates
     * @defaultValue `false`
     */
    cancerNPCTemplates: boolean;
    /**
     * Enable Hayley's icon set for conditions & status.
     * @defaultValue `false`
     */
    hayleyConditionsStatus: boolean;
    /**
     * Enable Hayley's icon set for PC system effects.
     * @defaultValue `false`
     */
    hayleyPC: boolean;
    /**
     * Enable Hayley's icon set for NPC system effects.
     * @defaultValue `false`
     */
    hayleyNPC: boolean;
    /**
     * Enable Hayley's icon set for utility indicators.
     * @defaultValue `false`
     */
    hayleyUtility: boolean;
    /**
     * Enable Tommy's icon set for conditions & status.
     * @defaultValue `false`
     */
    tommyConditionsStatus: boolean;
}
declare global {
    interface DocumentClassConfig {
        Combat: typeof LancerCombat;
        Combatant: typeof LancerCombatant;
    }
}

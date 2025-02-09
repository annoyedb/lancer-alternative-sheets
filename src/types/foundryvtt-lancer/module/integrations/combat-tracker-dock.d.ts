import type { LancerActor } from "../actor/lancer-actor";
import type { LancerCombatant } from "../combat/lancer-combat";
import "./lancer-combat-tracker-dock.scss";
/**
 * Creates a short description to be displayed under the name of the combatant
 * in the tooltip. Not particularly useful atm as is only displays to players
 * with ownership/observer permissions.
 */
export declare function generateDescription(actor: LancerActor): string | undefined;
/**
 * Parameters for the initiative display. Use this to display the total
 * activations instead of the initiative value.
 */
export declare function getInitiativeDisplay(combatant: LancerCombatant): {
    value: number | undefined;
    icon: string;
    rollIcon: string;
};
interface SystemIcon {
    icon: string;
    fontSize: string;
    color?: string | null | undefined;
    enabled?: boolean;
    visible?: boolean;
    callback?: (event: unknown, combatant: LancerCombatant, iconIndex: number, iconId: string) => unknown;
    id?: string;
}
/**
 * Get an array of icons to be displayed on the card when the option is
 * enabled. Displays an activation button for each remaining activation and a
 * deactivate button if the combatant is the current turn.
 */
export declare function getSystemIcons(combatant: LancerCombatant): SystemIcon[];
export {};

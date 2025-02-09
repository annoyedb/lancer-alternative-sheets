import { EntryType } from "../enums";
import { LancerItemSheet } from "./item-sheet";
/**
 * Extend the generic Lancer item sheet
 * @extends {LancerItemSheet}
 */
export declare class LancerNPCFeatureSheet extends LancerItemSheet<EntryType.NPC_FEATURE> {
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
}

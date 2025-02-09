import { LancerItemSheet } from "./item-sheet";
import { EntryType } from "../enums";
/**
 * Extend the generic Lancer item sheet
 * @extends {LancerItemSheet}
 */
export declare class LancerLicenseSheet extends LancerItemSheet<EntryType.LICENSE> {
    /**
     * @override
     * Extend and override the default options used by the generic Lancer item sheet
     */
    static get defaultOptions(): ItemSheet.Options;
    getData(): Promise<import("../interfaces").LancerItemSheetData<EntryType.LICENSE>>;
    /**
     * @override
     */
    _activateContextListeners(html: JQuery): void;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
}

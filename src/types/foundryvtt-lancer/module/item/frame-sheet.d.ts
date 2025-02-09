import { EntryType } from "../enums";
import { LancerItemSheetData } from "../interfaces";
import { LancerItemSheet } from "./item-sheet";
/**
 * Extend the generic Lancer item sheet
 * @extends {LancerItemSheet}
 */
export declare class LancerFrameSheet extends LancerItemSheet<EntryType.FRAME> {
    /**
     * @override
     * Extend and override the default options used by the generic Lancer item sheet
     */
    static get defaultOptions(): ItemSheet.Options;
    _onChangeMount(event: any): Promise<void>;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    getData(): Promise<LancerItemSheetData<EntryType.FRAME>>;
}

import type { LancerItemSheetData } from "../interfaces";
import type { LancerItem, LancerItemType } from "./lancer-item";
import { CollapseHandler } from "../helpers/collapse";
/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export declare class LancerItemSheet<T extends LancerItemType> extends ItemSheet<ItemSheet.Options, LancerItemSheetData<T>> {
    constructor(document: LancerItem, options: ItemSheet.Options);
    protected collapse_handler: CollapseHandler;
    /**
     * @override
     * Extend and override the default options used by the Item Sheet
     */
    static get defaultOptions(): ItemSheet.Options;
    /** @override */
    get template(): string;
    /**
     * Private helper that applies context menus according to the editability of the sheet.
     * @param html {JQuery}    The prepared HTML object ready to be rendered into the DOM
     * @param data_getter      Reference to a function which can provide the sheet data
     * @param commit_func      Reference to a function which can commit/save data back to the document
     */
    _activateContextListeners(html: JQuery): void;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    /**
     * Implement the _updateObject method as required by the parent class spec
     * This defines how to update the subject of the form when the form is submitted
     * @private
     */
    _updateObject(_event: Event | JQuery.Event, formData: any): Promise<any>;
    /**
     * Prepare data for rendering the frame sheet
     * The prepared data object contains both the actor data as well as additional sheet options
     */
    getData(): Promise<LancerItemSheetData<T>>;
}

import { ResolvedDropData } from "../helpers/dragdrop";
import type { LancerActorSheetData } from "../interfaces";
import { LancerItem } from "../item/lancer-item";
import { LancerActor, LancerActorType } from "./lancer-actor";
import { CollapseHandler } from "../helpers/collapse";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerActorSheet<T extends LancerActorType> extends ActorSheet<ActorSheet.Options, LancerActorSheetData<T>> {
    protected collapse_handler: CollapseHandler;
    static get defaultOptions(): ActorSheet.Options;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    _activateFlowDragging(html: JQuery): void;
    _onFlowButtonDragStart(e: DragEvent): void;
    _activateActionGridListeners(html: JQuery): Promise<void>;
    _activateFlowListeners(html: JQuery): void;
    /**
     * Handles inventory button
     */
    _activateInventoryButton(html: any): void;
    canRootDrop(_item: ResolvedDropData): boolean;
    onRootDrop(_item: ResolvedDropData, _event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
    protected _createDragDropHandlers(): DragDrop[];
    quickOwn(document: LancerItem): Promise<[LancerItem, boolean]>;
    quickOwnDrop(drop: ResolvedDropData): Promise<[ResolvedDropData, boolean]>;
    _propagateData(formData: any): any;
    /**
     * Implement the _updateObject method as required by the parent class spec
     * This defines how to update the subject of the form when the form is submitted
     * @private
     */
    _updateObject(_event: Event, formData: any): Promise<LancerActor | undefined>;
    /**
     * Prepare data for rendering the Actor sheet
     * The prepared data object contains both the actor data as well as additional sheet options
     */
    getData(): Promise<LancerActorSheetData<T>>;
}

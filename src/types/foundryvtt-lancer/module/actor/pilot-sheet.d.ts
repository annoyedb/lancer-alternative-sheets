import { LancerActorSheet } from "./lancer-actor-sheet";
import type { HelperOptions } from "handlebars";
import { LancerActor, LancerMECH, LancerPILOT } from "./lancer-actor";
import { ResolvedDropData } from "../helpers/dragdrop";
import { EntryType } from "../enums";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerPilotSheet extends LancerActorSheet<EntryType.PILOT> {
    /**
     * Extend and override the default options used by the Pilot Sheet
     * @returns {Object}
     */
    static get defaultOptions(): ActorSheet.Options;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    _onPilotJsonUpload(ev: JQuery.ChangeEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): void;
    _onPilotJsonParsed(fileData: string | null, actor: LancerActor): Promise<void>;
    activateMech(mech: LancerMECH): void;
    deactivateMech(): Promise<void>;
    getData(): Promise<import("../interfaces").LancerActorSheetData<EntryType.PILOT>>;
    canRootDrop(item: ResolvedDropData): boolean;
    onRootDrop(base_drop: ResolvedDropData, event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
    /**
     * Implement the _updateObject method as required by the parent class spec
     * This defines how to update the subject of the form when the form is submitted
     * @private
     */
    _updateObject(event: Event, formData: any): Promise<LancerActor | undefined>;
}
export declare function pilotCounters(pilot: LancerPILOT, _options: HelperOptions): string;
export declare function allMechPreview(_options: HelperOptions): string;
export declare function mech_preview(mech: LancerMECH, active: boolean, _options: HelperOptions): string;

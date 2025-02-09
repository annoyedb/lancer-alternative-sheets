import { LancerActorSheet } from "./lancer-actor-sheet";
import { ResolvedDropData } from "../helpers/dragdrop";
import { EntryType } from "../enums";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerNPCSheet extends LancerActorSheet<EntryType.NPC> {
    /**
     * Extend and override the default options used by the NPC Sheet
     */
    static get defaultOptions(): ActorSheet.Options;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    _onDragMacroableStart(event: DragEvent): void;
    canRootDrop(item: ResolvedDropData): boolean;
    onRootDrop(base_drop: ResolvedDropData, event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
}

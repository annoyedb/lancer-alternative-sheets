import { LancerActorSheet } from "./lancer-actor-sheet";
import { ResolvedDropData } from "../helpers/dragdrop";
import { EntryType } from "../enums";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerDeployableSheet extends LancerActorSheet<EntryType.DEPLOYABLE> {
    /**
     * Extend and override the default options used by the NPC Sheet
     */
    static get defaultOptions(): ActorSheet.Options;
    canRootDrop(item: ResolvedDropData): boolean;
    onRootDrop(drop: ResolvedDropData, _event: JQuery.DropEvent<any, any, any, any>, _dest: JQuery<HTMLElement>): Promise<void>;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: any): void;
}

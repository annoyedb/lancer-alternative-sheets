import { LancerActorSheet } from "./lancer-actor-sheet";
import type { LancerMECH } from "./lancer-actor";
import { ResolvedDropData } from "../helpers/dragdrop";
import { EntryType } from "../enums";
import { LancerActorSheetData } from "../interfaces";
import { LancerMechSheet } from '@foundryvtt-lancer/actor/mech-sheet';

/**
 * Extend the basic ActorSheet
 */

class LancerMechSheet extends LancerActorSheet<EntryType.MECH> {
    /**
     * Extend and override the default options used by the NPC Sheet
     */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        token?: import("../token").LancerTokenDocument | null | undefined;
        classes: string[];
        template: string;
        viewPermission: 0 | 1 | 2 | 3;
        baseApplication: string | null;
        width: number;
        height: number;
        top: number | null;
        left: number | null;
        scale?: number | null | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        title: string;
        scrollY: string[];
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
        dragDrop: Omit<DragDrop.Options, "permissions" | "callbacks">[];
        filters: Omit<SearchFilter.Options, "callback">[];
        closeOnSubmit: boolean;
        submitOnChange: boolean;
        submitOnClose: boolean;
        editable: boolean;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        classes: string[];
        template: string;
        width: number;
        height: number;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
    }, never>>;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    canRootDrop(item: ResolvedDropData): boolean;
    onRootDrop(base_drop: ResolvedDropData, event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
    /**
     * Handles actions in the overcharge panel
     */
    _activateOverchargeControls(html: JQuery<HTMLElement>): void;
    /**
     * Sets the overcharge level for this actor
     * @param event An event, used by a proper overcharge section in the sheet, to get the overcharge field
     * @param level Level to set overcharge to
     */
    _setOverchargeLevel(_event: JQuery.ClickEvent, level: number): Promise<LancerMECH | undefined>;
    /**
     * Handles more niche controls in the loadout in the overcharge panel
     */
    _activateLoadoutControls(html: any): void;
    _activateMountContextMenus(html: any): void;
    _event_handler(mode: "reset-wep" | "reset-all-weapon-mounts" | "reset-sys" | "overcharge" | "overcharge-rollback", evt: JQuery.ClickEvent): Promise<void>;
    getData(): Promise<LancerActorSheetData<EntryType.MECH>>;
}

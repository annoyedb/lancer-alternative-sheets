import type { HelperOptions } from "handlebars";
import { LancerItem, LancerItemType, LancerMECH_SYSTEM, LancerMECH_WEAPON, LancerNPC_FEATURE, LancerPILOT_GEAR, LancerPILOT_WEAPON, LancerWEAPON_MOD } from "../item/lancer-item";
import { ResolvedDropData } from "./dragdrop";
import { LancerDoc } from "../util/doc";
import { EntryType } from "../enums";
import { LancerActor } from "../actor/lancer-actor";
import { LancerActiveEffect } from "../effects/lancer-active-effect";
export declare function ref_params(doc: LancerDoc, path?: string): string;
export declare function simple_ref_slot(path: string | undefined, accept_types: string | EntryType[], _options: HelperOptions): string;
export declare function click_evt_open_ref(event: any): Promise<void>;
export declare function resolve_ref_element(elt: HTMLElement): Promise<LancerItem | LancerActor | LancerActiveEffect | null>;
/**
 * Creates an img that is also a draggable ref. Expects guaranteed data! Use this to display the primary image in item/actor sheets,
 * so that they can be used as a sort of "self" ref
 *
 * @param img_path The path to read/edit said image
 * @param item The reffable item/actor itself
 */
export declare function refPortrait<T extends EntryType>(img: string, img_path: string, item: LancerDoc<T>, _options: HelperOptions): string;
export declare function itemPreview<T extends LancerItemType>(item_path: string, trash_action: "delete" | "splice" | "null" | null, options: HelperOptions): string;
export declare function limitedUsesIndicator(item: LancerMECH_WEAPON | LancerMECH_SYSTEM | LancerWEAPON_MOD | LancerPILOT_WEAPON | LancerPILOT_GEAR | LancerNPC_FEATURE, path: string, options?: {
    nonInteractive?: boolean;
}): string;
export declare function loadingIndicator(item: LancerMECH_WEAPON | LancerPILOT_WEAPON | LancerWEAPON_MOD | LancerNPC_FEATURE, path: string, options?: {
    nonInteractive?: boolean;
}): string;
export declare function chargedIndicator(item: LancerNPC_FEATURE, path: string, options?: {
    nonInteractive?: boolean;
}): string;
export declare function reserveUsesIndicator(path: string, options: HelperOptions): string;
export declare function lidItemList(itemArrayPath: string, values: LancerItem[], allowedTypes: string, options: HelperOptions): string;
export declare function dropIndicator(allowed_types: string, options: HelperOptions): string;
export declare function handleRefClickOpen(html: JQuery): void;
export declare function handleDocListDropping<T>(html: JQuery, root_doc: LancerActor | LancerItem): void;
export declare function handleLIDListDropping<T>(html: JQuery, root_doc: LancerActor | LancerItem): void;
export declare function handleUsesInteraction<T>(html: JQuery, doc: LancerActor | LancerItem): void;
export declare function handleLoadedInteraction(html: JQuery, _doc: LancerActor | LancerItem): void;
export declare function handleChargedInteraction(html: JQuery, _doc: LancerActor | LancerItem): void;
export declare function handleRefDragging(html: JQuery): void;
export declare function handleRefSlotDropping(html: JQuery, root_doc: LancerActor | LancerItem, pre_finalize_drop: ((drop: ResolvedDropData) => Promise<ResolvedDropData>) | null): void;

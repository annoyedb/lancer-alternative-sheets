import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { EntryType } from "../enums";
export type AnyDragoverEvent = JQuery.DragOverEvent | JQuery.DragEnterEvent | JQuery.DragLeaveEvent | JQuery.DropEvent;
export type DropHandler = (doc: ResolvedDropData, dest: JQuery, evt: JQuery.DropEvent) => void;
export type DropPredicate = (drop: ResolvedDropData, drag_dest: JQuery, dragover_event: AnyDragoverEvent) => boolean;
export type HoverHandler = (mode: "enter" | "leave", doc: ResolvedDropData, drag_dest: JQuery, drag_event: JQuery.DragEnterEvent | JQuery.DragLeaveEvent) => void;
/**
 * Enables dropability on the specified jquery items, using the global drag state as a lookup to allow synchronous doc handling
 *
 * @param items Either an existing jquery object, or a string with which to $() make it
 *
 * @param drop_handler: Callback provided with the data for the drag, the dest of the drag, as well as the dragover event.
 * It is called once, on a successful drop
 * Note that it is guaranteed to have passed the allow_drop function if one was provided
 * Not all of these arguments are usually necessary: remember you can just _ away unused vars
 *
 * @param allow_drop: Optional callback provided with the dest of the drag, as well as the dragover event.
 * It determines if the dest is a valid drop target
 *
 * @param hover_handler: Optional callback provided with all info as the drop handler, but also is informed if the mouse is entering or exiting
 * This can be used for fancier on-hover enter/exit visual behavior. It is only called if dropping is permitted on that item
 */
export declare function handleDocDropping(items: JQuery, drop_handler: DropHandler, allow_drop?: DropPredicate, hover_handler?: HoverHandler): void;
/**
 * Enables draggability on the specified jquery items/query.
 * The first argument is either an existing jquery object, or a string with which to $() make it
 * The second argument is a callback that deduces the drag payload from the drag element. Also provides event, if that is eaasier
 * The third argument is an optional callback that facillitates toggling styling changes on the drag source
 */
type DragDeriveDataFunc = (drag_source: JQuery, event: JQuery.DragStartEvent) => string;
type DragStartEndFunc = (mode: "start" | "stop", drag_source: JQuery, event: JQuery.DragStartEvent | JQuery.DragEndEvent) => void;
export declare function handleDragging(items: string | JQuery, data_transfer_func: DragDeriveDataFunc, start_stop_func?: DragStartEndFunc): void;
export type FoundryDropData = {
    type: "Actor" | "Item" | "JournalEntry" | "Macro" | "Scene";
    uuid: string;
};
export type LancerFlowDropData = {
    uuid: string;
    lancerType: EntryType;
    flowType: DroppableFlowType;
    flowSubtype?: string;
    args?: object;
};
export declare enum DroppableFlowType {
    BASIC = "lancer-flow-button",
    STAT = "roll-stat",
    ATTACK = "roll-attack",
    TECH_ATTACK = "roll-tech",
    CHAT = "chat-flow-button",
    SKILL = "skill-flow",
    BOND_POWER = "bond-power-flow",
    EFFECT = "effect-flow",
    ACTIVATION = "activation-flow",
    CORE_ACTIVE = "core_system.activation-flow"
}
export type ResolvedDropData = {
    type: "Item";
    document: LancerItem;
} | {
    type: "Actor";
    document: LancerActor;
} | {
    type: "JournalEntry";
    document: JournalEntry;
} | {
    type: "Scene";
    document: Scene;
} | {
    type: "Macro";
    document: Macro;
};
export declare function resolveNativeDrop(drop: string | FoundryDropData): Promise<ResolvedDropData | null>;
export declare let GlobalDragPreview: ResolvedDropData | null;
export declare function applyGlobalDragListeners(): void;
export {};

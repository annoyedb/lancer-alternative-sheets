import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
export type CollapseRegistry = {
    [LID: string]: number;
};
export declare const COLLAPSE_KEY = "collapse_state";
/** To make collapsible work on a sheet, that sheet must export as part of its getData() function an instance of this object,
 * under the key [COLLAPSE_KEY]
 */
export declare class CollapseHandler {
    private state;
    toggle(id: string): boolean;
    get(id: string): boolean;
}
/**Generate a UID for the given collapse item
 *
 * */
/**
 * Generate a unique id for the given collapse item
 * @param collapse Collapse ID registry to operate in
 * @param doc The document / id we are generating a new ID based off of
 * @param no_inc Whether we should re-use the previous index, if one exists. This allows consecutively generated IDs to be aliased to each other - they will collapse each other
 */
export declare function collapseID(collapse: CollapseRegistry, doc: string | LancerActor | LancerItem | null | undefined, no_inc: boolean): string;
/**
 * Generates a button for toggling collapse state of a thing. To be used in conjuncture with collapseParam
 * @param collapse G
 * @param doc
 * @param no_increment
 * @returns
 */
export declare function collapseButton(collapse: CollapseRegistry | undefined | null, doc?: string | LancerActor | LancerItem | null, no_increment?: boolean): string;
export declare function collapseParam(collapse: CollapseRegistry | undefined | null, doc?: string | LancerActor | LancerItem | null, no_increment?: boolean): string;
/**
 * Generalized collapse activator
 */
export declare function applyCollapseListeners(html: JQuery): void;
export declare function initializeCollapses(html: JQuery): void;

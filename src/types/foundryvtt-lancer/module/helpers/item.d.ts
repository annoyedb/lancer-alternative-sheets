import type { HelperOptions } from "handlebars";
import { ActivationType, ChipIcons, FittingSize } from "../enums";
import { Damage } from "../models/bits/damage";
import { Range } from "../models/bits/range";
import { LancerBOND, LancerItem, LancerNPC_CLASS, LancerNPC_TEMPLATE } from "../item/lancer-item";
import { LancerActor, LancerDEPLOYABLE } from "../actor/lancer-actor";
import { CounterData } from "../models/bits/counter";
import { FullBoundedNum } from "../source-template";
/**
 * Handlebars helper for weapon size selector
 */
export declare function weaponSizeSelector(path: string, options: HelperOptions): string;
/**
 * Handlebars helper for weapon type selector. First parameter is the existing selection.
 */
export declare function weaponTypeSelector(path: string, options: HelperOptions): string;
/**
 * Handlebars helper for range type/value editing
 * Supply with path to Range, and any args that you'd like passed down to the standard input editors, as well as
 */
export declare function rangeEditor(path: string, options: HelperOptions): string;
/**
 * Handlebars helper for weapon damage type/value editing.
 * Supply with path to Damage, and any args that you'd like passed down to the standard input editors
 */
export declare function damageEditor(path: string, options: HelperOptions): string;
/**
 * Handlebars helper for showing damage values.
 * Supply with the array of Damage[], as well as:
 * - classes: Any additional classes to put on the div holding them
 */
export declare function damageArrayView(damages: Damage[], options: HelperOptions & {
    rollable?: boolean;
}): string;
/**
 * Handlebars helper for showing range values
 */
export declare function rangeArrayView(ranges: Range[], options: HelperOptions): string;
/**
 * Handlebars helper for an NPC feature preview attack bonus stat
 * @param atk {number} Attack bonus to render
 */
export declare function npcAttackBonusView(atk: number, txt?: string): string;
/**
 * Handlebars helper for an NPC feature preview accuracy stat
 * @param acc {number} Accuracy bonus to render
 */
export declare function npcAccuracyView(acc: number): string;
/**
 * Handlebars partial for weapon type selector
 */
export declare function systemTypeSelector(path: string, options: HelperOptions): string;
/**
 * Handlebars partial for limited uses remaining
 * TODO: make look more like compcon
 */
export declare function usesControl(uses_path: string, max_uses: number, options: HelperOptions): string;
export declare function npcFeatureView(npc_feature_path: string, options: HelperOptions): string;
/** Expected arguments:
 * - bonuses_path=<string path to the bonuses array>,  ex: ="doc.system.bonuses"
 * - bonuses=<bonus array to pre-populate with>.
 * Displays a list of bonuses, with buttons to add/delete (if edit true)
 */
export declare function bonusesDisplay(bonuses_path: string, edit: boolean, options: HelperOptions): string;
/** Expected arguments:
 * - bonus_path=<string path to the individual bonus item>,  ex: ="doc.system.actions.3"
 * - bonus=<bonus object to pre-populate with>
 */
export declare function singleActionEditor(path: string, options: HelperOptions): string;
export declare function bondPower(bond_path: string, power_index: number, options: HelperOptions): string;
export declare function pilotArmorSlot(armor_path: string, options: HelperOptions): string;
export declare function pilotWeaponRefview(weapon_path: string, options: HelperOptions): string;
export declare function pilotGearRefview(gear_path: string, options: HelperOptions): string;
export declare function bondPowerUsesIndicator(item: LancerBOND, power_index: number, path: string): string;
export declare function reserveRefView(reserve_path: string, options: HelperOptions): string;
/**
 * Handlebars helper for a mech weapon preview card. Doubles as a slot. Mech path needed for bonuses
 * SPECIFICALLY for loadout - expects things to be slot based
 */
export declare function mechLoadoutWeaponSlot(weapon_path: string, mod_path: string, size: FittingSize, // Needed if slot is empty
options: HelperOptions): string;
export declare function mechWeaponDisplay(weapon_path: string, mod_path: string | null, options: HelperOptions): string;
export declare function weaponModView(mod_path: string, weapon_path: string | null, options: HelperOptions): string;
export declare function licenseRefView(item_path: string, options: HelperOptions): string;
export declare function framePreview(path: string, options: HelperOptions): string;
export declare function npcClassRefView(npc_class: LancerNPC_CLASS | null, item_path?: string): string;
export declare function npcTemplateRefView(template: LancerNPC_TEMPLATE | null, item_path?: string): string;
export declare function actionTypeIcon(a_type: string): string;
/**
 * Builds the HTML for a given action in a given document
 * @param doc  Document which holds the action
 * @param path  Path to the action within the document
 * @param options Options such as:
 *        full    Determines if we should generate full HTML info or just mini version (title & action)
 *        tags    If we should show tags here
 * @returns Activation HTML in string form
 */
export declare function buildActionHTML(doc: LancerItem | LancerActor, path: string, options?: {
    hideChip?: boolean;
    nonInteractive?: boolean;
    editable?: boolean;
    full?: boolean;
    tags?: boolean;
}): string;
export declare function buildActionArrayHTML(doc: LancerActor | LancerItem, path: string, options?: {
    editable?: boolean;
    hideChip?: boolean;
    nonInteractive?: boolean;
}): string;
/**
 * Handlebars helper to build the HTML for an array of deployable references in another item.
 * @param item  Path to this item
 * @param array_path  Path to this deployables (LID) location relative to item
 * @param options.vertical If true, will use a vertical layout more suitable to narrow views
 * @param options.nonInteractive If true, will disable or hide any interactive elements
 * @returns Deployable HTML in string form
 */
export declare function buildDeployablesArrayHBS(item: LancerItem, array_path: string, helperOptions: HelperOptions, options?: {
    vertical?: boolean;
    nonInteractive?: boolean;
}): string;
/**
 * Build the HTML for an array of deployable actors
 * @param item The item which the deployables belong to
 * @param deployables Map of deployable actors, indexed by the owner's LID string
 * @param options Options to configure the resulting HTML:
 * @param options.vertical If true, will use a vertical layout more suitable to narrow views
 * @param options.nonInteractive If true, will disable or hide any interactive elements
 * @returns Deployable card HTML string
 */
export declare function buildDeployablesArray(item: LancerItem, deployables: Record<string, LancerDEPLOYABLE>, options?: {
    vertical?: boolean;
    nonInteractive?: boolean;
}): string;
/**
 * Builds the HTML for a given deployable.
 * @param dep The deployable, already resolved
 * @param source Information about where it came from, if applicable
 * @returns Activation HTML in string form
 */
export declare function buildDeployableHTML(dep: LancerDEPLOYABLE, source: {
    item: LancerItem;
    path: string;
} | null, options?: {
    vertical?: boolean;
    nonInteractive?: boolean;
}): string;
/**
 * Build a little clickable chip to activate an item.
 * If trying to use a deployable, you should still provide the item uuid & the path to the deployable within it
 * @param activation The type of activation.
 * @param flowData Options to configure the chip.
 * @param flowData.icon The icon to use. Defaults to chat icon if not provided.
 * @param flowData.label Optional label to prepend to the action type text.
 * @param flowData.uuid The uuid of the item to activate. Must be provided with path.
 * @param flowData.path The path to the action within the item. Must be provided with uuid.
 * @returns
 */
export declare function buildChipHTML(activation: ActivationType, flowData?: {
    icon?: ChipIcons | string;
    label?: string;
    uuid?: string;
    path?: string;
}, options?: {
    nonInteractive?: boolean;
}): string;
export declare function buildCounterHTML(data: CounterData, path: string, options?: {
    noContextMenu?: boolean;
    canDelete?: boolean;
}): string;
/**
 * NOTE IT DOES NOT INCLUDE TRAILING /div tag!
 */
export declare function buildCounterHeader(data: CounterData, path: string, options?: {
    noContextMenu?: boolean;
    canDelete?: boolean;
}): string;
export declare function buildCounterArrayHTML(counters: CounterData[] | {
    counter: CounterData;
    source: any;
}[], path: string, fully_editable?: boolean): string;
export declare function genericCounter(name: string, data: FullBoundedNum, path: string): string;
export declare function handleInputPlusMinusButtons(html: JQuery, root_doc: LancerActor | LancerItem): void;
export declare function handleCounterInteraction(html: JQuery, root_doc: LancerActor | LancerItem): void;
export declare function handlePowerUsesInteraction<T>(html: JQuery, doc: LancerActor | LancerItem): void;
/**
 * Attach context menus to the appropriate elements and events
 * @param html The html to bind listeners to
 * @param doc Document to be modified
 * @param view_only If edit options should be presented
 */
export declare function handleContextMenus(html: JQuery, doc: LancerActor | LancerItem, view_only?: boolean): void;

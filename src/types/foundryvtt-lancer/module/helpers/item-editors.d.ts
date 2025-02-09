import type { HelperOptions } from "handlebars";
export declare function item_edit_arrayed_actions(path: string, title: string, options: HelperOptions): string;
/**
 * The standard damage editor
 * @param path      Path to the Damage array
 * @param title     Title of our editor, in case we don't just want it to be DAMAGE
 * @param options    Standard helper object
 * @returns         HTML for an editable damage area
 */
export declare function item_edit_arrayed_damage(path: string, title: string, options: HelperOptions): string;
/**
 * The standard range editor
 * @param path      Path to the Range array
 * @param title     Title of our editor, in case we don't just want it to be RANGE
 * @param options    Standard helper object
 * @returns         HTML for an editable range area
 */
export declare function item_edit_arrayed_range(path: string, title: string, options: HelperOptions): string;
/**
 * The standard bonus editor
 * @param path      Path to the Bonus array
 * @param options    Standard helper object
 * @returns         HTML for an editable bonus area
 */
export declare function item_edit_arrayed_bonuses(path: string, options: HelperOptions): string;
export declare function item_edit_arrayed_counters(): string;
/**
 * The standard deployable editor
 * @param path      Path to the Deployable array
 * @param title     Title of our editor
 * @param options    Standard helper object
 * @returns         HTML for an editable deployable area
 */
export declare function item_edit_arrayed_deployables(path: string, title: string, options: HelperOptions): string;
/**
 * The standard synergy editor
 * @param path      Path to the Synergy array
 * @param title     Title of our editor
 * @param options    Standard helper object
 * @returns         HTML for an editable synergy area
 */
export declare function item_edit_arrayed_synergies(path: string, title: string, options: HelperOptions): string;
/**
 * Allows for control of an array of selectors, build from a given enum. No validation is performed
 * @param title         Title of the field
 * @param path          Path to the array
 * @param enum_name     Enum to use. Must be added here and in commons > control_structs
 *                       Currently supported:
 *                          * WeaponSize
 *                          * WeaponType
 *                          * Activation
 * @param options        Standard helper object
 * @returns             HTML for an array of selectable, addable and removable items from the struct
 */
export declare function item_edit_arrayed_enum(title: string, path: string, enum_name: string, options: HelperOptions): string;
export declare function item_edit_checkboxes_object(title: string, path: string, options: HelperOptions): string;
export declare function item_edit_enum(path: string, enum_name: string, options: HelperOptions): string;
/**
 * The edit field to be used for any items
 * @param path      Path of the effect
 * @param options    Standard helper
 * @returns         HTML for effect editor
 */
export declare function item_edit_effect(path: string, options: HelperOptions): string;
/**
 * The standard integrated item editor
 * @param path      Path to the Integrated array
 * @param title     Title of our editor
 * @param options    Standard helper object
 * @returns         HTML for an editable integrated area
 */
export declare function item_edit_arrayed_integrated(path: string, title: string, options: HelperOptions): string;
/**
 * Renders a license to be used in any editable item.
 * Rank is editable, license itself is editable via drag & drop.
 * TODO: Should probably abstract out license data to not be locked to the root
 * @param options    Standard helper from the template
 * @returns         HTML for license in string format
 */
export declare function item_edit_license(options: HelperOptions): string;
/**
 * A standard SP editor
 * @param path      Path where we store our SP cost
 * @param options    Standard helper
 * @returns         HTML for our SP editor
 */
export declare function item_edit_sp(path: string, options: HelperOptions): string;
/**
 * Standard uses editor, for Uses at the root of the given document
 * @param cur_uses_path  Data path to the current uses
 * @param max_uses_path  Data path to the maximum uses
 * @param options         Standard helper from the template for a given document
 * @returns              HTML to edit Uses and Max Uses
 */
export declare function item_edit_uses(cur_uses_path: string, max_uses_path: string, options: HelperOptions): string;

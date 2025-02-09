import type { HelperOptions } from "handlebars";
import type { GenControlContext } from "../interfaces";
import { ActivationType } from "../enums";
import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
export declare const defaultPlaceholder = "// MISSING ENTRY //";
export declare function inc_if(val: string, test: any): string;
export declare function lancerDiceRoll(roll: Roll, tooltip?: string, icon?: string): string;
export declare function checked(truthytest: any): string;
export declare function selected(truthytest: any): string;
/** Insert an array item specified by a dot pathspec, in place
 * Inserted BEFORE that element. If specified index is beyond the length of the array, will simply be appended.
 * If "delete" specified, deletes (splices) instead. Value is unused
 * Has no effect if target is not an array.
 * @param target The object our path dives into
 * @param flat_path A dotpath to our target property
 * @param value The item we wish to insert into the array, if we are inserting
 * @param mode Whether we are inserting or deleting into the array
 */
export declare function array_path_edit(target: any, flat_path: string, value: any, mode: "insert" | "delete"): void;
/**
 * As above, but generates the "after" state of the targeted property.
 * Suitable for use with .updates. Does not actually edit the object.
 * As an example,
 *
 * array_path_edit_result({ foo: [ 1, 2, 3 ]}, "foo.2", 5, "insert")
 * will yield
 * {
 *  path: "foo",
 *  new_val: [1, 2, 5, 3]
 * }
 * @param target The object our path dives into
 * @param flat_path A dotpath to our target property
 * @param value The item we wish to insert into the array, if we are inserting
 * @param mode Whether we are inserting or deleting into the array
 */
export declare function array_path_edit_changes(target: any, flat_path: string, value: any, mode: "insert" | "delete"): {
    path: string;
    new_val: any;
};
export declare function arrayify_object(in_obj: any): unknown[];
/** Makes many icons in the same format with ease an icon */
export declare class IconFactory {
    private classes;
    private icon_prefix;
    constructor(args: {
        light?: boolean;
        dark?: boolean;
        size?: "xs" | "s" | "sm" | "m" | "l" | "xl";
        icon_set?: string;
    });
    r(icon: string): string;
}
export declare function effectBox(title: string, text: string, options?: {
    add_classes?: string;
    flow?: boolean;
}): string;
export declare function spDisplay(sp: number | string): string;
export declare function activationIcon(activation: ActivationType): string;
export declare function activationStyle(activation: ActivationType): string;
export declare function manufacturerStyle(mfr: string, border?: boolean): string;
export declare function safe_json_parse(str: string): any | null;
export declare function formatDotpath(path: string): string;
export declare function stepwiseResolveDotpath(obj: any, dotpath: string): Array<{
    pathlet: string | null;
    val: unknown;
}>;
/**
 * A variant of resolveDotpath that provides more context about documents we encounter along the way.
 *
 * @param rootDoc The document we are starting at
 * @param path The path to resolve
 * @returns An object providing context on the path and result relative to the most deploy nested document we encounter
 */
export declare function drilldownDocument(rootDoc: LancerActor | LancerItem, path: string): {
    sub_doc: LancerActor | LancerItem;
    sub_path: string;
    terminus: any;
};
export declare function resolveDotpath<T>(ob: any, path: string): T | null;
export declare function resolveDotpath<T>(ob: any, path: string, default_: T): T;
export declare function helper_root_doc(options: HelperOptions): LancerActor | LancerItem;
export declare function resolveHelperDotpath<T>(options: HelperOptions, path: string): T | null;
export declare function resolveHelperDotpath<T>(options: HelperOptions, path: string, default_: T): T;
export declare function resolveHelperDotpath<T>(options: HelperOptions, path: string, default_: T, try_parent: boolean): T;
/**
 * Use this when invoking a helper from another helper, and you want to augment the hash args in some way
 * @argument defaults These properties will be inserted iff the hash doesn't already have that value.
 * @argument overrides These properties will be inserted regardless of pre-existing value
 */
export declare function extendHelper(orig_options: HelperOptions, overrides: Record<string, any>, defaults?: Record<string, any>): HelperOptions;
/**
 * Use this when invoking a helper from outside a helper.
 * A shitty hack that will break if handlebars partials are invoked
 * @argument fake_data Will be used as the "data" for the hash
 */
export declare function spoofHelper(fake_data: any): HelperOptions;
/** Enables controls that can (as specified by action):
 * - "delete": delete() the item located at data-path
 * - "null": set as null the value at the specified path
 * - "splice": remove the array item at the specified path
 * - "set": set as `data-action-value` the item at the specified path.
 *    - if prefixed with (string), will use rest of val as plain string
 *    - if prefixed with (int), will parse as int
 *    - if prefixed with (float), will parse as float
 *    - if prefixed with (bool), will parse as boolean
 *    - if prefixed with (struct), will refer to the LANCER.control_structs above, generating whatever value matches the key
 * - "append": append the item to array at the specified path, using same semantics as data-action-value
 * - "insert": insert the item to array at the specified path, using same semantics as data-action-value. Resolves path in same way as "splice". Inserts before.
 * all using a similar api: a `path` to the item, and an `action` to perform on that item. In some cases, a `val` will be used
 *
 * If data-click is provided, it will be interpreted as follows
 * - "left" default behavior, normal left click
 *
 *
 * The data getter and commit func are used to retrieve the target data, and to save it back (respectively)
 *
 * The post_hook function is just run after all logic has been finished. It is provided the context object.
 * It has no influence on the behavior of the operation, but can nonetheless be useful for augmenting other behaviors.
 * (e.x. to delete associated entities when remove buttons cleared)
 */
export declare function handleGenControls(html: JQuery, doc: LancerActor | LancerItem, post_hook?: (ctrl_info: GenControlContext) => any): void;
export declare function std_text_input(path: string, options: HelperOptions): string;
export declare function std_password_input(path: string, options: HelperOptions): string;
export declare function std_num_input(path: string, options: HelperOptions): string;
export declare function std_x_of_y(x_path: string, x: number, y: number, add_classes?: string): string;
/**
 * Our standardized checkbox
 * By default, just invoked with a path expression which is resolved into a value, which is used as the initial selection true/false
 * However, can supply the following
 * - `value`: Override the initial value with one resolved from elsewhere. Useful if get/set don't go to same place
 * - `label`: Label to use, if any
 * - `classes`: Additional classes to put on the checkbox itself.
 * - `label_classes`: Additional classes to put on the label, if it exists
 * - `default`: Change the default value if resolution fails. Otherwise, we just use the first one in the enum.
 */
export declare function std_checkbox(path: string, options: HelperOptions): string;
/**
 * Our standardized select, which allows picking of a choice from an enum of options
 * By default, just invoked with a path expression which is resolved into a value, which is used as the initial selection
 * However, can supply the following
 * - `value`: Override the initial value with one resolved from elsewhere. Useful if get/set don't go to same place
 * - `select_classes`: Additional classes to put on the select.
 * - `label_classes`: Additional classes to put on the select.
 * - `default`: Change the default value if resolution fails. Otherwise, we just use the first one in the enum.
 */
export declare function std_enum_select<T extends string>(path: string, enum_: {
    [key: string]: T;
}, options: HelperOptions): string;
export declare function popout_editor_button(path: string): string;
export declare function handlePopoutTextEditor(html: JQuery, root_doc: LancerActor | LancerItem): void;
export declare function safe_html_helper(orig: string): string;
export declare function large_textbox_card(title: string, text_path: string, options: HelperOptions): string;
export declare function saveCancelButtons(): string;
export declare function read_form(form_element: HTMLFormElement): Record<string, string | number | boolean>;
/** Clip paths kill native foundry context menus. Mix our own!
 * This just generates the hooked context menu html, with click listeners. Up to you to put it wherever you want
 * @argument parent: The element to which this menu will be attached. Identical to foundry behavior
 * @argument options: The options to show
 * @argument onSelectAny: Called when any options is selected, after calling callback. Useful for closing menus etc
 */
export declare function createContextMenu(parent: JQuery<HTMLElement>, options: ContextMenuEntry[], onSelectAny?: () => void): Element;
/** Attach a tippy context menu to the given target(s)
 *  Options can be fixed or can be generated based on the specific target to which the context menu is being
 *  @param targets JQuery elements to attach the context menu to.
 * @param event_types JQuery event types to trigger showing the context menu.
 * @param options Array of context menu items.
 */
export declare function tippyContextMenu(targets: JQuery<HTMLElement>, event_types: string, options: ContextMenuEntry[]): void;
export declare function restrict_choices<T extends string>(choices: T[], default_choice: T, provided?: string): T;
export declare function list_enum<T extends string>(enum_: {
    [key: string]: T;
}): T[];
export declare function restrict_enum<T extends string>(enum_: {
    [key: string]: T;
}, default_choice: T, provided?: string): T;
export declare function hex_array(curr: number, max: number, path: string, classes?: string): string[];

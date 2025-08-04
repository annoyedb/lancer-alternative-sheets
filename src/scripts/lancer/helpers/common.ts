// Reimplementation of bare-minimum foundryvtt-lancer functionality

import type { HelperOptions } from "handlebars";

// Helper function to format a dotpath to not have any square brackets, instead using pure dot notation
export function formatDotpath(path: string): string
{
    return path.replace(/\[/g, ".").replace(/]/g, "");
}

// Helper function to get arbitrarily deep array references
// Returns every item along the path, starting with the object itself
// Any failed resolutions will still be emitted, but as an undefined
// An empty string resolved in this way will simply return root.
export function stepwiseResolveDotpath(
    obj: any,
    dotpath: string
): Array<{
    pathlet: string | null;
    val: unknown;
}>
{
    let pathlets = formatDotpath(dotpath).split(".");

    // Resolve each key
    let result = [
        {
            pathlet: null as string | null,
            val: obj,
        },
    ];
    for (let pathlet of pathlets)
    {
        obj = obj?.[pathlet];
        result.push({
            pathlet,
            val: obj,
        });
    }
    return result;
}

// Helper function to get arbitrarily deep array references
// Returns every item along the path, starting with the object itself
// Any failed resolutions will still be emitted, but as a dedicated symbol
export function resolveDotpath<T>(ob: any, path: string): T | null;
export function resolveDotpath<T>(ob: any, path: string, default_: T): T;
export function resolveDotpath(
    obj: any,
    dotpath: string,
    default_: any = null,
    opts?: {
        shorten_by?: number; // If provided, skip the last N path items
    }
): unknown
{
    let path = stepwiseResolveDotpath(obj, dotpath);
    let item;

    // Get the last item, or one even further back if shorten-by provided
    if (opts?.shorten_by)
    {
        item = path[path.length - 1 - opts.shorten_by];
    } else
    {
        item = path[path.length - 1];
    }
    return item.val === undefined ? default_ : item.val;
}

const RESOLVE_FAIL = Symbol("Fail");
// Helper function to get arbitrarily deep array references, specifically in a helperoptions, and with better types for that matter
export function resolveHelperDotpath<T>(options: HelperOptions, path: string): T | null;
export function resolveHelperDotpath<T>(options: HelperOptions, path: string, default_: T): T;
export function resolveHelperDotpath<T>(options: HelperOptions, path: string, default_: T, try_parent: boolean): T;
export function resolveHelperDotpath(
    options: HelperOptions,
    path: string,
    default_: any = null,
    try_parent: boolean = false
): any
{
    if (try_parent)
    {
        let data = options.data;

        // Loop until no _parent
        while (data)
        {
            let resolved = resolveDotpath(data?.root, path, RESOLVE_FAIL);
            if (resolved != RESOLVE_FAIL)
            {
                // Looks like we found something!
                return resolved;
            }
            data = data._parent;
        }

        // We've found nothing. Sad
        return default_;
    } else
    {
        // Trivial wrapper.
        return resolveDotpath(options.data?.root, path, default_);
    }
}

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
export function array_path_edit_changes(
    target: any,
    flat_path: string,
    value: any,
    mode: "insert" | "delete"
): { path: string; new_val: any }
{
    // Break it up
    flat_path = formatDotpath(flat_path);
    let split = flat_path.split(".");
    let tail = split.splice(split.length - 1)[0];
    let lead = split.join(".");

    let index = parseInt(tail);
    let array = resolveDotpath(target, lead);
    if (Array.isArray(array) && !Number.isNaN(index))
    {
        // Bound our index
        if (index > array.length)
        {
            index = array.length;
        }
        if (index < 0)
        {
            // For negative indexes, count back from end, python style.
            // With the caveat that this also shifts behavior to insert AFTER. So, -1 to append to end, -2 to 1 before end, etc.
            index = array.length + index + 1;

            // If still negative, then we've gone backwards past start of list, and so we bound to zero
            if (index < 0)
            {
                index = 0;
            }
        }

        // Different behavior depending on mode
        if (mode == "delete")
        {
            return {
                path: lead,
                new_val: [...array.slice(0, index), ...array.slice(index + 1)], // Drop element at index
            };
        } else if (mode == "insert")
        {
            return {
                path: lead,
                new_val: [...array.slice(0, index), value, ...array.slice(index)], // Insert element at index
            };
        } else
        {
            throw new Error("Invalid path edit mode " + mode);
        }
    } else
    {
        throw new Error(`Unable to insert array item "${lead}[${tail}]": not an array (or not a valid index)`);
    }
}

/**
 * A variant of resolveDotpath that provides more context about documents we encounter along the way.
 *
 * @param rootDoc The document we are starting at
 * @param path The path to resolve
 * @returns An object providing context on the path and result relative to the most deploy nested document we encounter
 */
export function drilldownDocument(
    rootDoc: any,
    path: string
):
    {
        sub_doc: any; // The last document traversed while following path from root_doc. Usually just root_doc
        sub_path: string; // Path to terminus, continuing from sub_doc
        terminus: any; // What was found at the end of the path
    }
{
    let steps = stepwiseResolveDotpath(rootDoc, path);
    for (let i = steps.length - 1; i >= 0; i--)
    {
        // Walk it back till first document
        let step = steps[i];
        if (step.val instanceof foundry.abstract.Document)
        {
            // Recombine rest of path
            let sub_path = steps
                .slice(i + 1)
                .map(v => v.pathlet)
                .join(".");
            let sub_doc = step.val as any;
            return { sub_doc, sub_path, terminus: steps[steps.length - 1].val };
        }
    }
    throw new Error("Drilldown document must have at least one document in its path");
}

// Used by above to figure out how to handle "set"/"append" args
// Returns [success: boolean, val: any]
export async function parse_control_val(raw_val: string): Promise<{ success: boolean; val: any }>
{
    // Determine what we're working with
    let match = raw_val.match(/\((.*?)\)(.*)/);
    if (match)
    {
        let type = match[1];
        let val = match[2];
        switch (type)
        {
            case "string":
                // Just pass val as-is
                return { success: true, val };
            case "int":
                let parsed_int = parseInt(val);
                if (!Number.isNaN(parsed_int))
                {
                    return { success: true, val: parsed_int };
                }
                break;
            case "float":
                let parsed_float = parseFloat(val);
                if (!Number.isNaN(parsed_float))
                {
                    return { success: true, val: parsed_float };
                }
                break;
            case "bool":
                if (val == "true")
                {
                    return { success: true, val: true };
                } else if (val == "false")
                {
                    return { success: true, val: false };
                }
            case "struct":
                // (#7)
                return { success: false, val: "I HAVE NO MOUTH, AND I MUST SCREAM" };
        }
    }

    // No success
    return { success: false, val: null };
}


// (#7) - Lancer Alternative Sheets: 
// There's a lot of jank with the way we handle Lancer 
// system function imports, but this one is the most concerning 
// because it can break the system if the type is `struct`, as 
// that case has been modified to be completely ignored. 
// 
// When types importing is properly implemented in v13 remove this.
export function handleGenControls(
    html: JQuery,
    // Retrieves the data that we will operate on
    doc: any,
    post_hook?: (ctrl_info: any) => any
)
{
    html
        .find(".gen-control")
        .off("click")
        .on("click", async event =>
        {
            event.stopPropagation();

            // Collect the raw information / perform initial conversions
            let elt = event.currentTarget;
            let raw_val = elt.dataset.actionValue;

            let val: any = undefined;
            if (raw_val)
            {
                let result = await parse_control_val(raw_val);
                if (!result.success)
                {
                    console.error(`Gen control failed: Bad data-action-value: ${raw_val}`);
                    return; // Bad arg - no effect
                } else
                {
                    val = result.val;
                }
            }

            // Construct our ctx
            let path = elt.dataset.path!;
            let docOverride: any | null = null;
            let dd: ReturnType<typeof drilldownDocument>;
            if (elt.dataset.uuid)
            {
                docOverride = (await fromUuid(elt.dataset.uuid)) as any;
                if (!docOverride)
                {
                    return ui.notifications?.error("Bad uuid: " + elt.dataset.uuid);
                }
                dd = drilldownDocument(docOverride, path);
            } else
            {
                dd = drilldownDocument(doc, path);
            }
            let ctx: any = {
                // Base
                elt,
                path,
                action: <any>elt.dataset.action,
                raw_val: elt.dataset.actionValue,
                base_document: doc,

                // Derived
                path_target: dd.terminus,
                parsed_val: val,
                target_document: dd.sub_doc,
                relative_path: dd.sub_path,
            };

            // Check our less reliably fetchable data
            if (!ctx.path)
            {
                console.error("Gen control failed: missing path");
            } else if (!ctx.action)
            {
                console.error("Gen control failed: missing action");
            } else if (!dd.sub_doc)
            {
                console.error("Gen control failed: target document does not exist");
            }

            // Perform action
            if (ctx.action == "delete")
            {
                // Find and delete the item at that path
                ctx.path_target?.delete();
            } else if (ctx.action == "splice")
            {
                // Splice out the value at path dest, then writeback
                let changes = array_path_edit_changes(ctx.target_document, ctx.relative_path, null, "delete");
                await ctx.target_document.update({ [changes.path]: changes.new_val });
            } else if (ctx.action == "null")
            {
                // Null out the target space
                await ctx.target_document.update({ [ctx.relative_path]: null });
            } else if (ctx.action == "set" && ctx.parsed_val !== undefined)
            {
                // Set the target space
                await ctx.target_document.update({ [ctx.relative_path]: ctx.parsed_val });
            } else if (ctx.action == "append")
            {
                // Append to target array
                let changes = array_path_edit_changes(ctx.target_document, ctx.relative_path + "[-1]", val, "insert");
                await ctx.target_document.update({ [changes.path]: changes.new_val });
            } else if (ctx.action == "insert")
            {
                // insert into target array at the specified location
                let changes = array_path_edit_changes(ctx.target_document, ctx.relative_path, val, "insert");
                await ctx.target_document.update({ [changes.path]: changes.new_val });
            } else
            {
                console.error("Unknown gen control action: " + ctx.action);
            }

            // Post hook if necessary
            if (post_hook)
            {
                post_hook(ctx);
            }
        });
}


// Lancer Alternative Sheets: custom `.gen-control` delete handler, stripped down from above function
export async function handleGenDeleteControl(
    event: MouseEvent,
    doc: any,
    post_hook?: (ctx: any) => void
)
{
    if (!event.currentTarget)
        return;
    // Collect the raw information / perform initial conversions
    let elt = event.currentTarget as HTMLElement;
    let raw_val = elt.dataset.actionValue;

    let val: any = undefined;
    if (raw_val)
    {
        let result = await parse_control_val(raw_val);
        if (!result.success)
        {
            console.error(`Gen control failed: Bad data-action-value: ${raw_val}`);
            return; // Bad arg - no effect
        } else
        {
            val = result.val;
        }
    }

    // Construct our ctx
    let path = elt.dataset.path!;
    let docOverride: any | null = null;
    let dd: ReturnType<typeof drilldownDocument>;
    if (elt.dataset.uuid)
    {
        docOverride = (await fromUuid(elt.dataset.uuid)) as any;
        if (!docOverride)
        {
            return ui.notifications?.error("Bad uuid: " + elt.dataset.uuid);
        }
        dd = drilldownDocument(docOverride, path);
    } else
    {
        dd = drilldownDocument(doc, path);
    }
    let ctx: any = {
        // Base
        elt,
        path,
        action: <any>elt.dataset.action,
        raw_val: elt.dataset.actionValue,
        base_document: doc,

        // Derived
        path_target: dd.terminus,
        parsed_val: val,
        target_document: dd.sub_doc,
        relative_path: dd.sub_path,
    };

    // Splice out the value at path dest, then writeback
    let changes = array_path_edit_changes(ctx.target_document, ctx.relative_path, null, "delete");
    await ctx.target_document.update({ [changes.path]: changes.new_val });

    if (post_hook)
    {
        post_hook(ctx);
    }
}

// Isolates a value to ensure it is compliant with a list of values
export function restrict_choices<T extends string>(choices: T[], default_choice: T, provided?: string): T
{
    if (!provided) return default_choice;
    let lcp = provided.toLowerCase();
    // Try matching on lower case
    for (let caseFix of choices)
    {
        if (caseFix.toLowerCase() == lcp)
        {
            return caseFix;
        }
    }

    return default_choice;
}

// List possible values of an enum
export function list_enum<T extends string>(enum_: { [key: string]: T }): T[]
{
    return Object.keys(enum_).map(k => enum_[k]);
}

// Isolates a value to ensure it is enum compliant
export function restrict_enum<T extends string>(enum_: { [key: string]: T }, default_choice: T, provided?: string): T
{
    let choices = list_enum(enum_);
    return restrict_choices(choices, default_choice, provided);
}

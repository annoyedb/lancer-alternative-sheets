// Reimplementation of bare-minimum foundryvtt-lancer functionality

import type { HelperOptions } from "handlebars";
import { slugify } from "../util/lid";

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
 * Use this when invoking a helper from outside a helper.
 * A shitty hack that will break if handlebars partials are invoked
 * @argument fake_data Will be used as the "data" for the hash
 */
export function spoofHelper(fake_data: any): HelperOptions
{
    let fail_callback = () =>
    {
        throw new Error("spoofHelper is not sufficient here.");
    };
    return {
        fn: fail_callback,
        inverse: fail_callback,
        hash: {},
        data: fake_data,
    };
}

export function manufacturerStyle(mfr: string, border?: boolean): string
{
    let manufacturer = slugify(mfr, "-");
    if (!["gms", "ips-n", "ssc", "horus", "ha"].includes(manufacturer))
    {
        manufacturer = "primary";
    }
    return `lancer${border ? "-border" : ""}-${manufacturer}`;
}
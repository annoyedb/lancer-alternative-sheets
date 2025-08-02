// Bridge module and foundryvtt-lancer system and any exported function I don't want to categorize
import type { HelperOptions } from "handlebars";
import { Logger } from "@/classes/Logger";
import { resolveHelperDotpath } from '@/scripts/lancer/helpers/common';
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getSheetStore } from "@/scripts/store/module-store";

export function getLocalized(key: string): string
{
    return HandlebarsHelpers.localize(key, {} as HelperOptions);
}

export function randomExtension(): string
{
    const extensions = [".exe", ".bat", ".cmd", ".sh", ".bash", ".zsh", ".ksh", ".csh"];
    const randomIndex = Math.floor(Math.random() * extensions.length);
    return extensions[randomIndex];
}

export function logData(path: string, options: HelperOptions)
{
    const data = resolveHelperDotpath(options, path);
    Logger.log(`Data received`, data);
}

export function logConsole(data: any, _options: HelperOptions)
{
    console.log(data);
}

export function isLoading(item: any): boolean
{
    return item.system.all_tags?.some((t: { is_loading: boolean; }) => t.is_loading)
        || item.system.tags?.some((t: { is_loading: boolean; }) => t.is_loading);
}

export function isRecharge(item: any): boolean
{
    return item.system.all_tags?.some((t: { is_recharge: boolean; }) => t.is_recharge)
        || item.system.tags?.some((t: { is_recharge: boolean; }) => t.is_recharge);
}

export function formatString(template: string, ...values: string[]): string
{
    return template.replace(/{(\d+)}/g, (match, number) =>
    {
        return typeof values[number] !== 'undefined' ? values[number] : match;
    });
}

export function getFoundryVersion(split: boolean = false)
{
    if (split)
        // @ts-expect-error
        return game.release.version.split('.');
    // @ts-expect-error
    return game.release.version;
}

export function getLancerVersion(split: boolean = false)
{
    if (split)
        // @ts-expect-error
        return game.system.version.split('.');
    // @ts-expect-error
    return game.system.version;
}

export function getModuleVersion(split: boolean = false)
{
    if (split)
        // @ts-expect-error
        return game.modules.get(LancerAlternative.Name).version.split('.');
    // @ts-expect-error
    return game.modules.get(LancerAlternative.Name).version;
}

// Loop data around into a temporary cache so that we don't need to call getData() on ever render. 
// Functionally, probably worse than just calling getData(), but because it calls a console log, it 
// gets a bit spammy and some people may get scared of it.
// This runs even on rerenders, so there is no chance of its own key not existing by the time the Svelte components are mounted.
export const dataMap: { [key: string]: any } = {};
export function forwardData(data: any, _options: HelperOptions)
{
    dataMap[data.actor.uuid] = data;
}

export function handleRelativeDataInput(event: Event & { currentTarget: EventTarget & HTMLInputElement; }, previous: number)
{
    event.preventDefault();
    const inputValue = (event.target as HTMLInputElement)?.value;
    let newValue = previous;

    if (inputValue)
    {
        if (inputValue.startsWith('+'))
        {
            newValue = previous + Number(inputValue.slice(1));
        } 
        else if (inputValue.startsWith('-'))
        {
            newValue = previous - Number(inputValue.slice(1));
        } 
        else
        {
            newValue = Number(inputValue);
        }
    }

    event.currentTarget.value = newValue.toString();
    event.currentTarget.blur();
}

export function getMimeType(path: string)
{
    const validTypes = ['webm', 'mp4', 'm4v']; // https://foundryvtt.com/article/media/
    const extension = path.split('.').pop()?.toLowerCase();
    if (extension && validTypes.includes(extension))
        return `video/${extension === 'm4v' ? 'mp4' : extension}`;
    return null;
}

export function browseTokenImage(_event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, actor: any)
{
    const fp = new FilePicker({
        current: actor.prototypeToken.texture.src,
        type: "imagevideo",
        callback: (path) => {
            // (#12) One day, in V13 or whenever I decide to update FoundryVTT types and it doesn't break this whole project,
            // https://foundryvtt.com/api/classes/foundry.applications.apps.FilePicker.html#default_options
            // Use the `form` attribute to hopefully handle the weird override requirement of (#10).
            // But today, we're just going to throw it in a data store and call it a day.
            getSheetStore(actor.uuid).selectedTokenImage = path;
            actor.update({
                "prototypeToken.texture.src": path
            });
        },
    });

    fp.render(true);
}

export function browseActorImage(_event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, actor: any)
{
    const fp = new FilePicker({
        current: actor.img,
        type: "image",
        callback: (path) => {
            actor.update({
                "img": path
            })
        },
    });

    fp.render(true);
}
// Bridge module and foundryvtt-lancer system
import type { HelperOptions } from "handlebars";
import { Logger } from "@/classes/Logger";
import { resolveHelperDotpath } from '@/scripts/lancer/helpers/common';
import { LancerAlternative } from "@/enums/LancerAlternative";

const localizeMap: { [key: string]: string } = {};
export function getLocalized(key: string): string
{
    if (!(key in localizeMap))
        localizeMap[key] = HandlebarsHelpers.localize(key, {} as HelperOptions);
    return localizeMap[key];
    // return HandlebarsHelpers.localize(key, {} as HelperOptions);
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
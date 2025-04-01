// Bridge module and foundryvtt-lancer system
import type { HelperOptions } from "handlebars";
import { Logger } from "@/classes/Logger";
import { resolveHelperDotpath } from './lancer/helpers/common';
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
    return item.system.all_tags?.some((t: {is_loading: boolean;}) => t.is_loading) 
        || item.system.tags?.some((t: {is_loading: boolean;}) => t.is_loading);
}

export function isRecharge(item: any): boolean
{
    return item.system.all_tags?.some((t: {is_recharge: boolean;}) => t.is_recharge) 
        || item.system.tags?.some((t: {is_recharge: boolean;}) => t.is_recharge);
}

export function formatString(template: string, ...values: string[]): string
{
    return template.replace(/{(\d+)}/g, (match, number) =>
    {
        return typeof values[number] !== 'undefined' ? values[number] : match;
    });
}

export function getFoundryVersion()
{
    // @ts-expect-error
    return game.release.version;
}

export function getLancerVersion()
{
    // @ts-expect-error
    return game.system.version;
}

export function getModuleVersion()
{
    // @ts-expect-error
    return game.modules.get(LancerAlternative.Name).version;
}
// Bridge module and foundryvtt-lancer system
import { HelperOptions } from "handlebars";
import { resolveHelperDotpath } from './lancer/helpers/common';

export function frameName(framePath: string, options: HelperOptions): string
{
    let frame: any = resolveHelperDotpath(options, framePath);
    if (!frame) return "";

    return `${frame.name}`
}

export function frameManufacturer(framePath: string, options: HelperOptions): string
{
    let frame: any = resolveHelperDotpath(options, framePath);
    if (!frame) return "";

    return `${frame.system.manufacturer}`
}

export function frameUUID(framePath: string, options: HelperOptions): string
{
    let frame: any = resolveHelperDotpath(options, framePath);
    if (!frame) return "";
    
    return `${frame.uuid}`;
}

const localizeMap: { [key: string]: string } = {};
export function getLocalized(key: string): string
{
    if (!(key in localizeMap))
        localizeMap[key] = HandlebarsHelpers.localize(key, {} as HelperOptions);
    return localizeMap[key];
}

export function overchargeStage(actor: any, overchargePath: string, options: HelperOptions): number
{
    const sequence = actor.system.overcharge_sequence.split(",");

    let index: number = resolveHelperDotpath(options, overchargePath) as number;
    index = Math.max(0, Math.min(sequence.length - 1, index));
    return sequence[index];
}

export function getTagArray(tagsPath: string, options: HelperOptions)
{
    return options.hash["tags"] ?? resolveHelperDotpath(options, tagsPath) ?? [];
}

export function randomExtension(): string
{
    const extensions = [".exe", ".bat", ".cmd", ".sh", ".bash", ".zsh", ".ksh", ".csh"];
    const randomIndex = Math.floor(Math.random() * extensions.length);
    return extensions[randomIndex];
}
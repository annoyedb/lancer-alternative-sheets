import { Logger } from "@/classes/Logger";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { CustomFlagKey } from "@/enums/CustomFlagKey";
import type { CustomFlagContent } from "@/interfaces/actor/CustomFlagData";
import { getCustomFlagPath } from "@/scripts/flags";

const CUSTOM_FLAG_PATTERN = new RegExp(`@${LancerAlternative.EnricherTag}\\[([^\\]]+)\\]{([^}]+)}`, "g");

async function enrichCustomFlag(match: RegExpMatchArray): Promise<HTMLElement | null>
{
    const [, uuid, path] = match;

    const actor = await fromUuid(uuid);
    if (!actor)
    {
        Logger.warn(`${LancerAlternative.EnricherTag} enricher could not resolve actor UUID`, uuid);
        return null;
    }

    const value = foundry.utils.getProperty(actor, path);

    const anchor = document.createElement("a");
    anchor.classList.add("content-link", "la-custom-flag-link");
    anchor.dataset.tooltip = path;
    anchor.append(document.createTextNode(`${value}`));
    return anchor;
}

export function registerCustomFlagEnricher()
{
    CONFIG.TextEditor.enrichers.push({
        pattern: CUSTOM_FLAG_PATTERN,
        enricher: enrichCustomFlag,
    });
}

/**
 * A copyable `@AltSheetCustom[...]{...}` tag that live-resolves to a custom flag's content field
 * wherever Foundry enriches text (journals, chat, item descriptions, etc.)
 */
export function getEnricher(actorUuid: string, flagKey: CustomFlagKey, id: string, field: keyof CustomFlagContent = "value"): string
{
    return `@${LancerAlternative.EnricherTag}[${actorUuid}]{${getCustomFlagPath(flagKey, id, field)}}`;
}
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { CustomFlagKey } from "@/enums/CustomFlagKey";
import { CustomFlags } from "@/classes/CustomFlags";
import type { CustomFlag, CustomFlagContent, CustomFlagData } from "@/interfaces/actor/CustomFlagData";

export function getCustomFlags(actor: any, flagKey: CustomFlagKey): CustomFlagData
{
    return actor.getFlag(LancerAlternative.Name, flagKey) ?? new CustomFlags();
}

export function setCustomFlags(actor: any, flagKey: CustomFlagKey, data: CustomFlagData): Promise<any>
{
    return actor.setFlag(LancerAlternative.Name, flagKey, data);
}

export function addCustomFlag(actor: any, flagKey: CustomFlagKey): Promise<any>
{
    const data = getCustomFlags(actor, flagKey);
    const id = foundry.utils.randomID(4);
    data[id] = CustomFlags.emptyContent(id);
    return setCustomFlags(actor, flagKey, data);
}

export function updateCustomFlag(actor: any, flagKey: CustomFlagKey, id: string, changes: Partial<CustomFlag>): Promise<any>
{
    const data = getCustomFlags(actor, flagKey);
    if (!data[id])
        return Promise.resolve();
    data[id] = {
        ...data[id],
        ...changes,
        content: changes.content ? { ...data[id].content, ...changes.content } : data[id].content,
    };
    return setCustomFlags(actor, flagKey, data);
}

export function deleteCustomFlag(actor: any, flagKey: CustomFlagKey, id: string): Promise<any>
{
    return actor.update({
        [`flags.${LancerAlternative.Name}.${flagKey}.-=${id}`]: null,
    });
}

export function reorderCustomFlags(actor: any, flagKey: CustomFlagKey, fromIndex: number, toIndex: number): Promise<any>
{
    const entries = Object.entries(getCustomFlags(actor, flagKey));
    const [moved] = entries.splice(fromIndex, 1);
    entries.splice(toIndex, 0, moved);

    const reordered: CustomFlagData = {};
    for (const [id, flag] of entries)
        reordered[id] = flag;

    return actor.update(
        { [`flags.${LancerAlternative.Name}.${flagKey}`]: reordered },
        { recursive: false }
    );
}

/**
 * The document-relative dotpath to a custom flag's content field, for use in macros/rolls/enrichers
 * outside this module (paired with the owning actor's UUID, e.g. `getProperty(actor, path)`)
 */
export function getCustomFlagPath(flagKey: CustomFlagKey, id: string, field: keyof CustomFlagContent = "value"): string
{
    return `flags.${LancerAlternative.Name}.${flagKey}.${id}.content.${field}`;
}

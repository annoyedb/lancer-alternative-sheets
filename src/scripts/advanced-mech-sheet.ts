import type { Document } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/module.mjs";
import { MOUNT_FITTINGS, MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
import { array_path_edit_changes, drilldownDocument, parse_control_val } from "@/scripts/lancer/helpers/common";
import type { EmbeddedRef } from "@/types/foundryvtt-lancer/module/source-template";

// Reimplementation of Lancer's mount change handler
export function handleMountChange(
    currentMount: any,
    mountPath: string,
    selectionIndex: number,
    bracing: boolean,
    document: Document<any, any>,
    callback?: (morph: string) => void
)
{
    const mountTypes = Object.keys(MOUNT_FITTINGS);

    // Construct new slots for selected mount
    let newSlots: {
        loadout: {
            weapon_mounts: Array<{
                slots: Array<{
                    weapon: EmbeddedRef | null;
                    mod: EmbeddedRef | null;
                    size: string;
                }>;
                type: string;
                bracing: boolean;
            }>
        }
    } = {
        loadout: {
            weapon_mounts: [{
                slots: [{
                    weapon: null,
                    mod: null,
                    size: MOUNT_FITTINGS["Unknown"][0]
                }],
                type: "Unknown",
                bracing: false
            }]
        }
    };

    let newSlotFittings = MOUNT_FITTINGS[mountTypes[selectionIndex]];
    for (let i = 0; i < newSlotFittings.length; i++)
    {
        if (currentMount.slots[i]?.weapon?.value)
        {
            newSlots.loadout.weapon_mounts[0].slots[i] = {
                weapon: currentMount.slots[i].weapon?.value?.id ?? null,
                mod: currentMount.slots[i].mod?.value?.id ?? null,
                size: newSlotFittings[i],
            };
        }
        else
        {
            newSlots.loadout.weapon_mounts[0].slots[i] = {
                weapon: null,
                mod: null,
                size: newSlotFittings[i],
            };
        }
    }
    document.update({
        [`${mountPath}.type`]: mountTypes[selectionIndex],
        [`${mountPath}.bracing`]: bracing,
        [`${mountPath}.slots`]: newSlotFittings,
    });

    callback?.(MOUNT_LOCALIZE_MAP[mountTypes[selectionIndex]]);
}

// Reimplementation of Lancer's `.gen-control` handler for deleting objects
export async function handleMountDelete(
    button: HTMLButtonElement,
    doc: any,
    callback?: (button: JQuery<HTMLButtonElement>) => void
)
{
    let raw_val = button.dataset.actionValue;

    let val: any = undefined;
    if (raw_val)
    {
        let result = await parse_control_val(raw_val);
        if (!result.success)
        {
            console.error(`Gen control failed: Bad data-action-value: ${raw_val}`);
            return; // Bad arg - no effect
        }
        else
        {
            val = result.val;
        }
    }

    // Construct our ctx
    let path = button.dataset.path!;
    let docOverride: any | null = null;
    let dd: ReturnType<typeof drilldownDocument>;
    if (button.dataset.uuid)
    {
        docOverride = (await fromUuid(button.dataset.uuid)) as any;
        if (!docOverride)
        {
            return ui.notifications?.error("Bad uuid: " + button.dataset.uuid);
        }
        dd = drilldownDocument(docOverride, path);
    }
    else
    {
        dd = drilldownDocument(doc, path);
    }

    // Splice out the value at path dest, then writeback
    let changes = array_path_edit_changes(dd.sub_doc, dd.sub_path, null, "delete");
    await dd.sub_doc.update({ [changes.path]: changes.new_val });

    callback?.($(button));
}
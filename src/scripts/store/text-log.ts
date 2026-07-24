// This is for logging strings to the text logs, not actual logging
import { SheetStore } from "@/scripts/store/module-store";
import { TextConsoleHook } from "@/enums/TextConsoleHook";

export function setIntroRun(uuid: string, enabled: boolean)
{
    SheetStore.set(uuid, { introPlayed: enabled });
}

export function getIntroRun(uuid: string): boolean
{
    return SheetStore.get(uuid)?.introPlayed;
}

export function sendToTextConsole(event: PointerEvent, logText: string, type: TextConsoleHook)
{
    // TODO: from the event get the sheet's UUID and check the caller against the owner uuid
    event.stopPropagation();
    (Hooks.call as any)(type, logText); // dynamic TextLogHook id, outside the typed hook registry
}

export function resetTextConsole(event: PointerEvent, type: TextConsoleHook)
{
    // TODO: from the event get the sheet's UUID and check the caller against the owner uuid
    event.stopPropagation();
    (Hooks.call as any)(type); // dynamic TextLogHook id, outside the typed hook registry
}
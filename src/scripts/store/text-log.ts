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

// uuid identifies the actor whose sheet the event originated in (see getActorContext), since
// hookID/hookResetID are shared by every open sheet of this type. Hooks.call broadcasts to
// every listener regardless of source, so listeners filter on uuid to ignore other sheets' events.
export function sendToTextConsole(event: PointerEvent, logText: string, type: TextConsoleHook, uuid: string)
{
    event.stopPropagation();
    (Hooks.call as any)(type, logText, uuid); // dynamic TextLogHook id, outside the typed hook registry
}

export function resetTextConsole(event: PointerEvent, type: TextConsoleHook, uuid: string)
{
    event.stopPropagation();
    (Hooks.call as any)(type, uuid); // dynamic TextLogHook id, outside the typed hook registry
}
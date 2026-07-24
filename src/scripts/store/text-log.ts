// This is for logging strings to the text logs, not actual logging
import { SheetStore } from "@/scripts/store/module-store";
import { TextConsoleHook } from "@/enums/TextConsoleHook";
import { TextLogHook } from "@/enums/TextLogHook";
import type { TextLogEntry } from "@/interfaces/actor/TextLogEntry";

export function setIntroRun(uuid: string, enabled: boolean)
{
    SheetStore.set(uuid, { introPlayed: enabled });
}

export function getIntroRun(uuid: string): boolean
{
    return SheetStore.get(uuid)?.introPlayed;
}

export function getTextLogEntries(uuid: string): TextLogEntry[]
{
    return SheetStore.get(uuid)?.textLogEntries ?? [];
}

/**
 * Send text to display on an actor's (if applicable) TextLog component. This targets the bottom console lines
 *
 * `uuid` identifies the actor whose sheet the event originated in (see getActorContext). Broadcasts
 * on every sheet type's hook. Each `TextConsoleWriter` only listens on the one it was constructed
 * with, and filters on `uuid`, so only the right one ever reacts to a single pointer event.
 * @param event
 * @param text
 * @param uuid
 */
export function sendToTextConsole(event: PointerEvent, text: string, uuid: string)
{
    event.stopPropagation();
    (Hooks.call as any)(TextConsoleHook.MechHeader, text, uuid); // dynamic TextConsoleHook id, outside the typed hook registry
    (Hooks.call as any)(TextConsoleHook.PilotHeader, text, uuid); // dynamic TextConsoleHook id, outside the typed hook registry
}

/**
 * Resets the TextLog console component
 * @param event
 * @param uuid
 */
export function resetTextConsole(event: PointerEvent, uuid: string)
{
    event.stopPropagation();
    (Hooks.call as any)(TextConsoleHook.MechHeaderReset, uuid); // dynamic TextConsoleHook id, outside the typed hook registry
    (Hooks.call as any)(TextConsoleHook.PilotHeaderReset, uuid); // dynamic TextConsoleHook id, outside the typed hook registry
}

/**
 * Send text to display on an actor's (if applicable) TextLog component. This targets the top (persistent) console lines
 *
 * `uuid` identifies the actor whose sheet the event originated in (see getActorContext). Broadcasts
 * on every sheet type's hook. Each `TextLogWriter` only listens on the one it was constructed
 * with, and filters on `uuid`, so only the right one ever reacts to a single pointer event.
 *
 * Also recorded in the SheetStore so it survives sheet re-renders/remounts for the rest of the
 * session.
 * @param text
 * @param uuid
 * @param glitchy adds the Horus glitch text styling to this line (subject to photosensitive mode)
 */
export function sendToTextLog(text: string, uuid: string, glitchy?: boolean)
{
    SheetStore.set(uuid, { textLogEntries: [...SheetStore.get(uuid).textLogEntries, { text, glitchy }] });
    (Hooks.call as any)(TextLogHook.MechLog, text, uuid, glitchy); // dynamic TextLogHook id, outside the typed hook registry
    (Hooks.call as any)(TextLogHook.PilotLog, text, uuid, glitchy); // dynamic TextLogHook id, outside the typed hook registry
}

/**
 * Clears the persisted text log entries, so they stop reappearing on future remounts.
 * @param uuid
 * @param all also wipes the live TextLogWriter down to nothing, rather than back to just the intro banner
 */
export function resetTextLog(uuid: string, all: boolean = false)
{
    SheetStore.set(uuid, { textLogEntries: [] });
    (Hooks.call as any)(TextLogHook.MechLogReset, uuid, all); // dynamic TextLogHook id, outside the typed hook registry
    (Hooks.call as any)(TextLogHook.PilotLogReset, uuid, all); // dynamic TextLogHook id, outside the typed hook registry
}
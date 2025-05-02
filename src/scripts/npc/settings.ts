import { msgPackDecoder, msgPackEncoder } from "@/scripts/settings";
import { NPCSheetSettings } from "@/classes/settings/NPCSheetSettings";
import { SocketManager } from "@/classes/SocketManager";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getModuleVersion } from "@/scripts/helpers";
import { Logger } from "@/classes/Logger";

export function registerNPCSheetSettings()
{
    // Public Settings
    game.settings.register(LancerAlternative.Name, `npc-settings-tip`, {
        name: "LA.SETTINGS.npc.enableTooltip.label",
        hint: "LA.SETTINGS.npc.enableTooltip.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `npc-settings-sheet-width`, {
        name: "LA.SETTINGS.npc.sheetWidth.label",
        hint: "LA.SETTINGS.npc.sheetWidth.subLabel",
        scope: "client",
        config: true,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 500,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `npc-settings-sheet-height`, {
        name: "LA.SETTINGS.npc.sheetHeight.label",
        hint: "LA.SETTINGS.npc.sheetHeight.subLabel",
        scope: "client",
        config: true,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 800,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `npc-settings-log-action-save-collapse`, {
        name: "LA.SETTINGS.npc.saveCollapse.label",
        hint: "LA.SETTINGS.npc.saveCollapse.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `npc-settings-log-action-start-collapsed`, {
        name: "LA.SETTINGS.npc.startCollapsed.label",
        hint: "LA.SETTINGS.npc.startCollapsed.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    // Private Settings
    game.settings.register(LancerAlternative.Name, `_npc-settings`, {
        scope: "world",
        config: false,
        type: Array, // MessagePack encoded object
        default: [],
    } as ClientSettings.PartialSetting<Array<number>>);

    game.settings.register(LancerAlternative.Name, `_npc-settings-version`, {
        scope: "world",
        config: false,
        type: String,
        default: "",
    } as ClientSettings.PartialSetting<string>);

    // Sockets
    SocketManager.getInstance().register(setNPCSheetData);
}

// Client Settings
export function getNPCSheetTooltipEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `npc-settings-tip`) as boolean;
}

export function getNPCSheetWidth(): number
{
    const width = game.settings.get(LancerAlternative.Name, `npc-settings-sheet-width`) as number;
    return Math.max(0, width);
}

export function getNPCSheetHeight(): number
{
    const height = game.settings.get(LancerAlternative.Name, `npc-settings-sheet-height`) as number;
    return Math.max(0, height);
}

export function getNPCSheetLogActionDontSaveCollapse(): boolean
{
    return !game.settings.get(LancerAlternative.Name, `npc-settings-log-action-save-collapse`) as boolean;
}

export function getNPCSheetLogActionStartCollapsed(): boolean
{
    return game.settings.get(LancerAlternative.Name, `npc-settings-log-action-start-collapsed`) as boolean;
}

// World Private Settings
export function resetNPCSheetData(uuid?: string)
{
    if (uuid)
    {
        const data = getNPCSheetData();
        if (data[uuid])
            delete data[uuid];
        setNPCSheetData(encodeNPCSheetData(data));
    }
    else
    {
        game.settings.set(LancerAlternative.Name, `_npc-settings`, game.settings.settings.get(`${LancerAlternative.Name}._npc-settings`)?.default);
        game.settings.set(LancerAlternative.Name, `_npc-settings-version`, game.settings.settings.get(`${LancerAlternative.Name}._npc-settings-version`)?.default);
    }
}

export function getNPCSheetData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_npc-settings`) as Array<number>;
    if (!settings.length)
        return new NPCSheetSettings();
    try
    {
        let encoded = new Uint8Array(Object.values(settings));
        if (encoded.length === 1)
        {
            Logger.log("NPCSheetSettings: Decoding failed, trying legacy decode.");
            encoded = new Uint8Array(Object.values(settings[0]));
        }
        return msgPackDecoder.decode(encoded) as NPCSheetSettings;
    }
    catch
    {
        Logger.error("NPCSheetSettings: Decoding failed, returning empty settings.");
        return new NPCSheetSettings();
    }
}

/**
 * Searches for whether or not the passed UUID has a root NPC sheet in the data.
 * For example, if `Scene.4sJEdBnHRGvA0gFb.Token.4OPJsPGkq6k2Xw5u.Actor.6aSsblgi20r7RoND` is the UUID
 * `Actor.6aSsblgi20r7RoND` is the root NPC sheet, in which case it will return the actorMatch.
 * If the UUID is not found, it will return null.
 * @param uuid 
 * @returns 
 */
function getRoot(uuid: string): string | null
{
    const actorMatch = uuid.includes("Actor.") ? uuid.split(".").slice(-2).join(".") : null;
    return actorMatch;
}

export function encodeNPCSheetData(data: NPCSheetSettings): Array<number>
{
    const encoded: Uint8Array = msgPackEncoder.encode(data);
    return Array.from(encoded);
}

export function setNPCSheetData(encoded: Array<number>)
{
    return Promise.all([
        game.settings.set(LancerAlternative.Name, `_npc-settings`, encoded),
        game.settings.set(LancerAlternative.Name, `_npc-settings-version`, getModuleVersion()),
    ])
}

export function getThemeOverride(uuid: string): string
{
    const data = getNPCSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;
    return data[workingUUID]?.themeOverride ?? "";
}

export function setThemeOverride(uuid: string, value: string)
{
    const data = getNPCSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;

    if (!data[workingUUID])
        data[workingUUID] = NPCSheetSettings.emptyContent();

    data[workingUUID].themeOverride = value;

    SocketManager.getInstance().runAsGM(
        setNPCSheetData,
        () => {
            Logger.log(`Theme override set to ${value} for ${uuid}`);
        },
        encodeNPCSheetData(data),
    );

    Hooks.call("laOverrideTheme", uuid, value);
}

export function getSidebarExecutables(uuid: string): Array<string>
{
    const data = getNPCSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;
    return data[workingUUID]?.sidebarExes ?? [];
}

export function setSidebarExecutables(uuid: string, macros: Array<string>)
{
    const data = getNPCSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;

    if (!data[workingUUID])
        data[workingUUID] = NPCSheetSettings.emptyContent();

    data[workingUUID].sidebarExes = macros;
    SocketManager.getInstance().runAsGM(
        setNPCSheetData,
        () => {
            Logger.log(`Sidebar executables set to ${macros.join(", ")} for ${uuid}`);
        },
        encodeNPCSheetData(data),
    );
}
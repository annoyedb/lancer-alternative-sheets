import { msgPackDecoder, msgPackEncoder } from "@/scripts/settings";
import { DeployableSheetSettings } from "@/classes/settings/DeployableSheetSettings";
import { SocketManager } from "@/classes/SocketManager";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getModuleVersion } from "@/scripts/helpers";
import { Logger } from "@/classes/Logger";

export function registerDeployableSheetSettings()
{
    // Public Settings
    game.settings.register(LancerAlternative.Name, `deployable-settings-tip`, {
        name: "LA.SETTINGS.deployable.enableTooltip.label",
        hint: "LA.SETTINGS.deployable.enableTooltip.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `deployable-settings-sheet-width`, {
        name: "LA.SETTINGS.deployable.sheetWidth.label",
        hint: "LA.SETTINGS.deployable.sheetWidth.subLabel",
        scope: "client",
        config: true,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 500,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `deployable-settings-sheet-height`, {
        name: "LA.SETTINGS.deployable.sheetHeight.label",
        hint: "LA.SETTINGS.deployable.sheetHeight.subLabel",
        scope: "client",
        config: true,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 800,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `deployable-settings-log-action-save-collapse`, {
        name: "LA.SETTINGS.deployable.saveCollapse.label",
        hint: "LA.SETTINGS.deployable.saveCollapse.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `deployable-settings-log-action-start-collapsed`, {
        name: "LA.SETTINGS.deployable.startCollapsed.label",
        hint: "LA.SETTINGS.deployable.startCollapsed.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    // Private Settings
    game.settings.register(LancerAlternative.Name, `_deployable-settings`, {
        scope: "world",
        config: false,
        type: Array, // MessagePack encoded object
        default: [],
    } as ClientSettings.PartialSetting<Array<number>>);

    game.settings.register(LancerAlternative.Name, `_deployable-settings-version`, {
        scope: "world",
        config: false,
        type: String,
        default: "",
    } as ClientSettings.PartialSetting<string>);

    // Sockets
    SocketManager.getInstance().register(setDeployableSheetData);
}

// Client Settings
export function getDeployableSheetTooltipEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `deployable-settings-tip`) as boolean;
}

export function getDeployableSheetWidth(): number
{
    const width = game.settings.get(LancerAlternative.Name, `deployable-settings-sheet-width`) as number;
    return Math.max(0, width);
}

export function getDeployableSheetHeight(): number
{
    const height = game.settings.get(LancerAlternative.Name, `deployable-settings-sheet-height`) as number;
    return Math.max(0, height);
}

export function getDeployableSheetLogActionDontSaveCollapse(): boolean
{
    return !game.settings.get(LancerAlternative.Name, `deployable-settings-log-action-save-collapse`) as boolean;
}

export function getDeployableSheetLogActionStartCollapsed(): boolean
{
    return game.settings.get(LancerAlternative.Name, `deployable-settings-log-action-start-collapsed`) as boolean;
}

// World Private Settings
export function resetDeployableSheetData(uuid?: string)
{
    if (uuid)
    {
        const data = getDeployableSheetData();
        if (data[uuid])
            delete data[uuid];
        setDeployableSheetData(encodeDeployableSheetData(data));
    }
    else
    {
        game.settings.set(LancerAlternative.Name, `_deployable-settings`, game.settings.settings.get(`${LancerAlternative.Name}._deployable-settings`)?.default);
        game.settings.set(LancerAlternative.Name, `_deployable-settings-version`, game.settings.settings.get(`${LancerAlternative.Name}._deployable-settings-version`)?.default);
    }
}

export function getDeployableSheetData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_deployable-settings`) as Array<number>;
    if (!settings.length)
        return new DeployableSheetSettings();
    try
    {
        let encoded = new Uint8Array(Object.values(settings));
        if (encoded.length === 1)
        {
            Logger.log("DeployableSheetSettings: Decoding failed, trying legacy decode.");
            encoded = new Uint8Array(Object.values(settings[0]));
        }
        return msgPackDecoder.decode(encoded) as DeployableSheetSettings;
    }
    catch
    {
        Logger.error("DeployableSheetSettings: Decoding failed, returning empty settings.");
        return new DeployableSheetSettings();
    }
}

/**
 * Searches for whether or not the passed UUID has a root Deployable sheet in the data.
 * For example, if `Scene.4sJEdBnHRGvA0gFb.Token.4OPJsPGkq6k2Xw5u.Actor.6aSsblgi20r7RoND` is the UUID
 * `Actor.6aSsblgi20r7RoND` is the root Deployable sheet, in which case it will return the actorMatch.
 * If the UUID is not found, it will return null.
 * @param uuid 
 * @returns 
 */
function getRoot(uuid: string): string | null
{
    const actorMatch = uuid.includes("Actor.") ? uuid.split(".").slice(-2).join(".") : null;
    return actorMatch;
}

export function encodeDeployableSheetData(data: DeployableSheetSettings): Array<number>
{
    const encoded: Uint8Array = msgPackEncoder.encode(data);
    return Array.from(encoded);
}

export function setDeployableSheetData(encoded: Array<number>)
{
    return Promise.all([
        game.settings.set(LancerAlternative.Name, `_deployable-settings`, encoded),
        game.settings.set(LancerAlternative.Name, `_deployable-settings-version`, getModuleVersion()),
    ])
}

export function getThemeOverride(uuid: string): string
{
    const data = getDeployableSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;
    return data[workingUUID]?.themeOverride ?? "";
}

export function setThemeOverride(uuid: string, value: string)
{
    const data = getDeployableSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;

    if (!data[workingUUID])
        data[workingUUID] = DeployableSheetSettings.emptyContent();

    data[workingUUID].themeOverride = value;

    SocketManager.getInstance().runAsGM(
        setDeployableSheetData,
        () => {
            Logger.log(`Theme override set to ${value} for ${uuid}`);
        },
        encodeDeployableSheetData(data),
    );

    Hooks.call("laOverrideTheme", uuid, value);
}

export function getSidebarExecutables(uuid: string): Array<string>
{
    const data = getDeployableSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;
    return data[workingUUID]?.sidebarExes ?? [];
}

export function setSidebarExecutables(uuid: string, macros: Array<string>)
{
    const data = getDeployableSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;

    if (!data[workingUUID])
        data[workingUUID] = DeployableSheetSettings.emptyContent();

    data[workingUUID].sidebarExes = macros;
    SocketManager.getInstance().runAsGM(
        setDeployableSheetData,
        () => {
            Logger.log(`Sidebar executables set to ${macros.join(", ")} for ${uuid}`);
        },
        encodeDeployableSheetData(data),
    );
}
import { Logger } from "@/classes/Logger";
import { PilotSheetLocalSettings } from "@/classes/settings/PilotSheetLocalSettings";
import { PilotSheetSettings } from "@/classes/settings/PilotSheetSettings";
import { SocketManager } from "@/classes/SocketManager";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getModuleVersion } from "@/scripts/helpers";
import { msgPackDecoder, msgPackEncoder } from "@/scripts/settings";

// This mirrors pilot sheet settings
export function registerPilotSheetSettings()
{
    // Public Settings
    game.settings.register(LancerAlternative.Name, `pilot-settings-tip`, {
        name: "LA.SETTINGS.pilot.enableTooltip.label",
        hint: "LA.SETTINGS.pilot.enableTooltip.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `pilot-settings-log-header`, {
        name: "LA.SETTINGS.pilot.enableHeaderLog.label",
        hint: "LA.SETTINGS.pilot.enableHeaderLog.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `pilot-settings-log-action-sidebar`, {
        name: "LA.SETTINGS.pilot.enableSidebarActionLog.label",
        hint: "LA.SETTINGS.pilot.enableSidebarActionLog.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `pilot-settings-log-action-save-collapse`, {
        name: "LA.SETTINGS.pilot.saveCollapse.label",
        hint: "LA.SETTINGS.pilot.saveCollapse.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `pilot-settings-log-action-start-collapsed`, {
        name: "LA.SETTINGS.pilot.startCollapsed.label",
        hint: "LA.SETTINGS.pilot.startCollapsed.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `pilot-settings-enable-sensors`, {
        name: "LA.SETTINGS.pilot.enableSensors.label",
        hint: "LA.SETTINGS.pilot.enableSensors.subLabel",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `pilot-settings-enable-tech-attack`, {
        name: "LA.SETTINGS.pilot.enableTechAttack.label",
        hint: "LA.SETTINGS.pilot.enableTechAttack.subLabel",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    // Private Settings
    game.settings.register(LancerAlternative.Name, `_pilot-settings-local`, {
        scope: "client",
        config: false,
        type: String,
        default: "",
    } as ClientSettings.PartialSetting<string>);

    game.settings.register(LancerAlternative.Name, `_pilot-settings-local-version`, {
        scope: "client",
        config: false,
        type: String, // JSON object
        default: "",
    } as ClientSettings.PartialSetting<string>);

    game.settings.register(LancerAlternative.Name, `_pilot-settings`, {
        scope: "world",
        config: false,
        type: Array, // MessagePack encoded object
        default: [],
    } as ClientSettings.PartialSetting<Array<number>>);

    game.settings.register(LancerAlternative.Name, `_pilot-settings-version`, {
        scope: "world",
        config: false,
        type: String,
        default: "",
    } as ClientSettings.PartialSetting<string>);

    // Sockets
    SocketManager.getInstance().register(setPilotSheetData);
}

// Client Settings
export function getPilotSheetTooltipEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-tip`) as boolean;
}

export function getPilotSheetLogHeaderEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-log-header`) as boolean;
}

export function getPilotSheetLogActionSidebarEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-log-action-sidebar`) as boolean;
}

export function getPilotSheetLogActionMainEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-log-action-main`) as boolean;
}

export function getPilotSheetLogActionMainMaxHeight(): number
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-log-action-main-max-height`) as number;
}

export function getPilotSheetLogActionDontSaveCollapse(): boolean
{
    // It is easier to maintain this code if this setting was inverted
    // But semantically it makes more sense to have it worded the way it is
    // Therefore, this setting is inverted in the UI
    return !game.settings.get(LancerAlternative.Name, `pilot-settings-log-action-save-collapse`) as boolean;
}

export function getPilotSheetLogActionStartCollapsed(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-log-action-start-collapsed`) as boolean;
}

// RAW player pilots do not have sensors
export function getPilotSheetSensorsEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-enable-sensors`) as boolean;
}

// RAW player pilots do not have tech attacks
export function getPilotSheetTechAttackEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `pilot-settings-enable-tech-attack`) as boolean;
}

// Client Private Settings
export function resetPilotSheetLocalData(uuid?: string)
{
    if (uuid)
    {
        const data = getPilotSheetLocalData();
        if (data[uuid])
            delete data[uuid];
        setPilotSheetLocalData(data);
    }
    else
    {
        const data = new PilotSheetLocalSettings();
        setPilotSheetLocalData(data);
    }
}

export function getPilotSheetLocalData()
{
    try
    {
        const settings = game.settings.get(LancerAlternative.Name, `_pilot-settings-local`) as string;
        return JSON.parse(settings) as PilotSheetLocalSettings;
    }
    catch
    {
        return new PilotSheetLocalSettings();
    }
}

export function setPilotSheetLocalData(data: PilotSheetLocalSettings)
{
    const encoded = JSON.stringify(data);
    return Promise.all([
        game.settings.set(LancerAlternative.Name, `_pilot-settings-local`, encoded),
        game.settings.set(LancerAlternative.Name, `_pilot-settings-local-version`, getModuleVersion()),
    ])
}

export function getSidebarRatio(uuid: string): number
{
    const data = getPilotSheetLocalData();
    return data[uuid]?.sidebarRatio ?? 1;
}

export function setSidebarRatio(uuid: string, value: number)
{
    const data = getPilotSheetLocalData();
    if (!data[uuid])
        data[uuid] = PilotSheetLocalSettings.emptyContent();
    data[uuid].sidebarRatio = value;
    setPilotSheetLocalData(data);
}

// World Private Settings
export function resetPilotSheetData(uuid?: string)
{
    if (uuid)
    {
        const data = getPilotSheetData();
        if (data[uuid])
            delete data[uuid];
        setPilotSheetData(encodePilotSheetData(data));
    }
    else
    {
        game.settings.set(LancerAlternative.Name, `_pilot-settings`, game.settings.settings.get(`${LancerAlternative.Name}._pilot-settings`)?.default);
        game.settings.set(LancerAlternative.Name, `_pilot-settings-version`, game.settings.settings.get(`${LancerAlternative.Name}._pilot-settings-version`)?.default);
    }
}

export function getPilotSheetData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_pilot-settings`) as Array<number>;
    const version = game.settings.get(LancerAlternative.Name, `_pilot-settings-version`) as string;
    if (!version || !settings.length)
        return new PilotSheetSettings();
    try
    {
        let encoded = new Uint8Array(Object.values(settings));
        if (encoded.length === 1)
        {
            Logger.log("PilotSheetSettings: Decoding failed, trying legacy decode.");
            encoded = new Uint8Array(Object.values(settings[0]));
        }
        return msgPackDecoder.decode(encoded) as PilotSheetSettings;
    }
    catch
    {
        Logger.error("PilotSheetSettings: Decoding failed, returning empty settings.");
        return new PilotSheetSettings();
    }
}

/**
 * If default behavior is ambiguous or a setting has a side effect that would affect the system 
 * as a whole, determine the default settings in a more sophisticated way.
 * @param uuid 
 * @param data 
 */
function migratedDefaults(uuid: string, data: PilotSheetSettings)
{
    const defaultSettings = PilotSheetSettings.emptyContent();
    defaultSettings.syncActorTokenImages = determineActorTokenSync(uuid, data);
    return defaultSettings;
}


export function encodePilotSheetData(data: PilotSheetSettings): Array<number>
{
    const encoded: Uint8Array = msgPackEncoder.encode(data);
    return Array.from(encoded);
}

export function setPilotSheetData(encoded: Array<number>)
{
    return Promise.all([
        game.settings.set(LancerAlternative.Name, `_pilot-settings`, encoded),
        game.settings.set(LancerAlternative.Name, `_pilot-settings-version`, getModuleVersion()),
    ]);
}

export function setImageOffsetXY(uuid: string, x: number, y: number)
{
    const data = getPilotSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetX = x;
    data[uuid].headerImgOffsetY = y;

    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () =>
        {
            Logger.log(`Image offset (X, Y) set to (${x}, ${y}) for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
}

export function getImageOffsetY(uuid: string): number
{
    const data = getPilotSheetData();
    return data[uuid]?.headerImgOffsetY ?? 0;
}

export function setImageOffsetY(uuid: string, value: number)
{
    const data = getPilotSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetY = value;

    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () =>
        {
            Logger.log(`Image offset Y set to ${value} for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
}

export function getImageOffsetX(uuid: string): number
{
    const data = getPilotSheetData();
    return data[uuid]?.headerImgOffsetX ?? 0;
}

export function setImageOffsetX(uuid: string, value: number)
{
    const data = getPilotSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetX = value;

    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () =>
        {
            Logger.log(`Image offset X set to ${value} for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
}

export function getThemeOverride(uuid: string): string
{
    const data = getPilotSheetData();
    return data[uuid]?.themeOverride ?? "";
}

export function setThemeOverride(uuid: string, value: string)
{
    const data = getPilotSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].themeOverride = value;
    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () =>
        {
            Logger.log(`Theme override set to ${value} for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
    Hooks.call("laOverrideTheme", uuid, value);
}

export function getSidebarExecutables(uuid: string): Array<string>
{
    const data = getPilotSheetData();
    return data[uuid]?.sidebarExes ?? migratedDefaults(uuid, data).sidebarExes;
}

export function setSidebarExecutables(uuid: string, macros: Array<string>)
{
    const data = getPilotSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].sidebarExes = macros;
    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () =>
        {
            Logger.log(`Sidebar executables set to ${macros.join(", ")} for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
}

export function getBondImageSrc(uuid: string): string
{
    const data = getPilotSheetData();
    return data[uuid]?.bondImageSrc ?? migratedDefaults(uuid, data).bondImageSrc;
}

export function setBondImageSrc(uuid: string, src: string)
{
    const data = getPilotSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].bondImageSrc = src;
    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () =>
        {
            Logger.log(`Bond image src set to ${src} for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
}

export function getActorTokenSync(uuid: string): boolean
{
    const data = getPilotSheetData();

    return determineActorTokenSync(uuid, data);
}

function determineActorTokenSync(uuid: string, data: PilotSheetSettings): boolean
{
    // Find an appropriate default setting for token-actor image relationship 
    // if newly applying sheet or from old version
    if (data[uuid]?.syncActorTokenImages === undefined || data[uuid]?.syncActorTokenImages === null)
    {
        Logger.log("Determining default syncActorTokenImages setting for a new or unsaved pilot/old module version");
        
        const actor = fromUuidSync(uuid) as any;
        if (actor.prototypeToken?.texture?.src && actor.img)
            return actor.img === actor.prototypeToken.texture.src;
        
        return true;
    }
    else
        return data[uuid].syncActorTokenImages;
}

export function setActorTokenSync(uuid: string, value: boolean)
{
    const data = getPilotSheetData();

    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);

    data[uuid].syncActorTokenImages = value;
    SocketManager.getInstance().runAsGM(
        setPilotSheetData,
        () => {
            Logger.log(`Sync actor-token images set to ${value} for ${uuid}`);
        },
        encodePilotSheetData(data),
    );
}
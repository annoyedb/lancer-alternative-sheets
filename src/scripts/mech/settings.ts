import { Logger } from "@/classes/Logger";
import { MechSheetLocalSettings } from "@/classes/settings/MechSheetLocalSettings";
import { MechSheetSettings } from "@/classes/settings/MechSheetSettings";
import { SocketManager } from "@/classes/SocketManager";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getModuleVersion } from "@/scripts/helpers";
import { msgPackDecoder, msgPackEncoder } from "@/scripts/settings";

export function registerMechSheetSettings()
{
    // Public Settings
    // game.settings.register(LancerAlternative.Name, `mech-settings-performance`, {
    //     name: "LA.SETTINGS.mech.enableEffects.label",
    //     hint: "LA.SETTINGS.mech.enableEffects.subLabel",
    //     scope: "client",
    //     config: true,
    //     type: Boolean,
    //     default: true,
    // } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-tip`, {
        name: "LA.SETTINGS.mech.enableTooltip.label",
        hint: "LA.SETTINGS.mech.enableTooltip.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-header`, {
        name: "LA.SETTINGS.mech.enableHeaderLog.label",
        hint: "LA.SETTINGS.mech.enableHeaderLog.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-sidebar`, {
        name: "LA.SETTINGS.mech.enableSidebarActionLog.label",
        hint: "LA.SETTINGS.mech.enableSidebarActionLog.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-main`, {
        name: "LA.SETTINGS.mech.enableMainActionLog.label",
        hint: "LA.SETTINGS.mech.enableMainActionLog.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-main-max-height`, {
        name: "LA.SETTINGS.mech.sizeMainActionLog.label",
        hint: "LA.SETTINGS.mech.sizeMainActionLog.subLabel",
        scope: "client",
        config: true,
        type: Number,
        range: {
            min: 10,
            max: 30,
            step: 1,
        },
        default: 12,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-save-collapse`, {
        name: "LA.SETTINGS.mech.saveCollapse.label",
        hint: "LA.SETTINGS.mech.saveCollapse.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-start-collapsed`, {
        name: "LA.SETTINGS.mech.startCollapsed.label",
        hint: "LA.SETTINGS.mech.startCollapsed.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    } as ClientSettings.PartialSetting<boolean>);

    // Private Settings
    game.settings.register(LancerAlternative.Name, `_mech-settings-local`, {
        scope: "client",
        config: false,
        type: String,
        default: "",
    } as ClientSettings.PartialSetting<string>);

    game.settings.register(LancerAlternative.Name, `_mech-settings-local-version`, {
        scope: "client",
        config: false,
        type: String, // JSON object
        default: "",
    } as ClientSettings.PartialSetting<string>);

    game.settings.register(LancerAlternative.Name, `_mech-settings`, {
        scope: "world",
        config: false,
        type: Array, // MessagePack encoded object
        default: [],
    } as ClientSettings.PartialSetting<Array<number>>);

    game.settings.register(LancerAlternative.Name, `_mech-settings-version`, {
        scope: "world",
        config: false,
        type: String,
        default: "",
    } as ClientSettings.PartialSetting<string>);

    // Sockets
    SocketManager.getInstance().register(setMechSheetData);
}

// Client Settings
// export function getMechSheetEffectsEnabled(): boolean
// {
//     return game.settings.get(LancerAlternative.Name, `mech-settings-performance`) as boolean;
// }

export function getMechSheetTooltipEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-tip`) as boolean;
}

export function getMechSheetLogHeaderEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-log-header`) as boolean;
}

export function getMechSheetLogActionSidebarEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-log-action-sidebar`) as boolean;
}

export function getMechSheetLogActionMainEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-log-action-main`) as boolean;
}

export function getMechSheetLogActionMainMaxHeight(): number
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-log-action-main-max-height`) as number;
}

export function getMechSheetLogActionDontSaveCollapse(): boolean
{
    // It is easier to maintain this code if this setting was inverted
    // But semantically it makes more sense to have it worded the way it is
    // Therefore, this setting is inverted in the UI
    return !game.settings.get(LancerAlternative.Name, `mech-settings-log-action-save-collapse`) as boolean;
}

export function getMechSheetLogActionStartCollapsed(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-log-action-start-collapsed`) as boolean;
}

// Client Private Settings
export function resetMechSheetLocalData(uuid?: string)
{
    if (uuid)
    {
        const data = getMechSheetLocalData();
        if (data[uuid])
            delete data[uuid];
        setMechSheetLocalData(data);
    }
    else
    {
        const data = new MechSheetLocalSettings();
        setMechSheetLocalData(data);
    }
}

export function getMechSheetLocalData()
{
    try
    {
        const settings = game.settings.get(LancerAlternative.Name, `_mech-settings-local`) as string;
        return JSON.parse(settings) as MechSheetLocalSettings;
    }
    catch
    {
        return new MechSheetLocalSettings();
    }
}

export function setMechSheetLocalData(data: MechSheetLocalSettings)
{
    const encoded = JSON.stringify(data);
    return Promise.all([
        game.settings.set(LancerAlternative.Name, `_mech-settings-local`, encoded),
        game.settings.set(LancerAlternative.Name, `_mech-settings-local-version`, getModuleVersion()),
    ])
}

export function getSidebarRatio(uuid: string): number
{
    const data = getMechSheetLocalData();
    return data[uuid]?.sidebarRatio ?? 1;
}

export function setSidebarRatio(uuid: string, value: number)
{
    const data = getMechSheetLocalData();
    if (!data[uuid])
        data[uuid] = MechSheetLocalSettings.emptyContent();
    data[uuid].sidebarRatio = value;
    setMechSheetLocalData(data);
}

// World Private Settings
export function resetMechSheetData(uuid?: string)
{
    if (uuid)
    {
        const data = getMechSheetData();
        if (data[uuid])
            delete data[uuid];
        setMechSheetData(encodeMechSheetData(data));
    }
    else
    {
        game.settings.set(LancerAlternative.Name, `_mech-settings`, game.settings.settings.get(`${LancerAlternative.Name}._mech-settings`)?.default);
        game.settings.set(LancerAlternative.Name, `_mech-settings-version`, game.settings.settings.get(`${LancerAlternative.Name}._mech-settings-version`)?.default);
    }
}


export function getMechSheetData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_mech-settings`) as Array<number>;
    if (!settings.length)
        return new MechSheetSettings();
    try
    {
        let encoded = new Uint8Array(Object.values(settings));
        if (encoded.length === 1)
        {
            Logger.log("MechSheetSettings: Decoding failed, trying legacy decode.");
            encoded = new Uint8Array(Object.values(settings[0]));
        }
        return msgPackDecoder.decode(encoded) as MechSheetSettings;
    }
    catch
    {
        Logger.error("MechSheetSettings: Decoding failed, returning empty settings.");
        return new MechSheetSettings();
    }
}

/**
 * If default behavior is ambiguous or a setting has a side effect that would affect the system 
 * as a whole, determine the default settings in a more sophisticated way.
 * @param uuid 
 * @param data 
 */
function migratedDefaults(uuid: string, data: MechSheetSettings)
{
    const defaultSettings = MechSheetSettings.emptyContent();
    defaultSettings.syncActorTokenImages = determineActorTokenSync(uuid, data);
    return defaultSettings;
}

export function encodeMechSheetData(data: MechSheetSettings): Array<number>
{
    const encoded: Uint8Array = msgPackEncoder.encode(data);
    return Array.from(encoded);
}

export function setMechSheetData(encoded: Array<number>)
{
    return Promise.all([
        game.settings.set(LancerAlternative.Name, `_mech-settings`, encoded),
        game.settings.set(LancerAlternative.Name, `_mech-settings-version`, getModuleVersion()),
    ]);
}

export function getImageOffsetY(uuid: string): number
{
    const data = getMechSheetData();
    return data[uuid]?.headerImgOffsetY ?? 0;
}

export function setImageOffsetY(uuid: string, value: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetY = value;
    // setMechSheetData(data);

    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Image offset Y set to ${value} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
}

export function getThemeOverride(uuid: string): string
{
    const data = getMechSheetData();
    return data[uuid]?.themeOverride ?? "";
}

export function setThemeOverride(uuid: string, value: string)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].themeOverride = value;
    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Theme override set to ${value} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
    Hooks.call("laOverrideTheme", uuid, value);
}

export function getSidebarExecutables(uuid: string): Array<string>
{
    const data = getMechSheetData();
    return data[uuid]?.sidebarExes ?? migratedDefaults(uuid, data).sidebarExes;
}

export function setSidebarExecutables(uuid: string, macros: Array<string>)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].sidebarExes = macros;
    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Sidebar executables set to ${macros.join(", ")} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
}

export function getActorTokenSync(uuid: string): boolean
{
    const data = getMechSheetData();

    return determineActorTokenSync(uuid, data);
}

function determineActorTokenSync(uuid: string, data: MechSheetSettings): boolean
{
    // Find an appropriate default setting for token-actor image relationship 
    // if newly applying sheet or from old version
    if (data[uuid]?.syncActorTokenImages === undefined || data[uuid]?.syncActorTokenImages === null)
    {
        Logger.log("Determining default syncActorTokenImages setting for a new or unsaved mech/old module version");

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
    const data = getMechSheetData();

    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);

    data[uuid].syncActorTokenImages = value;
    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () => {
            Logger.log(`Sync actor-token images set to ${value} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
}
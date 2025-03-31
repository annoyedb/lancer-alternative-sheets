import { MechSheetLocalSettings } from "@/classes/settings/MechSheetLocalSettings";
import { MechSheetSettings } from "@/classes/settings/MechSheetSettings";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { Encoder, Decoder } from "@msgpack/msgpack";

const encoder = new Encoder();
const decoder = new Decoder();

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

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-main-save-collapse`, {
        name: "LA.SETTINGS.mech.saveCollapse.label",
        hint: "LA.SETTINGS.mech.saveCollapse.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-main-start-collapsed`, {
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
        type: Array,
        default: [],
    } as ClientSettings.PartialSetting<Array<Object>>);

    game.settings.register(LancerAlternative.Name, `_mech-settings`, {
        scope: "world",
        config: false,
        type: Array,
        default: [],
    } as ClientSettings.PartialSetting<Array<Object>>);
}

// Client Settings
export function getMechSheetEffectsEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-performance`) as boolean;
}

export function getMechSheetTipEnabled(): boolean
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

export function getMechSheetLogActionMainDontSaveCollapse(): boolean
{
    // It is easier to maintain this code if this setting was inverted
    // But semantically it makes more sense to have it worded the way it is
    // Therefore, this setting is inverted in the UI
    return !game.settings.get(LancerAlternative.Name, `mech-settings-log-action-main-save-collapse`) as boolean;
}

export function getMechSheetLogActionMainStartCollapsed(): boolean
{
    return game.settings.get(LancerAlternative.Name, `mech-settings-log-action-main-start-collapsed`) as boolean;
}

// Client Private Settings
export function getMechSheetLocalData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_mech-settings-local`) as Array<Object>;
    if (!settings.length)
        return new MechSheetLocalSettings();
    const encoded = new Uint8Array(Object.values(settings[0]));
    return decoder.decode(encoded) as MechSheetLocalSettings;
}

export function setMechSheetLocalData(data: MechSheetLocalSettings)
{
    const encoded: Uint8Array = encoder.encode(data);
    return game.settings.set(LancerAlternative.Name, `_mech-settings-local`, encoded);
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
export function getMechSheetData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_mech-settings`) as Array<Object>;
    if (!settings.length)
        return new MechSheetSettings();
    const encoded = new Uint8Array(Object.values(settings[0]));
    return decoder.decode(encoded) as MechSheetSettings;
}

export function setMechSheetData(data: MechSheetSettings)
{
    const encoded: Uint8Array = encoder.encode(data);
    return game.settings.set(LancerAlternative.Name, `_mech-settings`, encoded);
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
        data[uuid] = MechSheetSettings.emptyContent();
    data[uuid].headerImgOffsetY = value;
    setMechSheetData(data);
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
        data[uuid] = MechSheetSettings.emptyContent();
    data[uuid].themeOverride = value;
    setMechSheetData(data)
        .then(() =>
        {
            Hooks.call("laOverrideTheme", uuid);
        });
}

export function getSidebarExecutables(uuid: string): Array<string>
{
    const data = getMechSheetData();
    return data[uuid]?.sidebarExes ?? MechSheetSettings.emptyContent().sidebarExes;
}

export function setSidebarExecutables(uuid: string, macros: Array<string>)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = MechSheetSettings.emptyContent();
    data[uuid].sidebarExes = macros;
    setMechSheetData(data);
}
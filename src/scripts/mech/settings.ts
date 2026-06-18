import { Logger } from "@/classes/Logger";
import { MechSheetLocalSettings } from "@/classes/settings/MechSheetLocalSettings";
import { MechSheetSettings } from "@/classes/settings/MechSheetSettings";
import { SocketManager } from "@/classes/SocketManager";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getModuleVersion } from "@/scripts/helpers";
import { msgPackDecoder, msgPackEncoder } from "@/scripts/settings";
import { TEMPLATE_PATHS } from "@/scripts/loader";

export class MechSheetSettingsSubmenu extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
)
{
    static override DEFAULT_OPTIONS: foundry.applications.api.ApplicationV2.DefaultOptions = {
        id: "la-mech-settings-submenu",
        tag: "form",
        window: {
            title: "LA.SETTINGS.mech.label",
            icon: "fas fa-gear",
            contentClasses: ["standard-form"],
        },
        position: {
            width: 600,
        },
        form: {
            handler: MechSheetSettingsSubmenu.#onSubmit,
            closeOnSubmit: true,
            submitOnChange: false,
        },
        actions: {
            resetLocalData: MechSheetSettingsSubmenu.#onResetLocalData,
            resetServerData: MechSheetSettingsSubmenu.#onResetServerData,
        },
    };

    static override PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
        body: {
            template: TEMPLATE_PATHS.mechSettingsSubmenu,
        },
        footer: {
            template: "templates/generic/form-footer.hbs",
        },
    };

    // Return type is `any` to work around the opaque generic RenderContext in the mixin
    protected override async _prepareContext(
        _options: object
    ): Promise<any>
    {
        return {
            tip: game.settings.get(LancerAlternative.Name, `mech-settings-tip`) as boolean,
            logHeader: game.settings.get(LancerAlternative.Name, `mech-settings-log-header`) as boolean,
            logActionSidebar: game.settings.get(LancerAlternative.Name, `mech-settings-log-action-sidebar`) as boolean,
            logActionMain: game.settings.get(LancerAlternative.Name, `mech-settings-log-action-main`) as boolean,
            logActionMainMaxHeight: game.settings.get(LancerAlternative.Name, `mech-settings-log-action-main-max-height`) as number,
            saveCollapse: game.settings.get(LancerAlternative.Name, `mech-settings-log-action-save-collapse`) as boolean,
            startCollapsed: game.settings.get(LancerAlternative.Name, `mech-settings-log-action-start-collapsed`) as boolean,
            isGM: game.user.isGM,
            buttons: [
                { type: "submit", icon: "fa-solid fa-floppy-disk", label: "SETTINGS.Save" },
            ],
        };
    }

    static #onResetLocalData(
        this: MechSheetSettingsSubmenu,
        _event: PointerEvent,
        _target: HTMLElement,
    ): void
    {
        resetMechSheetLocalData();
    }

    static #onResetServerData(
        this: MechSheetSettingsSubmenu,
        _event: PointerEvent,
        _target: HTMLElement,
    ): void
    {
        if (!game.user.isGM) return;
        resetMechSheetData();
    }

    static async #onSubmit(
        _event: SubmitEvent | Event,
        _form: HTMLFormElement,
        formData: foundry.applications.ux.FormDataExtended,
    ): Promise<void>
    {
        const data = formData.object;
        await Promise.all([
            game.settings.set(LancerAlternative.Name, `mech-settings-tip`, data["tip"] === true),
            game.settings.set(LancerAlternative.Name, `mech-settings-log-header`, data["logHeader"] === true),
            game.settings.set(LancerAlternative.Name, `mech-settings-log-action-sidebar`, data["logActionSidebar"] === true),
            game.settings.set(LancerAlternative.Name, `mech-settings-log-action-main`, data["logActionMain"] === true),
            game.settings.set(LancerAlternative.Name, `mech-settings-log-action-main-max-height`, Number(data["logActionMainMaxHeight"])),
            game.settings.set(LancerAlternative.Name, `mech-settings-log-action-save-collapse`, data["saveCollapse"] === true),
            game.settings.set(LancerAlternative.Name, `mech-settings-log-action-start-collapsed`, data["startCollapsed"] === true),
        ]);
    }
}

export function registerMechSheetSettings()
{
    // Public Settings
    game.settings.register(LancerAlternative.Name, `mech-settings-tip`, {
        name: "LA.SETTINGS.mech.enableTooltip.label",
        hint: "LA.SETTINGS.mech.enableTooltip.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: true,
    });

    game.settings.register(LancerAlternative.Name, `mech-settings-log-header`, {
        name: "LA.SETTINGS.mech.enableHeaderLog.label",
        hint: "LA.SETTINGS.mech.enableHeaderLog.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: true,
    });

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-sidebar`, {
        name: "LA.SETTINGS.mech.enableSidebarActionLog.label",
        hint: "LA.SETTINGS.mech.enableSidebarActionLog.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: true,
    });

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-main`, {
        name: "LA.SETTINGS.mech.enableMainActionLog.label",
        hint: "LA.SETTINGS.mech.enableMainActionLog.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: false,
    });

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-main-max-height`, {
        name: "LA.SETTINGS.mech.sizeMainActionLog.label",
        hint: "LA.SETTINGS.mech.sizeMainActionLog.subLabel",
        scope: "client",
        config: false,
        type: Number,
        range: {
            min: 10,
            max: 30,
            step: 1,
        },
        default: 12,
    });

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-save-collapse`, {
        name: "LA.SETTINGS.mech.saveCollapse.label",
        hint: "LA.SETTINGS.mech.saveCollapse.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: false,
    });

    game.settings.register(LancerAlternative.Name, `mech-settings-log-action-start-collapsed`, {
        name: "LA.SETTINGS.mech.startCollapsed.label",
        hint: "LA.SETTINGS.mech.startCollapsed.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: true,
    });

    // Private Settings
    game.settings.register(LancerAlternative.Name, `_mech-settings-local`, {
        scope: "client",
        config: false,
        type: String,
        default: "",
    });

    game.settings.register(LancerAlternative.Name, `_mech-settings-local-version`, {
        scope: "client",
        config: false,
        type: String, // JSON object
        default: "",
    });

    game.settings.register(LancerAlternative.Name, `_mech-settings`, {
        scope: "world",
        config: false,
        type: Array, // MessagePack encoded object
        default: [],
    });

    game.settings.register(LancerAlternative.Name, `_mech-settings-version`, {
        scope: "world",
        config: false,
        type: String,
        default: "",
    });

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

export function setImageOffsetXY(uuid: string, x: number, y: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetX = x;
    data[uuid].headerImgOffsetY = y;

    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Image offset (X, Y) set to (${x}, ${y}) for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
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

    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Image offset Y set to ${value} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
}

export function getImageOffsetX(uuid: string): number
{
    const data = getMechSheetData();
    return data[uuid]?.headerImgOffsetX ?? 0;
}

export function setImageOffsetX(uuid: string, value: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetX = value;

    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Image offset X set to ${value} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
}

export function getImageWidth(uuid: string): number
{
    const data = getMechSheetData();
    return data[uuid]?.headerImgWidth ?? 0;
}

export function setImageWidth(uuid: string, value: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgWidth = value;

    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Image width set to ${value} for ${uuid}`);
        },
        encodeMechSheetData(data),
    );
}

// Note that calling separate setImage functions requires callbacks to run in sequence, otherwise requests will get dropped
// Which is mainly why this optimization function exists
export function setImageBatched(uuid: string, x: number, y: number, width: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = migratedDefaults(uuid, data);
    data[uuid].headerImgOffsetX = x;
    data[uuid].headerImgOffsetY = y;
    data[uuid].headerImgWidth = width;

    SocketManager.getInstance().runAsGM(
        setMechSheetData,
        () =>
        {
            Logger.log(`Image offset (X, Y) set to (${x}, ${y}) and width set to ${width} for ${uuid}`);
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
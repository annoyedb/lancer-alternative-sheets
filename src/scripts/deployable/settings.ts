import { msgPackDecoder, msgPackEncoder } from "@/scripts/settings";
import { DeployableSheetSettings } from "@/classes/settings/DeployableSheetSettings";
import { SocketManager } from "@/classes/SocketManager";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { getModuleVersion } from "@/scripts/helpers";
import { Logger } from "@/classes/Logger";
import { TEMPLATE_PATHS } from "@/scripts/loader";

export class DeployableSheetSettingsSubmenu extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
)
{
    static override DEFAULT_OPTIONS: foundry.applications.api.ApplicationV2.DefaultOptions = {
        id: "la-deployable-settings-submenu",
        tag: "form",
        window: {
            title: "LA.SETTINGS.deployable.label",
            icon: "fas fa-gear",
            contentClasses: ["standard-form"],
        },
        position: {
            width: 600,
        },
        form: {
            handler: DeployableSheetSettingsSubmenu.#onSubmit,
            closeOnSubmit: true,
            submitOnChange: false,
        },
        actions: {
            resetServerData: DeployableSheetSettingsSubmenu.#onResetServerData,
        },
    };

    static override PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
        body: {
            template: TEMPLATE_PATHS.deployableSettingsSubmenu,
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
            tip: game.settings.get(LancerAlternative.Name, `deployable-settings-tip`) as boolean,
            sheetWidth: game.settings.get(LancerAlternative.Name, `deployable-settings-sheet-width`) as number,
            sheetHeight: game.settings.get(LancerAlternative.Name, `deployable-settings-sheet-height`) as number,
            saveCollapse: game.settings.get(LancerAlternative.Name, `deployable-settings-log-action-save-collapse`) as boolean,
            startCollapsed: game.settings.get(LancerAlternative.Name, `deployable-settings-log-action-start-collapsed`) as boolean,
            isGM: game.user.isGM,
            buttons: [
                { type: "submit", icon: "fa-solid fa-floppy-disk", label: "SETTINGS.Save" },
            ],
        };
    }

    static #onResetServerData(
        this: DeployableSheetSettingsSubmenu,
        _event: PointerEvent,
        _target: HTMLElement,
    ): void
    {
        if (!game.user.isGM) return;
        resetDeployableSheetData();
    }

    static async #onSubmit(
        _event: SubmitEvent | Event,
        _form: HTMLFormElement,
        formData: foundry.applications.ux.FormDataExtended,
    ): Promise<void>
    {
        const data = formData.object;
        await Promise.all([
            game.settings.set(LancerAlternative.Name, `deployable-settings-tip`, data["tip"] === true),
            game.settings.set(LancerAlternative.Name, `deployable-settings-sheet-width`, Number(data["sheetWidth"])),
            game.settings.set(LancerAlternative.Name, `deployable-settings-sheet-height`, Number(data["sheetHeight"])),
            game.settings.set(LancerAlternative.Name, `deployable-settings-log-action-save-collapse`, data["saveCollapse"] === true),
            game.settings.set(LancerAlternative.Name, `deployable-settings-log-action-start-collapsed`, data["startCollapsed"] === true),
        ]);
    }
}

export function registerDeployableSheetSettings()
{
    // Public Settings
    game.settings.register(LancerAlternative.Name, `deployable-settings-tip`, {
        name: "LA.SETTINGS.deployable.enableTooltip.label",
        hint: "LA.SETTINGS.deployable.enableTooltip.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: true,
    });

    game.settings.register(LancerAlternative.Name, `deployable-settings-sheet-width`, {
        name: "LA.SETTINGS.deployable.sheetWidth.label",
        hint: "LA.SETTINGS.deployable.sheetWidth.subLabel",
        scope: "client",
        config: false,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 500,
    });

    game.settings.register(LancerAlternative.Name, `deployable-settings-sheet-height`, {
        name: "LA.SETTINGS.deployable.sheetHeight.label",
        hint: "LA.SETTINGS.deployable.sheetHeight.subLabel",
        scope: "client",
        config: false,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 800,
    });

    game.settings.register(LancerAlternative.Name, `deployable-settings-log-action-save-collapse`, {
        name: "LA.SETTINGS.deployable.saveCollapse.label",
        hint: "LA.SETTINGS.deployable.saveCollapse.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: false,
    });

    game.settings.register(LancerAlternative.Name, `deployable-settings-log-action-start-collapsed`, {
        name: "LA.SETTINGS.deployable.startCollapsed.label",
        hint: "LA.SETTINGS.deployable.startCollapsed.subLabel",
        scope: "client",
        config: false,
        type: Boolean,
        default: true,
    });

    // Private Settings
    game.settings.register(LancerAlternative.Name, `_deployable-settings`, {
        scope: "world",
        config: false,
        type: Array, // MessagePack encoded object
        default: [],
    });

    game.settings.register(LancerAlternative.Name, `_deployable-settings-version`, {
        scope: "world",
        config: false,
        type: String,
        default: "",
    });

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

/**
 * If default behavior is ambiguous or a setting has a side effect that would affect the system 
 * as a whole, determine the default settings in a more sophisticated way.
 * @param uuid 
 * @param data 
 */
function migratedDefaults(uuid: string, data: DeployableSheetSettings)
{
    const defaultSettings = DeployableSheetSettings.emptyContent();
    defaultSettings.syncActorTokenImages = determineActorTokenSync(uuid, data);
    return defaultSettings;
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
        data[workingUUID] = migratedDefaults(workingUUID, data);

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
        data[workingUUID] = migratedDefaults(workingUUID, data);

    data[workingUUID].sidebarExes = macros;
    SocketManager.getInstance().runAsGM(
        setDeployableSheetData,
        () => {
            Logger.log(`Sidebar executables set to ${macros.join(", ")} for ${uuid}`);
        },
        encodeDeployableSheetData(data),
    );
}

export function getActorTokenSync(uuid: string): boolean
{
    const data = getDeployableSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;

    return determineActorTokenSync(workingUUID, data);
}

function determineActorTokenSync(uuid: string, data: DeployableSheetSettings): boolean
{
    // Find an appropriate default setting for token-actor image relationship 
    // if newly applying sheet or from old version
    if (data[uuid]?.syncActorTokenImages === undefined || data[uuid]?.syncActorTokenImages === null)
    {
        Logger.log("Determining default syncActorTokenImages setting for a new or unsaved deployable/old module version");

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
    const data = getDeployableSheetData();
    const workingUUID = getRoot(uuid) ?? uuid;

    if (!data[workingUUID])
        data[workingUUID] = migratedDefaults(workingUUID, data);

    data[workingUUID].syncActorTokenImages = value;
    SocketManager.getInstance().runAsGM(
        setDeployableSheetData,
        () => {
            Logger.log(`Sync actor-token images set to ${value} for ${uuid}`);
        },
        encodeDeployableSheetData(data),
    );
}
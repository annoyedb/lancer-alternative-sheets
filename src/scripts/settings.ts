import { LancerAlternative } from "@/enums/LancerAlternative";
import { Encoder, Decoder } from "@msgpack/msgpack";
import { PilotSheetSettingsSubmenu } from "@/scripts/pilot/settings";
import { MechSheetSettingsSubmenu } from "@/scripts/mech/settings";
import { NPCSheetSettingsSubmenu } from "@/scripts/npc/settings";
import { DeployableSheetSettingsSubmenu } from "@/scripts/deployable/settings";

export const msgPackEncoder = new Encoder();
export const msgPackDecoder = new Decoder();

export function registerModuleSettings()
{
    game.settings.registerMenu(LancerAlternative.Name, `settings-submenu-pilot`, {
        name: "LA.SETTINGS.pilot.label",
        label: "",
        hint: "",
        icon: "mdi mdi-account",
        type: PilotSheetSettingsSubmenu,
        restricted: false,
    });

    game.settings.registerMenu(LancerAlternative.Name, `settings-submenu-mech`, {
        name: "LA.SETTINGS.mech.label",
        label: "",
        hint: "",
        icon: "mdi mdi-robot",
        type: MechSheetSettingsSubmenu,
        restricted: false,
    });

    game.settings.registerMenu(LancerAlternative.Name, `settings-submenu-npc`, {
        name: "LA.SETTINGS.npc.label",
        label: "",
        hint: "",
        icon: "mdi mdi-skull",
        type: NPCSheetSettingsSubmenu,
        restricted: false,
    });

    game.settings.registerMenu(LancerAlternative.Name, `settings-submenu-deployable`, {
        name: "LA.SETTINGS.deployable.label",
        label: "",
        hint: "",
        icon: "mdi mdi-quadcopter",
        type: DeployableSheetSettingsSubmenu,
        restricted: false,
    });

    game.settings.register(LancerAlternative.Name, `settings-verbose-logging`, {
        name: "LA.SETTINGS.debug.label",
        hint: "LA.SETTINGS.debug.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    });

    game.settings.register(LancerAlternative.Name, `settings-enable-effects`, {
        name: "LA.SETTINGS.enableEffects.label",
        hint: "LA.SETTINGS.enableEffects.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: true,
    });
}

export function getVerboseLoggingEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `settings-verbose-logging`) as boolean;
}

export function getExtraEffectsEnabled(): boolean
{
    // (#13) This optional chaining is not a mistake; the module will try to preload
    // `game.settings` before they are initialized via Svelte's own initialization step
    // even though the sheets can't get accessed until Foundry is fully initialized
    return game.settings?.get(LancerAlternative.Name, `settings-enable-effects`) as boolean;
}
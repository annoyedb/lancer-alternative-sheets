import { LancerAlternative } from "@/enums/LancerAlternative";
import { Encoder, Decoder } from "@msgpack/msgpack";

export const msgPackEncoder = new Encoder();
export const msgPackDecoder = new Decoder();

export function registerModuleSettings()
{
    game.settings.register(LancerAlternative.Name, `settings-verbose-logging`, {
        name: "LA.SETTINGS.mech.debug.label",
        hint: "LA.SETTINGS.mech.debug.subLabel",
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
    } as ClientSettings.PartialSetting<boolean>);
}

export function getVerboseLoggingEnabled(): boolean
{
    return game.settings.get(LancerAlternative.Name, `settings-verbose-logging`) as boolean;
}
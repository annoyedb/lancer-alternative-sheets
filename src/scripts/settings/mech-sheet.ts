import { MechSheetSettings } from "@/classes/settings/MechSheetSettings";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { type MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";
import { Encoder, Decoder } from "@msgpack/msgpack";

const encoder = new Encoder();
const decoder = new Decoder();

export function registerMechSheetSettings()
{
    // game.settings.register(LancerAlternative.Name, "mech-sidebar-content-ratio", {
    //     name: "LA.SETTINGS.mech.ratio.label",
    //     hint: "LA.SETTINGS.mech.ratio.tooltip",
    //     scope: "client",
    //     config: true,
    //     default: 0.33,
    //     type: Number,
    //     range: {
    //         min: 0.33,
    //         max: 0.66,
    //         step: 0.01,
    //     },
    //     requiresReload: false,
    // } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `_mech-settings`, {
        scope: "world",
        config: false,
        type: Array,
        default: [],
    } as ClientSettings.PartialSetting<Array<Object>>);
}

export function getMechSheetData()
{
    const settings = game.settings.get(LancerAlternative.Name, `_mech-settings`) as Array<Object>;
    const encoded = new Uint8Array(Object.values(settings[0]));
    return decoder.decode(encoded) as MechSheetSettingsData ?? new MechSheetSettings();
}

export function getImageOffsetY(uuid: string): number
{
    const data = getMechSheetData();
    return data[uuid]?.offsetY ?? 0;
}

export function setImageOffsetY(uuid: string, value: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = { offsetY: 0 };
    data[uuid].offsetY = value;
    const encoded: Uint8Array = encoder.encode(data);
    game.settings.set(LancerAlternative.Name, `_mech-settings`, encoded);
}
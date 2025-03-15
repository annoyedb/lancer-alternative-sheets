import { MechSheetSettings } from "@/classes/settings/MechSheetSettings";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { Encoder, Decoder } from "@msgpack/msgpack";

const encoder = new Encoder();
const decoder = new Decoder();

export function registerMechSheetSettings()
{
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
    if (!settings.length)
        return new MechSheetSettings();
    const encoded = new Uint8Array(Object.values(settings[0]));
    return decoder.decode(encoded) as MechSheetSettings;
}

export function setMechSheetData(data: MechSheetSettings)
{
    const encoded: Uint8Array = encoder.encode(data);
    game.settings.set(LancerAlternative.Name, `_mech-settings`, encoded);
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

export function getSidebarRatio(uuid: string): number
{
    const data = getMechSheetData();
    return data[uuid]?.sidebarRatio ?? 1;
}

export function setSidebarRatio(uuid: string, value: number)
{
    const data = getMechSheetData();
    if (!data[uuid])
        data[uuid] = MechSheetSettings.emptyContent();
    data[uuid].sidebarRatio = value;
    setMechSheetData(data);
}
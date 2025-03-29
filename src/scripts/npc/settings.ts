import { LancerAlternative } from "@/enums/LancerAlternative";

export function registerNPCSheetSettings()
{
    game.settings.register(LancerAlternative.Name, `npc-settings-sheet-width`, {
        name: "LA.SETTINGS.npc.sheetWidth.label",
        hint: "LA.SETTINGS.npc.sheetWidth.subLabel",
        scope: "client",
        config: true,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 500,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `npc-settings-sheet-height`, {
        name: "LA.SETTINGS.npc.sheetHeight.label",
        hint: "LA.SETTINGS.npc.sheetHeight.subLabel",
        scope: "client",
        config: true,
        requiresReload: true,
        // @ts-ignore
        type: Number,
        default: 800,
    } as ClientSettings.PartialSetting<number>);
}

// Client Settings
export function getNPCSheetWidth(): number
{
    const width = game.settings.get(LancerAlternative.Name, `npc-settings-sheet-width`) as number;
    return Math.max(0, width);
}

export function getNPCSheetHeight(): number
{
    const height = game.settings.get(LancerAlternative.Name, `npc-settings-sheet-height`) as number;
    return Math.max(0, height);
}
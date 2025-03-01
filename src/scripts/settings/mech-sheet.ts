import { MechSheetSettings } from "@/classes/settings/MechSheetSettings";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";

export function registerMechSheetSettings()
{
    game.settings.register(LancerAlternative.Name, "mech-sidebar-content-ratio", {
        name: "LA.SETTINGS.mech.ratio.label",
        hint: "LA.SETTINGS.mech.ratio.tooltip",
        scope: "client",
        config: true,
        default: 0.33,
        type: Number,
        range: {
            min: 0.33,
            max: 0.66,
            step: 0.01,
        },
        requiresReload: false,
    } as ClientSettings.PartialSetting<number>);

    game.settings.register(LancerAlternative.Name, `_mech-settings`, {
        scope: "world",
        config: false,
        type: MechSheetSettings,
        default: MechSheetSettings.default,
    } as ClientSettings.PartialSetting<MechSheetSettingsData>);
}

// // There's problems in AppV2 with adding to window headers; or more specifically it is cumbersome
// // Trying to get ahead of it by making use of the massive header space in the sheet
// // This way it also stays with Lancer Alternative Sheets only
// export function addSettingToSheetHeader(html : JQuery<HTMLElement>)
// {
//     let text = getLocalized("LA.SHEET.setting.label");
//     html.find(".la-header").append(
        
//     );
// }
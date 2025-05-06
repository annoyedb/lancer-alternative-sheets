import { SystemButton } from "@/enums/SystemButton";
import type { PilotSheetSettingsData } from "@/interfaces/settings/PilotSheetSettingsData";

export class PilotSheetSettings implements PilotSheetSettingsData
{
    [uuid: string]: {
        headerImgOffsetY: number;
        headerImgOffsetX: number;
        themeOverride: string;
        sidebarExes: Array<string>;
        bondImageSrc: string;
    };

    static emptyContent()
    {
        return {
            headerImgOffsetY: 0,
            headerImgOffsetX: 0,
            themeOverride: "",
            sidebarExes: [
                SystemButton.SkillTriggerOther,
                SystemButton.BasicAttack,
                SystemButton.Damage,
            ],
            bondImageSrc: "modules/lancer-alternative-sheets/assets/nobond.webp",
        }
    }
}
import { SystemButton } from "@/enums/SystemButton";
import type { MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";

export class MechSheetSettings implements MechSheetSettingsData
{
    [uuid: string]: {
        headerImgOffsetY: number;
        themeOverride: string;
        sidebarExes: Array<string>;
    };

    static emptyContent()
    {
        return {
            headerImgOffsetY: 0,
            themeOverride: "",
            sidebarExes: [
                SystemButton.Stabilize,
                SystemButton.Overcharge,
                SystemButton.BasicAttack,
                SystemButton.Damage,
                SystemButton.TechAttack,
            ],
        }
    }
}
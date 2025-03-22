import type { MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";

export class MechSheetSettings implements MechSheetSettingsData
{
    [uuid: string]: {
        headerImgOffsetY: number;
        themeOverride: string;
    };

    static emptyContent()
    {
        return {
            headerImgOffsetY: 0,
            themeOverride: "",
        }
    }
}
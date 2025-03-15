import type { MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";

export class MechSheetSettings implements MechSheetSettingsData
{
    [uuid: string]: {
        headerImgOffsetY: number;
        sidebarRatio: number;
    };

    static emptyContent()
    {
        return {
            headerImgOffsetY: 0,
            sidebarRatio: 1,
        }
    }
}
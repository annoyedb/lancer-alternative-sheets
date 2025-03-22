import type { MechSheetLocalSettingsData } from "@/interfaces/settings/MechSheetLocalSettingsData";

export class MechSheetLocalSettings implements MechSheetLocalSettingsData
{
    [uuid: string]: {
        sidebarRatio: number;
    };

    static emptyContent()
    {
        return {
            sidebarRatio: 1,
        }
    }
}
import type { PilotSheetLocalSettingsData } from "@/interfaces/settings/PilotSheetLocalSettingsData";

export class PilotSheetLocalSettings implements PilotSheetLocalSettingsData
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
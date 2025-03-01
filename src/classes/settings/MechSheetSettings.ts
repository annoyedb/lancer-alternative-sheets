import type { MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";

export class MechSheetSettings implements MechSheetSettingsData
{
    offsetY: number;

    constructor(data: MechSheetSettingsData)
    {
        this.offsetY = data.offsetY;
    }

    static get default(): MechSheetSettings
    {
        return new MechSheetSettings({ 
            offsetY: 0,
        });
    }
}
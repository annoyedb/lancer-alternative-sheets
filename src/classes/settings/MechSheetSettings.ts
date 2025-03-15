import type { MechSheetSettingsData } from "@/interfaces/settings/MechSheetSettingsData";

export class MechSheetSettings implements MechSheetSettingsData
{
    [uuid: string]: {
        offsetY: number;
    };
}
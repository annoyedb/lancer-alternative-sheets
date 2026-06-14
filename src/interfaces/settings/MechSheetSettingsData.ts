export interface MechSheetSettingsData
{
    [uuid: string]: {
        headerImgOffsetY: number;
        headerImgWidth: number;
        themeOverride: string;
        sidebarExes: Array<string>;
        syncActorTokenImages: boolean;
    }
}
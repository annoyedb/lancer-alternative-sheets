export interface MechSheetSettingsData
{ 
    [uuid: string]: {
        headerImgOffsetY: number;
        themeOverride: string;
        sidebarExes: Array<string>;
        syncActorTokenImages: boolean;
    }
}
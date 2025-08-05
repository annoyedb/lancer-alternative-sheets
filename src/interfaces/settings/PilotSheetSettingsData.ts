export interface PilotSheetSettingsData
{ 
    [uuid: string]: {
        headerImgOffsetY: number;
        headerImgOffsetX: number;
        themeOverride: string;
        sidebarExes: Array<string>;
        bondImageSrc: string;
        syncActorTokenImages: boolean;
    }
}
export interface PilotSheetSettingsData
{
    [uuid: string]: {
        headerImgOffsetY: number;
        headerImgOffsetX: number;
        headerImgWidth: number;
        themeOverride: string;
        sidebarExes: Array<string>;
        bondImageSrc: string;
        syncActorTokenImages: boolean;
    }
}
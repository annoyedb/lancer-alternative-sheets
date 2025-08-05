export interface DeployableSheetSettingsData
{ 
    [uuid: string]: {
        themeOverride: string;
        sidebarExes: Array<string>;
        syncActorTokenImages: boolean;
    }
}
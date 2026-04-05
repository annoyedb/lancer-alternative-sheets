export interface NPCSheetSettingsData
{
    [uuid: string]: {
        themeOverride: string;
        sidebarExes: Array<string>;
        syncActorTokenImages: boolean;
        pinnedTraits: Array<string>; // LIDs
        pinnedSystems: Array<string>; // LIDs
        pinnedTechs: Array<string>; // LIDs
        pinnedReactions: Array<string>; // LIDs
    }
}
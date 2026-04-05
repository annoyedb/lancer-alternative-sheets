import type { NPCSheetSettingsData } from "@/interfaces/settings/NPCSheetSettingsData";

export class NPCSheetSettings implements NPCSheetSettingsData
{
    [uuid: string]: {
        themeOverride: string;
        sidebarExes: Array<string>;
        syncActorTokenImages: boolean;
        pinnedTraits: Array<string>; // LIDs
        pinnedSystems: Array<string>; // LIDs
        pinnedTechs: Array<string>; // LIDs
        pinnedReactions: Array<string>; // LIDs
    };

    static emptyContent()
    {
        return {
            themeOverride: "",
            sidebarExes: [
            ],
            syncActorTokenImages: true,
            pinnedTraits: [
            ],
            pinnedSystems: [
            ],
            pinnedTechs: [
            ],
            pinnedReactions: [
            ],
        }
    }
}
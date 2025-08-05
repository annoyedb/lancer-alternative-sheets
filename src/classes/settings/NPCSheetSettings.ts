import type { NPCSheetSettingsData } from "@/interfaces/settings/NPCSheetSettingsData";

export class NPCSheetSettings implements NPCSheetSettingsData
{
    [uuid: string]: {
        themeOverride: string;
        sidebarExes: Array<string>;
        syncActorTokenImages: boolean;
    };

    static emptyContent()
    {
        return {
            themeOverride: "",
            sidebarExes: [
            ],
            syncActorTokenImages: true,
        }
    }
}
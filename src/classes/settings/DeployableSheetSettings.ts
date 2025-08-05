import type { DeployableSheetSettingsData } from "@/interfaces/settings/DeployableSheetSettingsData";

export class DeployableSheetSettings implements DeployableSheetSettingsData
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
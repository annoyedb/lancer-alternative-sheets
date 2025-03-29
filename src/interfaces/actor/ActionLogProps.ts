import type { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";

export interface ActionLogProps
{
    // The actor ID that this log will filter by
    id: string;
    
    // Optional max height for the log
    maxHeight?: number;

    // Whether or not collapsed logs should save to session storage
    saveCollapse?: boolean;

    // Whether or not log items should start collapsed
    startCollapsed?: boolean;

    // Collapse ID prefix
    collapsePrefix?: ActionLogCollapsePrefix;
}
import type { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";

export interface ActionLogProps
{
    // The actor ID that this log will filter by
    uuid: string;
    
    // Optional max height for the log
    maxHeight?: number;

    // Whether or not collapsed logs should reload to their saved state on rerenders
    dontSaveCollapse?: boolean;

    // Whether or not log items should start collapsed
    startCollapsed?: boolean;

    // Collapse ID prefix
    collapsePrefix?: ActionLogCollapsePrefix;
}
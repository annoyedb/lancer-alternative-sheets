import type { Snippet } from "svelte";

export interface HeaderMainProps
{
    children?: Snippet;
    headerContent?: Snippet;
    
    rootStyle?: Array<string>;
    headerStyle?: Array<string>;
    borderStyle?: Array<string>;

    collapseID?: string;
    startCollapsed?: boolean;
    extensionText?: string;
}
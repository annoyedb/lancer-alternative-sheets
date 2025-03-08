import type { Snippet } from "svelte";

export interface HeaderSecondaryProps
{
    headerContentLeft?: Snippet;
    headerContentRight?: Snippet;
    renderOutsideCollapse?: Snippet;
    
    headerStyle?: Array<string>;
    borderStyle?: Array<string>;
}
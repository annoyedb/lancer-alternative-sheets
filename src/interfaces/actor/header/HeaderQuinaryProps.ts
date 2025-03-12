import type { Snippet } from "svelte";

export interface HeaderQuinaryProps
{
    headerContentLeft?: Snippet;
    headerContentRight?: Snippet;
    renderOutsideCollapse?: Snippet;
    
    headerStyle?: Array<string>;
    borderStyle?: Array<string>;
}
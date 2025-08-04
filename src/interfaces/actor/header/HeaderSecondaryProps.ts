import type { Snippet } from "svelte";

export interface HeaderSecondaryProps
{
    renderOutsideCollapse?: Snippet;
    
    headerStyle?: Array<string>;
    borderStyle?: Array<string>;
}
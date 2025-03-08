import type { Snippet } from "svelte";

export interface HeaderMainProps
{
    headerContent?: Snippet;
    
    headerStyle?: Array<string>;
    borderStyle?: Array<string>;

    extensionText?: string;
}
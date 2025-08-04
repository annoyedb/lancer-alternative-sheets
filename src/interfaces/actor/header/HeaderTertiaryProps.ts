import type { Snippet } from "svelte";

export interface HeaderTertiaryProps
{
    renderOutsideCollapse?: Snippet;
    
    subText: string;
    
    headerStyle?: Array<string>;
    headerFontStyle?: Array<string>;
    subHeaderFontStyle?: Array<string>;
    borderStyle?: Array<string>;
    iconStyle?: Array<string>;
}
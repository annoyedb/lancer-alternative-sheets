import type { Snippet } from "svelte";

export interface HeaderTertiaryProps
{
    headerContentLeft?: Snippet;
    headerContentRight?: Snippet;
    renderOutsideCollapse?: Snippet;
    
    subText: string;
    
    headerStyle?: Array<string>;
    headerFontStyle?: Array<string>;
    subHeaderFontStyle?: Array<string>;
    borderStyle?: Array<string>;
    iconStyle?: Array<string>;
}
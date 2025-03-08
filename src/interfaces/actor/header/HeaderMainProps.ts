import type { Snippet } from "svelte";

export interface HeaderMainProps
{
    children?: any;
    headerContent?: Snippet;
    
    headerStyle?: Array<string>;
    borderStyle?: Array<string>;
    rootStyle?: Array<string>;
    collapseID?: string;
    collapse?: any;
    startCollapsed?: boolean;
    extensionText?: string;

    deleteOption?: boolean;
    deleteStyle?: Array<string>;
    deleteIconStyle?: Array<string>;
    deleteUUID?: string,
    deleteOnClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
    
    messageOption?: boolean;
    messageUUID?: string,

    spOption?: boolean;
    spCurrent?: number;
    spMax?: number;
    spTextStyle?: Array<string>;
    spIconStyle?: Array<string>;

    mountOption?: boolean;
    mountNames?: Array<string>;

    collapseAllOption?: boolean;
}
export interface HeaderMainProps
{
    children?: any;
    
    title: string;

    headerStyle?: Array<string>;
    headerFontStyle?: Array<string>;

    cursorStyle?: Array<string>;
    borderStyle?: Array<string>;
    rootStyle?: Array<string>;
    collapseID?: string;
    collapse?: any;
    startCollapsed?: Boolean;
    extensionText?: string;

    deleteOption?: Boolean;
    deleteStyle?: Array<string>;
    deleteIconStyle?: Array<string>;
    deleteUUID?: string,
    deleteOnClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
    
    messageOption?: Boolean;
    messageUUID?: string,

    spOption?: Boolean;
    spCurrent?: number;
    spMax?: number;
    spTextStyle?: Array<string>;
    spIconStyle?: Array<string>;

    mountOption?: Boolean;
    mountNames?: Array<string>;

    collapseAllOption?: Boolean;
}
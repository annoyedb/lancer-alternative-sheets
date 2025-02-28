import type { TooltipDirection } from "@/enums/TooltipDirection";
import type { Snippet } from "svelte";

export interface HeaderSecondaryProps
{
    children?: any;
    renderOutsideCollapse?: Snippet;
    
    title: string;

    itemID?: string;
    uuid?: string;
    path?: string;
    acceptTypes?: string;

    headerStyle?: Array<string>;
    headerFontStyle?: Array<string>;
    headerIconStyle?: Array<string>;
    borderStyle?: Array<string>;
    rootStyle?: Array<string>;
    collapseID?: string;
    collapse?: any;
    startCollapsed?: Boolean;

    spOption?: Boolean;
    spValue?: number;
    spTextStyle?: Array<string>;
    spIconStyle?: Array<string>;

    deleteOption?: Boolean;
    deleteUUID?: string,
    deleteOnClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
    deleteStyle?: Array<string>;

    messageOption?: Boolean;
    messageUUID?: string,
    messageType?: string,
    messageIndex?: number,
    messageStyle?: Array<string>;

    editOption?: Boolean;
    editStyle?: Array<string>;
    editIconStyle?: Array<string>;

    useEffectOption?: Boolean;
    useEffectTooltipHeader?: string;
    useEffectTooltip?: string;
    useEffectTooltipDirection?: string | TooltipDirection;
    useEffectStyle?: Array<string>;
    useEffectBackgroundStyle?: Array<string>;
    
    collapseAllOption?: Boolean;
}
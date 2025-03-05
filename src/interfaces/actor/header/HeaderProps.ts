import type { FlowClass } from "@/enums/FlowClass";
import type { TooltipDirection } from "@/enums/TooltipDirection";
import type { Snippet } from "svelte";

export interface HeaderProps
{
    title: string;

    itemID?: string;
    uuid?: string;
    path?: string;
    acceptTypes?: string;

    rootStyle?: Array<string>;

    headerStyle?: Array<string>;
    headerFontStyle?: Array<string>;
    headerIconStyle?: Array<string>;
    headerCursorStyle?: Array<string>;

    outerContent?: Snippet;
    outerContentWrapperStyle?: Array<string>;
    innerContent?: Snippet;
    innerContentWrapperStyle?: Array<string>;

    collapse?: any;
    collapseID?: string;
    startCollapsed?: boolean;
    
    collapseAllOption?: boolean;

    deleteOption?: boolean;
    deleteStyle?: Array<string>;
    deleteIconStyle?: Array<string>;
    deleteUUID?: string;
    deleteOnClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;

    messageOption?: boolean;
    messageStyle?: Array<string>;
    messageIconStyle?: Array<string>;
    messageUUID?: string;
    messageType?: string;
    messageIndex?: number;

    spOption?: boolean;
    spStyle?: Array<string>;
    spIconStyle?: Array<string>;
    spCurrent?: number;
    spMax?: number;

    mountOption?: boolean;
    mountNames?: Array<string>;

    editOption?: boolean;
    editStyle?: Array<string>;
    editIconStyle?: Array<string>;

    useEffectOption?: boolean;
    useEffectStyle?: Array<string>;
    useEffectTooltip?: string;
    useEffectTooltipHeader?: string;
    useEffectTooltipDirection?: TooltipDirection;
    useEffectBackgroundStyle?: Array<string>;
    useEffectClass?: FlowClass | string;

    rollDamage?: boolean;
    rollDamageStyle?: Array<string>;
    rollDamageValues?: Array<any>;
    rollDamageRanges?: Array<any>;
    rollDamageTooltip?: string;
    rollDamageTooltipHeader?: string;
    rollDamageTooltipDirection?: TooltipDirection;

    rollAttackOption?: boolean;
    rollAttackStyle?: Array<string>;
    rollAttackTooltip?: string;
    rollAttackTooltipHeader?: string;
    rollAttackTooltipDirection?: TooltipDirection;
}
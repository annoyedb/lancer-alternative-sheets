import type { TooltipDirection } from "@/enums/TooltipDirection";

export interface IconButtonProps
{
    style?: Array<string>;
    iconStyle?: Array<string>;
    tooltipDirection?: TooltipDirection;
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
}
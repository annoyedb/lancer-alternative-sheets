import type { TooltipDirection } from "@/enums/TooltipDirection";

export interface StatusBarProps
{
    currentValue: number,
    maxValue: number,
    currentValueAlt?: number,
    maxValueAlt?: number,
    name?: string,
    dataName?: string,
    styleClass?: string[],
    styleClassAlt?: string[],
    clipPath?: string,

    tooltip?: string;
    tooltipHeader?: string;
    tooltipDirection?: string | TooltipDirection;
}
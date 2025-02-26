import type { TooltipDirection } from "@/enums/TooltipDirection";

export interface StatComboProps
{
    icon: string;
    label: string;
    value: number;
    outerStyle?: Array<string>;
    innerStyle?: Array<string>;
    
    tooltip?: string;
    tooltipHeader?: string;
    tooltipDirection?: string | TooltipDirection;
}
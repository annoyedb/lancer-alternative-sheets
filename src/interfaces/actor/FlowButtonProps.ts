import type { FlowClass } from "@/enums/FlowClass"
import type { TooltipDirection } from "@/enums/TooltipDirection"

export interface FlowButtonProps
{
    name: string
    flowClass: FlowClass | string
    uuid?: string,
    flowType?: string, // If button class
    flowArgs?: any, // If button class
    dataPath?: string // If roll class
    style?: Array<string>
    backgroundStyle?: string
    textStyle?: string
    disableSlide?: Boolean
    
    tooltipHeader?: string,
    tooltip?: string,
    tooltipDirection?: string | TooltipDirection,
}
import type { FlowClass } from "@/enums/FlowClass"

export interface FlowButtonProps
{
    name: string
    flowClass: FlowClass | string
    tooltipHeader?: string,
    tooltip?: string,
    tooltipDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | "CENTER" | "TOP",
    uuid?: string,
    flowType?: string, // If button class
    flowArgs?: any, // If button class
    dataPath?: string // If roll class
    style?: Array<string>
    backgroundStyle?: string
    textStyle?: string
    disableSlide?: Boolean
}
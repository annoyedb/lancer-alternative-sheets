import type { FlowButtonProps } from "./FlowButtonProps";

export interface HexButtonProps extends FlowButtonProps
{
    value: number,
    sign?: boolean
    textStyle?: Array<string>
}
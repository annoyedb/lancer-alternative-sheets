import type { FlowButtonProps } from "./FlowButtonProps";

export interface HexButtonProps extends FlowButtonProps
{
    value: number,
    sign?: boolean,
    outerTextStyle?: Array<string>,
    innerTextStyle?: Array<string>,
    innerStyle?: Array<string>,
    buttonStyle?: Array<string>,
}
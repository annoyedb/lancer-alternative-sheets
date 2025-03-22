export interface StatusBarProps
{
    currentValue: number,
    maxValue: number,
    currentValueSecondary?: number,
    maxValueSecondary?: number,
    name?: string,
    dataName?: string,
    barStyle?: Array<string>,
    barStyleSecondary?: Array<string>,
    textStyle?: Array<string>,
    clipPath?: string,
}
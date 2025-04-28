export interface StatusBarProps
{
    currentValue: number,
    maxValue: number,
    currentValueSecondary?: number,
    maxValueSecondary?: number,
    currentValueTertiary?: number,
    maxValueTertiary?: number,
    name?: string,
    dataName?: string,
    barStyle?: Array<string>,
    barStyleSecondary?: Array<string>,
    barStyleTertiary?: Array<string>,
    textStyle?: Array<string>,
    clipPath?: string,
}
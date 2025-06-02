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
    barEditStyle?: Array<string>,
    barStyleSecondary?: Array<string>,
    barEditStyleSecondary?: Array<string>,
    barStyleTertiary?: Array<string>,
    barEditStyleTertiary?: Array<string>,
    textStyle?: Array<string>,
    clipPath?: string,

    editSecondary?: boolean;
    editTertiary?: boolean;
}
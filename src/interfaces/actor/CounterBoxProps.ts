export interface CounterBoxProps
{
    name?: string;
    usesValue: number;
    usesMax: number;
    path: string;
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }, ...args: any[]) => void;
    style?: Array<string>;
}
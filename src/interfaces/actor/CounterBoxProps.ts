export interface CounterBoxProps
{
    name: string,
    usesValue: number,
    usesMax: number,
    path: string,
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
}
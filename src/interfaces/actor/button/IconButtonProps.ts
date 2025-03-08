export interface IconButtonProps
{
    style?: Array<string>;
    iconStyle?: Array<string>;
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
}
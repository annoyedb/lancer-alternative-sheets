export interface IconButtonProps
{
    style?: Array<string>;
    iconStyle?: Array<string>;
    iconBackgroundStyle?: Array<string>;
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
}
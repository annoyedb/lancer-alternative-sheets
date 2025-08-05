export interface PointerClickProps
{
    onPointerClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, ...args: any[]) => void;
}
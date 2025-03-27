import type { Snippet } from "svelte";

export interface DragDropHandleProps
{
    children: Snippet,
    uuid: string,
    index: number,
    root: HTMLElement,
    
    style?: Array<string>,
    iconStyle?: Array<string>,
    data?: any,

    onDragStart?: (event: DragEvent, thisData: any) => void,
    onDrop?: (event: DragEvent, dropData: any, thisData: any) => void,
    onDropError?: (event: DragEvent, dropData: any) => void,
    onDelete?: (event: MouseEvent) => void,

    deleteDisabled?: boolean,
}
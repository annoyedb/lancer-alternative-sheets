import type { Snippet } from "svelte"

export interface ActionBoxProps
{
    children?: Snippet;
    flowButton?: Snippet;

    actions: Array<any>;
    path?: string;
    uuid?: string;
    
    editable?: boolean;
    editDetails?: boolean;

    collapseID?: string;
    startCollapsed?: boolean;

    /**
     * Optional event handler for when the user clicks on the left button component.
     * @param event 
     * @returns 
     */
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any) => void;

    /**
     * Optional parameter to disable the left button component.
     */
    disableLeftButton?: boolean;
}
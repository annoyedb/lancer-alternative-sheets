import type { Snippet } from "svelte"

export interface ActionBoxProps
{
    children?: Snippet
    flowButton?: Snippet

    actions: Array<any>
    path?: string
    uuid?: string,
    
    edit?: Boolean,
    editDetails?: Boolean,

    collapse?: any,
    collapseID?: string,
    startCollapsed?: Boolean,
}
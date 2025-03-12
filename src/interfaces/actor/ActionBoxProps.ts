import type { Snippet } from "svelte"

export interface ActionBoxProps
{
    children?: Snippet
    flowButton?: Snippet

    actions: Array<any>
    path?: string
    uuid?: string,
    
    editable?: boolean,
    editDetails?: boolean,

    collapseID?: string,
    startCollapsed?: boolean,
}
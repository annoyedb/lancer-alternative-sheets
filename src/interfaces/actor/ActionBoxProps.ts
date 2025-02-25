export interface ActionBoxProps
{
    actions: Array<any>
    path?: string
    uuid?: string,
    
    edit?: Boolean,
    editDetails?: Boolean,

    collapse?: any,
    collapseID?: string,
    startCollapsed?: Boolean,
}
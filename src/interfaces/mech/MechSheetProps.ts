export interface MechSheetProps extends ActorSheet.Data<ActorSheet.Options>
{    
    actor: any,
    collapse: any,
    deployables: any,
    document: any,
    effectCategories: Array<any>,
    effects: Array<any>,
    itemTypes: any,
    items: Array<any>,
    
    pilot: any,
    system: any,

    isActive: Boolean,
    isLimited: Boolean,
    isOwner: Boolean,

    dragDrop: DragDrop,
}
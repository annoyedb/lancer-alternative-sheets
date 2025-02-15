export interface MechSheetData extends ActorSheet.Data<ActorSheet.Options>
{
    root: any, // TODO: possibly (hopefully) unnecessary
    
    actor: any,
    collapse: any,
    deployables: any,
    effectCategories: Array<any>,
    effects: Array<any>,
    itemTypes: any,
    items: Array<any>,
    pilot: any,
    system: any,

    isActive: Boolean,
    isLimited: Boolean,
}
export interface MechSheetProps extends ActorSheet.Data<ActorSheet.Options>
{    
    actor: any,
    collapse: any,
    deployables: any,
    document: any,
    effect_categories: Array<any>,
    effects: Array<any>,
    itemTypes: any,
    items: Array<any>,
    
    pilot: any,
    system: any,

    is_active: boolean,
    limited: boolean,
    owner: boolean,
}
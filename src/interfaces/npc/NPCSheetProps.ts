export interface NPCSheetProps extends ActorSheet.Data<ActorSheet.Options>
{
    actor: any,
    collapse: any,
    deployables: any,
    document: any,
    effectCategories: Array<any>,
    effects: Array<any>,
    itemTypes: any,
    items: Array<any>,

    data: any,
    system: any,

    limited: boolean,
    owner: boolean,
}
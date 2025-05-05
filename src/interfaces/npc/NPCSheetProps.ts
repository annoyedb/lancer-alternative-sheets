export interface NPCSheetProps extends ActorSheet.Data<ActorSheet.Options>
{
    actor: any,
    collapse: any,
    deployables: any,
    document: any,
    effect_categories: Array<any>,
    effects: Array<any>,
    itemTypes: any,
    items: Array<any>,

    data: any,
    system: any,

    limited: boolean,
    owner: boolean,
}
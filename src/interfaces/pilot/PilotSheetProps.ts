export interface PilotSheetProps extends ActorSheet.Data<ActorSheet.Options>
{    
    actor: any,
    collapse: any,
    deployables: any,
    document: any,
    effect_categories: Array<any>,
    effects: Array<any>,
    itemTypes: any,
    items: Array<any>,
    
    system: any,

    limited: boolean,
    owner: boolean,

    pilotCache: Array<any>,
    rawID: string,
    vaultID: string,
}
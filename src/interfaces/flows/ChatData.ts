export interface ChatData
{
    title: string;
    description: string;
    trigger: string;
    effect: string;
    onAttack: string;
    onHit: string;
    onCrit: string;
    attackBonus: number; // NPCs only
    accuracyBonus: number; // NPCs only
    tags: Array<any>;
    color: string;
}
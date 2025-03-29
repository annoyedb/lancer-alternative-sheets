import type { Damage } from "../models/bits/damage";

export class AppliedDamage
{
    public Kinetic: number;
    public Energy: number;
    public Explosive: number;
    public Burn: number;
    public Heat: number;
    public Variable: number;

    public constructor(damageData: Damage[])
    {
        this.Kinetic = this.sum_damage(damageData, "Kinetic");
        this.Energy = this.sum_damage(damageData, "Energy");
        this.Explosive = this.sum_damage(damageData, "Explosive");
        this.Burn = this.sum_damage(damageData, "Burn");
        this.Heat = this.sum_damage(damageData, "Heat");
        this.Variable = this.sum_damage(damageData, "Variable");
    }

    public sum_damage(damageData: Damage[], damageType: any): number
    {
        return damageData.reduce((sum, d) =>
        {
            return sum + (d.type === damageType ? parseInt(d.val) : 0);
        }, 0);
    }
}

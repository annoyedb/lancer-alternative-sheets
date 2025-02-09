import { DamageType } from "../enums";
import { Damage } from "../models/bits/damage";
export declare class AppliedDamage {
    Kinetic: number;
    Energy: number;
    Explosive: number;
    Burn: number;
    Heat: number;
    Variable: number;
    constructor(damageData: Damage[]);
    sum_damage(damageData: Damage[], damageType: DamageType): number;
}

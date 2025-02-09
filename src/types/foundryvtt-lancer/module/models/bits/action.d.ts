import { ActivationType } from "../../enums";
import { PackedActionData } from "../../util/unpacking/packed-types";
import { DamageData } from "./damage";
import { RangeData } from "./range";
declare const fields: any;
export interface ActionData {
    lid: string;
    name: string;
    activation: ActivationType;
    cost: number;
    frequency: string;
    init: string;
    trigger: string;
    terse: string;
    detail: string;
    pilot: boolean;
    mech: boolean;
    tech_attack: boolean;
    heat_cost: number;
    synergy_locations: string[];
    damage: DamageData[];
    range: RangeData[];
}
export declare class ActionField extends fields.SchemaField {
    constructor(options?: {});
}
export declare function unpackAction(data: PackedActionData): ActionData;
export declare function repairActivationType(activation: string): ActivationType;
export {};

import { PackedCounterData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface CounterData {
    lid: string;
    name: string;
    min: number;
    max: number | null;
    default_value: number;
    value: number;
}
export declare class CounterField extends fields.SchemaField {
    constructor(options?: {});
    static migrateData(value: any): void;
    static bound_val(value: CounterData, sub_val: number): number;
    /** @inheritdoc */
    clean(value: CounterData, data: any, options: any): CounterData;
    /** @override */
    _validateType(value: CounterData): void;
}
export declare function unpackCounter(data: PackedCounterData): CounterData;
export {};

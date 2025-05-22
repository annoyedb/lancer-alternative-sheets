import type { CounterBoxType } from "@/enums/CounterBoxType";

export interface CounterBoxProps
{
    // Optional label attached to the counter
    text?: string;
    // Type of counter box
    type: CounterBoxType;
    // Value of the counter
    usesValue: number;
    // Maximum value of the counter
    usesMax: number;
    // Counter data path
    path: string;
    // Optional counter style
    style?: Array<string>;
}
import type { CounterBoxProps } from "@/interfaces/actor/CounterBoxProps";

/**
 * Interface representing a weapon with the Loaded property.
 */
export interface LoadedBoxProps extends Omit<CounterBoxProps, "text" | "type" | "usesValue" | "usesMax">
{
    /**
     * The weapon in question. Should have a 'type' and 'system' identifier in the root
     */
    item: any,
}
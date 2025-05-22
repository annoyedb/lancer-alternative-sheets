import type { CounterBoxProps } from "@/interfaces/actor/CounterBoxProps";

/**
 * Interface representing NPC features with that can be recharged.
 */
export interface ChargedBoxProps extends Omit<CounterBoxProps, "text" | "type" | "usesValue" | "usesMax">
{
    /**
     * The feature in question. Should have a 'type' and 'system' identifier in the root
     */
    item: any,
}
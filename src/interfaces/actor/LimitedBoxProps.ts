import type { CounterBoxProps } from "@/interfaces/actor/CounterBoxProps";

export interface LimitedBoxProps extends Omit<CounterBoxProps, "text" | "type">
{

}
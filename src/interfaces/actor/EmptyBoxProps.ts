import type { AcceptType } from "@/enums/AcceptType";

export interface EmptyBoxProps
{
    label: string;
    subLabel: string;
    type?: AcceptType;
    path?: string;
}
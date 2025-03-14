import type { TooltipDirection } from "@/enums/TooltipDirection";

export interface TooltipSettings
{
    text?: string;
    direction: TooltipDirection | string;
    cssClass?: string;
    locked?: boolean;
    content?: HTMLElement;
}

export interface LockedTooltipSettings
{
    position?: {top: string, left: string, right: string, bottom: string};
    text?: string;
    options: { cssClass: any[] };
}
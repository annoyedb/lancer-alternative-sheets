import type { CustomFlagContentType } from "@/enums/CustomFlagContentType";

export interface CustomFlagContent
{
    min: number;
    max: number;
    value: number;
}

export interface CustomFlag
{
    id: string;
    name: string;
    contentType: CustomFlagContentType;
    content: CustomFlagContent;
    color: string;
    icon: string;
    tooltip: string;
    showInSidebar: boolean;
}

export interface CustomFlagData
{
    [id: string]: CustomFlag;
}

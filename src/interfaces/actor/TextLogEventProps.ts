import type { TextLogHook } from "@/enums/TextLogHook";

export interface TextLogEventProps
{
    logText?: string;
    logType?: TextLogHook;
    logTypeReset?: TextLogHook;
}
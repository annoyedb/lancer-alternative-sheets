import type { TextConsoleHook } from "@/enums/TextConsoleHook";

export interface TextLogEventProps
{
    logText?: string;
    logType?: TextConsoleHook;
    logTypeReset?: TextConsoleHook;
}
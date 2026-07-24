import type { TextConsoleHook } from "@/enums/TextConsoleHook";
import type { TextLogIntro } from "@/enums/TextLogIntro";

export interface TextLogProps
{
    style: Array<string>;
    runIntro: boolean;
    introType: TextLogIntro;
    uuid: string;
    hookID: TextConsoleHook;
    hookResetID: TextConsoleHook;
}
import type { TextLogHook } from "@/enums/TextLogHook";
import type { TextLogIntro } from "@/enums/TextLogIntro";

export interface TextLogProps
{
    style: Array<string>;
    introType: TextLogIntro;
    uuid: string;
    hookID: TextLogHook;
    hookResetID: TextLogHook;
}
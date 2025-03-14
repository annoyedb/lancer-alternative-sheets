import type { Snippet } from "svelte";

export interface SvelteTooltipProps
{
    content: Snippet;

    unrenderCallback?: () => void;
}
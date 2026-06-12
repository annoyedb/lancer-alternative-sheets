<script lang="ts">
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        children,

        text,
        extensionText,
        textStyle,
        disableCmdline,
        disableExtension,
        disableCursor
    }: TerminalTextProps = $props();
</script>
<script lang="ts" module>
    export const FLOW_BUTTON_STYLE: string = " -padding1-r -padding0-tb -height5 -letterspacing0 la-text-header la-prmy-header ";
</script>

<div class="la-terminaltext -whitespacenowrap -textoverflowellipsis -textalignleft
        {textStyle?.join(' ')}"
><!--
--->{#if !disableCmdline}<span class="la-cmdline -bold -fadein">>//: </span>{/if}<!--
---><span>{#if children}{@render children()}{/if}{text}</span><!--
--->{#if !disableExtension}<span class="la-extension -fontface-stylized -lower -fadein">{extensionText || `--${getLocalized("LA.scan.label")}`}</span>{/if}<!--
--->{#if !disableCursor}<span class="la-cursor -fontface-stylized -fadein"></span>{/if}
</div>
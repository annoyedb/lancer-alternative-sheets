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

    // const derivedCursorStyle = textStyle?.find(style => style.startsWith("la-text-"))?.replace("la-text-", "la-anim-");
</script>
<script lang="ts" module>
    export const FLOW_BUTTON_STYLE: string = " -padding1-r -padding0-tb -height3 -letterspacing0 la-text-header la-anim-header ";
</script>

<div class="la-terminaltext -whitespacenowrap -textalignleft {textStyle?.join(' ')}"><!--
--->{#if !disableCmdline}<span class="la-cmdline -fadein">>//: </span>{/if}<!--
---><span class="">{#if children}{@render children()}{/if}{text}</span><!--
--->{#if !disableExtension}<span class="la-extension -lower -fadein">{extensionText || `--${getLocalized("LA.scan.label")}`}</span>{/if}<!--
--->{#if !disableCursor}<span class="la-cursor -fadein"></span>{/if}
</div>
<script lang="ts">
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";

    const {
        text,
        extensionText,
        textStyle,
        disableTerminal,
        disableExtension,
        disableCursor
    }: TerminalTextProps = $props();

    // const derivedCursorStyle = textStyle?.find(style => style.startsWith("la-text-"))?.replace("la-text-", "la-anim-");
</script>
<script lang="ts" module>
    export const FLOW_BUTTON_STYLE: string = " -padding1-r -padding0-tb -height3 -letterspacing0 la-text-header la-anim-header ";
</script>

<div class="-whitespacenowrap -textalignleft {textStyle?.join(' ')}"><!--
--->{#if !disableTerminal}<span class="la-terminal -fadein">>//: </span>{/if}<!--
---><span class="">{text}</span><!--
--->{#if !disableExtension}<span class="la-extension -lower -fadein">{extensionText}</span>{/if}<!--
--->{#if !disableCursor}<span class="la-cursor -fadein"></span>{/if}
</div>
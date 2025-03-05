<script type="ts">
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import { randomExtension } from "@/scripts/helpers";

    const {
        text: name,
        textStyle,
        disableTerminal,
        disableExtension,
        disableCursor
    }: TerminalTextProps = $props();
</script>

<div class="-padding0-tb -height3 -whitespacenowrap -padding1-r -textalignleft -letterspacing0 {textStyle?.join(' ')}"><!--
--->{#if !disableTerminal}<span class="la-terminal -fadein">>//: </span>{/if}<!--
---><span class="">{name}</span><!--
--->{#if !disableExtension}<span class="la-extension -lower -fadein">{randomExtension()}</span>{/if}<!--
--->{#if !disableCursor}<span class="la-cursor -fadein"></span>{/if}
</div>
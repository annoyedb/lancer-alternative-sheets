<script lang="ts">
    import type { MountNamesProps } from "@/interfaces/actor/decoration/MountNamesProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        mountNames,
        style,
        textStyle,

        logText,
        logType,
        logTypeReset,
    }: MountNamesProps & TextLogEventProps = $props();

    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.rollAttack.tooltip");
</script>

{#if mountNames.length}
<div 
    class="la-combine-v la-text-header -gap0 -aligncenter -fontsize0 -height3 -lineheight0 {style?.join(' ')}"
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
>
{#each mountNames as mountName}
    <span class="-widthfull -textalignright {textStyle?.join(' ')}">{mountName}</span>
{/each}
</div>
{/if}
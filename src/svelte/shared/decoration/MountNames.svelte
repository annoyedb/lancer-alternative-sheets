<script lang="ts">
    import type { MountNamesProps } from "@/interfaces/actor/decoration/MountNamesProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";
    import { getActorContext } from "@/scripts/context";

    const {
        mountNames,
        style,
        textStyle,

        logText,
        logging,
    }: MountNamesProps & TextLogEventProps = $props();
    const actorUuid = getActorContext()?.uuid;

    const log = $derived(logText || getLocalized("LA.flow.rollAttack.tooltip"));
</script>

{#if mountNames.length}
<div role="none"
    class="la-flexcol la-text-header -gap0 -aligncenter -fontsizesmall -height5 -lineheight2 {style?.join(' ')}"
    onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
    onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
>
{#each mountNames as mountName}
    <span class="-widthfull -textalignright {textStyle?.join(' ')}">{mountName}</span>
{/each}
</div>
{/if}
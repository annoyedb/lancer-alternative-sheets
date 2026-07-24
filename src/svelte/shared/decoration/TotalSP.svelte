<script lang="ts">
    import type { TotalSPProps } from "@/interfaces/actor/decoration/TotalSPProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";
    import { getActorContext } from "@/scripts/context";
    import { H2_ICON_SIZE, H2_TEXT_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";

    const {
        value,
        max,
        style,
        textStyle,
        iconStyle,

        logText,
        logging,
    }: TotalSPProps & TextLogEventProps = $props();
    const actorUuid = getActorContext()?.uuid;

    const log = $derived(logText || getLocalized("LA.mech.system.points.total.tooltip"));
</script>

<div role="none"
    class="la-flexrow -aligncenter -height4 {style?.join(' ') || H2_TEXT_SIZE}"
    onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
    onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
>
    <span class="{textStyle?.join(' ')}">
    {#if max}
        {value} / {max}
    {:else}
        {value}
    {/if}
    </span>
    <i class="cci cci-system-point {iconStyle?.join(' ') || H2_ICON_SIZE}"></i>
</div>
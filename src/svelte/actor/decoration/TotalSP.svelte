<script lang="ts">
    import type { TotalSPProps } from "@/interfaces/actor/decoration/TotalSPProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { H2_ICON_SIZE, H2_TEXT_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";

    const {
        value,
        max,
        style,
        textStyle,
        iconStyle,

        logText,
        logType,
        logTypeReset,
    }: TotalSPProps & TextLogEventProps = $props();

    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.mech.system.points.total.tooltip");
</script>

<div class="la-combine-h -aligncenter -height2 {style?.join(' ') || H2_TEXT_SIZE}"
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
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
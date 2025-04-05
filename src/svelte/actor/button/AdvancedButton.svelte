<script lang="ts">
    import { getAdvancedState, setAdvancedState } from "@/scripts/store/advanced";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { getLocalized } from "@/scripts/helpers";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";

    const {
        uuid,

        style,
        iconStyle,

        logText,
        logType,
        logTypeReset,

        tooltip,
        tooltipHeader,
        tooltipClass,
        tooltipDirection,
    }: {uuid: string} & IconButtonProps & TextLogEventProps & TooltipProps = $props();
    let advancedOptions = $derived(getAdvancedState(uuid));

    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.advanced.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.advanced.tooltip");

    function toggleAdvancedOptions(event: MouseEvent)
    {
        event.stopPropagation();
        setAdvancedState(uuid, !advancedOptions);
    }
</script>

{#if uuid}
<button type="button"
    class="{style?.join(' ') || '-fontsize3'}"
    aria-label={getLocalized("LA.advanced.tooltip")}
    data-tooltip={tipEnabled ? tip : undefined }
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.LEFT}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={(event) => toggleAdvancedOptions(event)}
>
    <i class="mdi {iconStyle?.join(' ') || '-fontsize5 la-text-header'}
        {advancedOptions ? "mdi-toggle-switch" : "mdi-toggle-switch-off"}"
    ></i>
</button>
{/if}
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        uuid,

        style,
        iconStyle,
        onClick,

        tooltipDirection,

        logText,
        logType,
        logTypeReset,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps = $props();

    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.delete.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.delete.tooltip");
</script>
<script lang="ts" module>
    const _STYLE = "-glow-header -glow-primary-hover -fontsize2";
</script>

<button type="button"
    class="la-delete {style?.join(' ') || _STYLE}" 
    data-uuid={uuid}
    data-tooltip={tipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={onClick ? (event) => onClick(event) : null}
    aria-label={getLocalized("LA.delete.tooltip")}
>
    <i class="mdi mdi-close-circle {iconStyle?.join(' ')}"></i>
</button>
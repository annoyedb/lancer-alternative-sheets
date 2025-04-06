<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";

    const {
        uuid,
        type,
        index,
        flowClass,
        rank,

        style,
        iconStyle,
        onClick,
        
        tooltipEnabled,
        tooltipDirection,

        logText,
        logType,
        logTypeReset,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps = $props();

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.chat.tooltip");
</script>
<script lang="ts" module>
    const _STYLE = "-glow-header -glow-primary-hover -fontsize2";
</script>

<button type="button"
    class="{flowClass} {style?.join(' ') || _STYLE}"
    data-uuid={uuid}
    data-type={type}
    data-index={index}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-rank={rank}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={onClick ? (event) => onClick(event) : null}
    aria-label={getLocalized("LA.delete.tooltip")}
>
    <i class="mdi mdi-message {iconStyle?.join(' ')}"></i>
</button>
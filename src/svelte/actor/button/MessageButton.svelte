<!-- TODO: refactor into GlyphButton -->
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";

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
        tooltipClass,
        tooltipTheme,

        logText,
        logType,
        logTypeReset,

        onPointerEnter,
        onPointerLeave,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.chat.tooltip");

    function handleOnPointerEnter(event: PointerEvent) 
    {
        if (onPointerEnter)
            onPointerEnter();

        if (logging)
            sendToLog(event, log, logType);
        else
            return undefined;
    }

    function handleOnPointerLeave(event: PointerEvent) 
    {
        if (onPointerLeave)
            onPointerLeave();

        if (logging)
            resetLog(event, logTypeReset);
        else
            return undefined;
    }
</script>
<script lang="ts" module>
    const _STYLE = "la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover -fontsize2";
</script>

<button type="button"
    class="{flowClass} {style?.join(' ') || _STYLE}"
    data-uuid={uuid}
    data-type={type}
    data-index={index}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-rank={rank}
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ handleOnPointerEnter }
    onpointerleave={ handleOnPointerLeave }
    onclick={onClick ? (event) => onClick(event) : null}
    aria-label={getLocalized("LA.delete.tooltip")}
>
    <i class="mdi mdi-message {iconStyle?.join(' ')}"></i>
</button>
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        flowClass,
        path,

        tooltipEnabled,
        tooltipDirection,

        style,
        iconStyle,
        
        logText,
        logType,
        logTypeReset,

        onPointerEnter,
        onPointerLeave,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.edit.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.edit.tooltip");

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
    export const HEADER_SECONDARY_STYLE = "-glow-header -glow-primary-hover -fontsize2";
    const _STYLE = "-glow-header -glow-primary-hover -fontsize2";
</script>

<button type="button"
    class="la-combine-v {style?.join(' ') || _STYLE}
        {flowClass || 'lancer-context-menu'}"
    data-path={path}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ handleOnPointerEnter }
    onpointerleave={ handleOnPointerLeave }
    aria-label={getLocalized("LA.edit.tooltip")}
>
<i class="fas fa-ellipsis-v {iconStyle?.join(' ')}"></i>
</button>
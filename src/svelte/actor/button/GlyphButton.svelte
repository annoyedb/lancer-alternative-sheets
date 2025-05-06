<script lang="ts">
    import type { Snippet } from "svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { FlowButtonProps } from "@/interfaces/actor/button/FlowButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";

    const {
        children,

        style,
        onClick,

        flowClass,
        uuid,
        path,
        action,
        actionValue,
        disabled,
        
        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipDirection,

        logText,
        logType,
        logTypeReset,
        
        onPointerEnter,
        onPointerLeave,
    }: {children?: Snippet} & FlowButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();

    const tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : undefined;
    const logging = logType && logTypeReset && logText;

    function handleOnPointerEnter(event: PointerEvent) 
    {
        if (onPointerEnter)
            onPointerEnter();

        if (logging)
            sendToLog(event, logText, logType);
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

<button type="button"
    class="
        {style?.join(' ')}
        {flowClass}"
    data-uuid={uuid}
    data-path={path}
    data-action={action}
    data-action-value={actionValue}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection}
    onpointerenter={ handleOnPointerEnter }
    onpointerleave={ handleOnPointerLeave }
    onclick={onClick}
    aria-label={tooltip}
    disabled={disabled}
>
{#if children}
    {@render children()}
{/if}
</button>
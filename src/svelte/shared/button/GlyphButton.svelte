<script lang="ts">
    import type { Snippet } from "svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";
    import { getActorContext } from "@/scripts/context";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";

    type GlyphButtonProps = {
        children?: Snippet
    }

    const {
        children,
        
        style,
        onClick,

        flowClass,
        uuid,
        type,
        index,
        rank,
        path,
        action,
        actionValue,
        disabled,
        
        tooltipEnabled,
        tooltip,
        tooltipClass,
        tooltipTheme,
        tooltipHeader,
        tooltipDirection,

        logText,
        logging: loggingEnabled,

        onPointerEnter,
        onPointerLeave,
    }: GlyphButtonProps & IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();
    const actorUuid = getActorContext()?.uuid;

    const tip = $derived(tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : undefined);
    const logging = $derived(loggingEnabled && logText);

    function handleOnPointerEnter(event: PointerEvent)
    {
        if (onPointerEnter)
            onPointerEnter();

        if (logging)
            sendToTextConsole(event, logText!, actorUuid!);
        else
            return undefined;
    }

    function handleOnPointerLeave(event: PointerEvent)
    {
        if (onPointerLeave)
            onPointerLeave();

        if (logging)
            resetTextConsole(event, actorUuid!);
        else
            return undefined;
    }
</script>

<button type="button"
    class="
        {style?.join(' ')}
        {flowClass}"
    data-uuid={uuid}
    data-type={type}
    data-index={index}
    data-rank={rank}
    data-path={path}
    data-action={action}
    data-action-value={actionValue}
    data-tooltip={tooltipEnabled && !disabled ? tip : undefined }
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
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
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";

    import { H2_ICON_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import { CLICKABLE_HOVER } from "@/svelte/shared/button/Button.svelte";

    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";

    const {
        style,
        iconStyle,
        iconBackgroundStyle,

        flowClass,
        disabled,
        path,
        uuid,
        powerIndex,

        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,
        
        logText,
        logType,
        logTypeReset,

        onClick,
        onPointerEnter,
        onPointerLeave,
    } : IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.effect.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.effect.tooltip");

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
    const _DEFAULT_BACKGROUND = `${H2_ICON_SIZE} la-text-scrollbar-secondary -padding0-l`
    const _DEFAULT_FOREGROUND = `${H2_ICON_SIZE}`
</script>

<button type="button"
    class="-positionrelative
        {style?.join(' ')}
        {flowClass || FlowClass.SendEffectToChat}"
    style="z-index: 1;"
    data-uuid={uuid}
    data-path={path}
    data-power-index={powerIndex}
    data-tooltip={tooltipEnabled && !disabled ? tip : undefined }
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ handleOnPointerEnter }
    onpointerleave={ handleOnPointerLeave }
    aria-label={tooltip || getLocalized("LA.flow.effect.tooltip")}
    disabled={disabled || false}
    onclick={onClick ? (event) => onClick(event) : undefined }
>
    <i 
        class="
            {disabled ? "" : CLICKABLE_HOVER}
            {iconStyle?.join(' ') || _DEFAULT_FOREGROUND}"
    ></i>
{#if !disabled}
    <i class="fal fa-dice-d20 -positionabsolute -left0 
            {iconBackgroundStyle?.join(' ') || _DEFAULT_BACKGROUND}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
<!-- TODO: refactor into GlyphButton -->
<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    
    import { CLICKABLE_HOVER } from "@/svelte/shared/button/Button.svelte";
    import { H3_ICON_SIZE } from "@/svelte/shared/header/HeaderTertiary.svelte";

    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";

    const {
        style,
        iconStyle,
        iconBackgroundStyle,
        
        flowClass,
        disabled,
        
        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,

        logText,
        logType,
        logTypeReset,

        onPointerEnter,
        onPointerLeave,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();
    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.rollAttack.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.rollAttack.tooltip");

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
    const _DEFAULT_I_BACKGROUND = `${H3_ICON_SIZE} la-text-scrollbar-secondary`;
    const _DEFAULT_I_FOREGROUND = `${H3_ICON_SIZE}`;
</script>

<button type="button" 
    class="-positionrelative
        {style?.join(' ')}
        {flowClass || FlowClass.RollAttack}"
    data-tooltip={tooltipEnabled && !disabled ? tip : undefined }
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
    data-tooltip-direction={tooltipDirection || TooltipDirection.LEFT}
    onpointerenter={ handleOnPointerEnter }
    onpointerleave={ handleOnPointerLeave }
    aria-label={tooltip || getLocalized("LA.flow.rollAttack.tooltip")}
    disabled={disabled || false}
>
    <i 
        class="
            {disabled ? "" : CLICKABLE_HOVER}
            {iconStyle?.join(' ') || _DEFAULT_I_FOREGROUND}"
    ></i>
{#if !disabled}
    <i 
        class="fal fa-dice-d20 -positionabsolute -left0 
            {iconBackgroundStyle?.join(' ') || _DEFAULT_I_BACKGROUND}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
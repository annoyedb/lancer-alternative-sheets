<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import { CLICKABLE_HOVER } from "@/svelte/actor/button/Button.svelte";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        style,
        iconStyle,
        iconBackgroundStyle,

        flowClass,
        disabled,
        path,
        uuid,

        tooltip,
        tooltipClass,
        tooltipHeader,
        tooltipDirection,
        onClick,
    } : IconButtonProps & ButtonProps & TooltipProps= $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.effect.tooltip"), tooltipHeader);
    const defaultIconBackgroundStyle = `${H2_ICON_SIZE} la-text-scrollbar-secondary -padding0-l`
    const defaultIconStyle = `${H2_ICON_SIZE}`
</script>

<!-- (#2) -->
<!-- svelte-ignore event_directive_deprecated -->
<button type="button"
    class="
        {style?.join(' ')}
        {flowClass || FlowClass.SendEffectToChat}"
    data-uuid={uuid}
    data-path={path}
    data-tooltip={disabled ? undefined : tip}
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    aria-label={tooltip || getLocalized("LA.effect.tooltip")}
    disabled={disabled || false}
    on:click={onClick ? (event) => onClick(event) : undefined}
>
    <i 
        class="
            {disabled ? "" : CLICKABLE_HOVER}
            {iconStyle?.join(' ') || defaultIconStyle}"
    ></i>
{#if !disabled}
    <i class="fal fa-dice-d20 -positionabsolute -left0 
            {iconBackgroundStyle?.join(' ') || defaultIconBackgroundStyle}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { CLICKABLE_HOVER } from "@/svelte/actor/button/Button.svelte";
    import { H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";

    const {
        style,
        iconStyle,
        iconBackgroundStyle,
        
        flowClass,
        disabled,
        
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
    }: IconButtonProps & ButtonProps & TooltipProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.rollAttack.tooltip"), tooltipHeader);
    const defaultIconBackgroundStyle = `${H3_ICON_SIZE} la-text-scrollbar-secondary`
    const defaultIconStyle = `${H3_ICON_SIZE}`
</script>

<button type="button" 
    class="
        {style?.join(' ')}
        {flowClass || FlowClass.RollAttack}"
    data-tooltip={disabled ? undefined : tip}
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.LEFT}
    aria-label={tooltip || getLocalized("LA.flow.rollAttack.tooltip")}
    disabled={disabled || false}
>
    <i 
        class="
            {disabled ? "" : CLICKABLE_HOVER}
            {iconStyle?.join(' ') || defaultIconStyle}"
    ></i>
{#if !disabled}
    <i 
        class="fal fa-dice-d20 -positionabsolute -left0 
            {iconBackgroundStyle?.join(' ') || defaultIconBackgroundStyle}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
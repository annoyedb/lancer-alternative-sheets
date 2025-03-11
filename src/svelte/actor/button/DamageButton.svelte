<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { WeaponProps } from "@/interfaces/actor/button/WeaponProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import DamageArray from "@/svelte/actor/DamageArray.svelte";
    import RangeArray from "@/svelte/actor/RangeArray.svelte";

    const {
        damage,
        range,

        style,
        iconBackgroundStyle,

        flowClass,
        disabled,

        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        
        textStyle,
    }: WeaponProps & IconButtonProps & ButtonProps & TooltipProps & {textStyle?: Array<string>} = $props();

    let tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.rollDamage.tooltip"), tooltipHeader);
    const hasAllWeaponProperties = damage?.length && range?.length;
    const rollable = (!disabled && (damage?.length > 0));

    const defaultIconBackgroundStyle = `-positionabsolute -fontsize9 la-text-scrollbar-secondary`;
</script>

<button type="button"
    class="la-properties la-combine-v -fontsize3 la-anim-accent
        {hasAllWeaponProperties ? "-divider" : ""} 
        {style?.join(' ')}
        {flowClass || FlowClass.RollDamage}"
    data-tooltip={rollable ? tip : undefined}
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    disabled={!rollable}
>
    <!-- Generated Range -->
{#if range}
    <RangeArray
        ranges={range}
        style={textStyle}
    />
{/if}
    <!-- Generated Damage -->
{#if damage}
    <DamageArray
        damages={damage}
        style={[...textStyle || [], disabled ? "" : "-glow-header -glow-primary-hover"]}
    />
{/if}
{#if !disabled && damage?.length}
    <i 
        class="fal fa-dice-d20 
            {iconBackgroundStyle?.join(' ') || defaultIconBackgroundStyle}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
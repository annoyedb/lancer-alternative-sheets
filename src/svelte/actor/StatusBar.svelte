<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { StatusBarProps } from "@/interfaces/actor/StatusBarProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";


    const {
        currentValue,
        maxValue,
        currentValueSecondary,
        maxValueSecondary,
        name,
        dataName,
        barStyle,
        barStyleSecondary,
        textStyle,
        clipPath,

        tooltip,
        tooltipHeader,
        tooltipDirection
    } : StatusBarProps & TooltipProps = $props();

    const tipEnabled = getMechSheetTipEnabled();
    const tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>

<div class="la-statusbar la-combine-h -fontsize1 -gap2 {textStyle?.join(' ')}">
    {#if name}
    <span class="la-damage__span -fontsize0 -flexbasis13 -textalignright"
        data-tooltip={tipEnabled ? tip : undefined}
        data-tooltip-class="clipped-bot la-tooltip"
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    ><!--
    --->{name}<!--
---></span>
    {/if}
    <div class="la-bar-h la-bckg-bar-back -flex1 {clipPath}">
        <div class="la-bar-h-progress la-combine-h">
            <input class="la-bar-h-progress__input -flex1 {textStyle?.join(' ')}"
                type="number" 
                name="{dataName}"
                data-dtype="Number" 
                value="{currentValue}">
            <span class="la-bar-h-progress__span -flex0">/</span>
            <span class="la-bar-h-progress__span -flex1">{maxValue}</span>
        </div>
        <div class="la-bar-h-progress la-bar-h-current {barStyle?.join(" ")}"
            style="--percent:{currentValue / maxValue * 100}%"></div>
        {#if currentValueSecondary && maxValueSecondary}
        <div class="la-tempvalue la-bar-h-progress la-bar-h-current {barStyleSecondary?.join(" ")}"
            style="--percent:{currentValueSecondary / maxValueSecondary * 100}%"></div>
        {/if}
    </div>
</div>
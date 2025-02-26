<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { StatusBarProps } from "@/interfaces/actor/StatusBarProps";


    const {
        currentValue,
        maxValue,
        currentValueAlt,
        maxValueAlt,
        name,
        dataName,
        styleClass,
        styleClassAlt,
        clipPath,

        tooltip,
        tooltipHeader,
        tooltipDirection
    } : StatusBarProps = $props();

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>

<div class="la-statusbar la-combine-h -fontsize1 -gap2">
    {#if name}
    <span class="la-damage__span -fontsize0 -flexbasis13 -textalignright"
        data-tooltip={tip}
        data-tooltip-class="clipped-bot la-tooltip"
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    ><!--
    --->{name}<!--
---></span>
    {/if}
    <div class="la-bar-h la-bckg-bar-back -flex1 {clipPath}">
        <div class="la-bar-h-progress la-combine-h">
            <input class="la-bar-h-progress__input -flex1"
                type="number" 
                name="{dataName}"
                data-dtype="Number" 
                value="{currentValue}">
            <span class="la-bar-h-progress__span -flex0">/</span>
            <span class="la-bar-h-progress__span -flex1">{maxValue}</span>
        </div>
        <div class="la-bar-h-progress la-bar-h-current {styleClass?.join(" ")}"
            style="--percent:{currentValue / maxValue * 100}%"></div>
        {#if currentValueAlt && maxValueAlt}
        <div class="la-tempvalue la-bar-h-progress la-bar-h-current {styleClassAlt?.join(" ")}"
            style="--percent:{currentValueAlt / maxValueAlt * 100}%"></div>
        {/if}
    </div>
</div>
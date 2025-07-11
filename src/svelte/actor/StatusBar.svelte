<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { StatusBarProps } from "@/interfaces/actor/StatusBarProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { handleRelativeDataInput } from "@/scripts/helpers";

    const {
        currentValue,
        maxValue,
        currentValueSecondary,
        maxValueSecondary,
        currentValueTertiary,
        maxValueTertiary,
        name,
        dataName,
        barStyle,
        barEditStyle,
        barStyleSecondary,
        barEditStyleSecondary,
        barStyleTertiary,
        barEditStyleTertiary,
        textStyle,
        clipPath,
        editSecondary,
        editTertiary,

        tooltipEnabled,
        tooltipClass,
        tooltipTheme,
        tooltipDirection,
        tooltip,
        tooltipHeader,
    } : StatusBarProps & TooltipProps = $props();
    let editing = $state(false);

    const tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : undefined;
</script>

<div class="la-statusbar la-combine-h -fontsize1 -gap2 {textStyle?.join(' ')}">
    {#if name}
    <span class="la-damage__span -fontsize0 -flexbasis13 -textalignright"
        data-tooltip={tooltipEnabled ? tip : undefined}
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    ><!--
    --->{name}<!--
---></span>
    {/if}
    <div class="la-bar-h la-bckg-darken-3 -flex1 -positionrelative -widthfull -height1 -overflowhidden {clipPath}">
        <div class="la-bar-h-progress la-combine-h -widthfull -heightfull">
            <input type="number" 
                class="la-bar-h-progress__input -widthfull -heightfull -positionrelative -textaligncenter 
                    {editing ? textStyle?.join(' ') : "la-text-transparent"}"
                name="{dataName}"
                data-dtype="Number" 
                value="{currentValue}"
                onfocus={(event) => {event.currentTarget.select(); editing=true;}}
                onblur={() => {editing=false;}}
                onchange={(event) => handleRelativeDataInput(event, currentValue)}
            >
            <span 
                class="la-bar-h-progress__span -lineheight1 -positionabsolute -pointerdisable 
                    {editing ? "-visibilityhidden" : ""}"
            >
                {currentValue}/{maxValue}
            </span>
        </div>
        <div 
            class="la-bar-h-progress la-bar-h-current -positionabsolute -top0 -heightfull 
                {editing && barEditStyle
                    ? `${barEditStyle?.join(" ")} -pulse-bckg-prmy -fast` 
                    : barStyle?.join(" ")}"
            style="--la-percent:{currentValue / maxValue * 100}%"
        ></div>
        {#if currentValueSecondary && maxValueSecondary}
        <div 
            class="la-bar-h-progress -secondary la-bar-h-current -positionabsolute -top0 -heightfull 
                {editSecondary && barEditStyleSecondary 
                    ? `${barEditStyleSecondary?.join(" ")} -pulse-bckg-prmy -fast` 
                    : barStyleSecondary?.join(" ")}"
            style="--la-percent:{currentValueSecondary / maxValueSecondary * 100}%"
        ></div>
        {/if}
        {#if currentValueTertiary && maxValueTertiary}
        <div 
            class="la-bar-h-progress -tertiary la-bar-h-current -positionabsolute -top0 -heightfull 
                {editTertiary && barEditStyleTertiary 
                    ? `${barEditStyleTertiary?.join(" ")} -pulse-bckg-prmy -fast` 
                    : barStyleTertiary?.join(" ")}"
            style="--la-percent:{currentValueTertiary / maxValueTertiary * 100}%"
        ></div>
        {/if}
    </div>
</div>
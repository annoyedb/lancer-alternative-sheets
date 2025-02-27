<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HexButtonProps } from "@/interfaces/actor/HexButtonProps";

    const {
        name,
        value,
        tooltipHeader,
        tooltip,
        uuid,
        flowType,
        flowArgs,
        flowClass,
        dataPath,
        sign,

        style,
        innerStyle,
        outerTextStyle,
        innerTextStyle,
        buttonStyle,
    }: HexButtonProps = $props();

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>
<div class="la-attribute la-text-secondary mdi mdi-hexagon {style?.join(' ')}">
    <div class="la-combine-v -widthfull -heightfull {innerStyle?.join(' ')}">
        <span class="la-label__span {outerTextStyle?.join(' ')}">
            {name}
        </span>
        <button type="button" 
            class="la-value__button {buttonStyle?.join(' ')}
                {flowClass.toString()}" 
            data-uuid="{uuid}" 
            data-flow-type="{flowType}" 
            data-flow-args="{flowArgs}"
            data-tooltip="{tip}"
            data-tooltip-class="clipped-bot la-tooltip"
            data-path="{dataPath}"
            aria-label="{name}"
        >
            <span class="la-value__span {innerTextStyle?.join(' ')}"><!--
        --->{#if sign && value > 0}<!--
            --->+<!--
        --->{:else if sign && value < 0}<!--
            --->-<!--
        --->{/if}<!--
            --->{value}<!--
        ---></span>
        </button>
    </div>
</div>
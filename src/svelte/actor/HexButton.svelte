<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HexButtonProps } from "@/interfaces/actor/button/HexButtonProps";

    const {
        text,
        value,
        
        flowType,
        flowArgs,
        flowClass,

        tooltipHeader,
        tooltip,
        uuid,
        path,
        sign,

        style,
        innerStyle,
        outerTextStyle,
        innerTextStyle,
        buttonStyle,
    }: HexButtonProps = $props();

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
    let parsedValue = value 
        ? sign ? (value > 0 ? `+${value}` : value) : value
        : "";
</script>
<div class="la-attribute la-text-secondary mdi mdi-hexagon {style?.join(' ')}">
    <div class="la-combine-v -widthfull -heightfull {innerStyle?.join(' ')}">
        <span class="la-label__span {outerTextStyle?.join(' ')}">
            {text}
        </span>
        <button type="button" 
            class="la-value__button {buttonStyle?.join(' ')}
                {flowClass || ''}" 
            data-uuid={uuid} 
            data-flow-type={flowType}
            data-flow-args={flowArgs}
            data-tooltip={tip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-path={path}
            aria-label={text}
        >
            <span class="la-value__span {innerTextStyle?.join(' ')}"><!--
            --->{parsedValue}<!--
        ---></span>
        </button>
    </div>
</div>
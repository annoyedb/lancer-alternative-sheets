<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";

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
</script>
<script lang="ts" module>
    export const HEADER_TERTIARY_STYLE: string = "la-text-header -fontsize9 -lineheight8";
</script>

<button type="button" 
    class="{style?.join(' ')}
        {flowClass || FlowClass.RollAttack}"
    data-tooltip={tip}
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.LEFT}
    aria-label={getLocalized("LA.flow.rollAttack.label")}
    disabled={disabled || false}
>
    <i class="{iconStyle?.join(' ')}"></i>
    <i class="fal fa-dice-d20 -positionabsolute -left0 {iconBackgroundStyle?.join(' ')}" style="z-index: -1;"></i>
</button>
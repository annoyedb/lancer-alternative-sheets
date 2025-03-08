<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        style,
        iconStyle,

        flowClass,
        path,

        tooltip,
        tooltipHeader,
        tooltipDirection,

        iconBackgroundStyle,
    } : IconButtonProps & ButtonProps & TooltipProps & { iconBackgroundStyle?: Array<string> } = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.effect.tooltip"), tooltipHeader);
    const defaultIconBackgroundStyle = "-fontsize5 -lineheight3 la-text-scrollbar-secondary -padding0-l"
</script>
<script lang="ts" module>
    export const HEADER_SECONDARY_STYLE = "-fontsize5 -lineheight3 -glow-primary-hover -glow-header";
</script>

            <!-- <button type="button"
                class="{useEffectStyle?.join(' ')}
                    {useEffectClass || "effect-flow"}"
                data-path={path}
                data-tooltip={effectTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={useEffectTooltipDirection}
                aria-label={useEffectTooltip}>
                <i class="{headerIconStyle?.join(' ') || defaultHeaderIconStyle}"></i>
                <i class="fal fa-dice-d20 -positionabsolute -left0 {useEffectBackgroundStyle?.join(' ')}" style="z-index: -1;"></i>
            </button> -->
<button type="button"
    class="{style?.join(' ')}
        {flowClass || "effect-flow"}"
    data-path={path}
    data-tooltip={tip}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    aria-label={tooltip}>
    <i class="{iconStyle?.join(' ') || HEADER_SECONDARY_STYLE}"></i>
    <i class="fal fa-dice-d20 -positionabsolute -left0 {iconBackgroundStyle?.join(' ') || defaultIconBackgroundStyle}" style="z-index: -1;"></i>
</button>
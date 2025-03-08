<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        uuid,

        style,
        iconStyle,
        tooltipDirection,
        onClick,
    }: IconButtonProps & ButtonProps = $props();

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.delete.tooltip"));
    const defaultStyle = "-glow-header -glow-primary-hover -fontsize2";
</script>

<button type="button"
    class="la-delete {style?.join(' ') || defaultStyle}" 
    data-uuid={uuid}
    data-tooltip={tip}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    aria-label={getLocalized("LA.delete.tooltip")}
    onclick={onClick ? (event) => onClick(event) : null}
>
    <i class="mdi mdi-close-circle {iconStyle?.join(' ')}"></i>
</button>
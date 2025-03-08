<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        flowClass,
        path,

        tooltipDirection,

        style,
        iconStyle,
    }: IconButtonProps & ButtonProps & TooltipProps = $props();

    const defaultStyle = "-glow-header -glow-primary-hover -fontsize2";
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.edit.tooltip"));
</script>
<script lang="ts" module>
    export const HEADER_SECONDARY_STYLE = "-glow-header -glow-primary-hover -fontsize2";
</script>

<button type="button"
    class="{style?.join(' ') || defaultStyle}
        {flowClass || 'lancer-context-menu'}"
    data-path={path}
    data-tooltip={tip}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    aria-label={getLocalized("LA.edit.tooltip")}
>
<i class="fas fa-ellipsis-v {iconStyle?.join(' ')}"></i>
</button>
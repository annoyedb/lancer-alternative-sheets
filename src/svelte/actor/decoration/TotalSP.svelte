<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { TotalSPProps } from "@/interfaces/actor/decoration/TotalSPProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        value,
        max,
        style,
        textStyle,
        iconStyle,
        tooltipDirection,
    }: TotalSPProps = $props();

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.mech.system.points.total.tooltip"))
</script>
<script lang="ts" module>
    export const MAIN_HEADER_STYLE = "la-text-header -fontsize2 -lineheight3"
    export const MAIN_HEADER_ICON_STYLE = "la-text-header -fontsize5 -lineheight3 -width3"
</script>

<div class="la-combine-h -height2 {style?.join(' ') || MAIN_HEADER_STYLE}"
    data-tooltip={tip}
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
>
    <div class="{textStyle?.join(' ') || "-fontsize2"}">
        {value} / {max}
    </div>
    <i class="cci cci-system-point {iconStyle?.join(' ') || MAIN_HEADER_ICON_STYLE}"></i>
</div>
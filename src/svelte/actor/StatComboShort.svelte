<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
import type { StatisticProps } from "@/interfaces/actor/StatisticProps";

    const {
        icon,
        label,
        value,
        style,

        tooltip,
        tooltipHeader,
        tooltipDirection
    }: StatisticProps = $props()

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>

<div class="la-shortstat la-combine-h">
    <!-- the mdi shield is a bit larger than the cci icons -->
    <i class="{icon}"></i>
    <div class="la-combine-v {style?.join(' ')}"
        data-tooltip={tip}
        data-tooltip-class="clipped-bot la-tooltip"
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    >
        <span class="-widthfull">{value}</span>
        <span class="">{label}</span>
    </div>
</div>
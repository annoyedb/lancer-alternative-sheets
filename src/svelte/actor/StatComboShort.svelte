<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { StatComboProps } from "@/interfaces/actor/StatComboProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";

    const {
        icon,
        label,
        value,
        outerStyle,
        innerStyle,

        tooltip,
        tooltipHeader,
        tooltipDirection
    }: StatComboProps & TooltipProps = $props()

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>

<div class="la-shortstat la-combine-h {outerStyle?.join(' ')}">
    <!-- the mdi shield is a bit larger than the cci icons -->
    <i class="{icon}"></i>
    <div class="la-combine-v {innerStyle?.join(' ')}"
        data-tooltip={tip}
        data-tooltip-class="clipped-bot la-tooltip"
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    >
        <span class="-widthfull">{value}</span>
        <span class="">{label}</span>
    </div>
</div>
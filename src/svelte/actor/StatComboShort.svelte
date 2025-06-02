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

        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,
    }: StatComboProps & TooltipProps = $props()

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : undefined;
</script>

<div class="la-shortstat la-combine-h {outerStyle?.join(' ')}">
    <!-- the mdi shield is a bit larger than the cci icons -->
    <i class="{icon}"></i>
    <div class="la-combine-v {innerStyle?.join(' ')}"
        data-tooltip={tooltipEnabled ? tip : undefined}
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    >
        <span class="-widthfull">{value}</span>
        <span class="">{label}</span>
    </div>
</div>
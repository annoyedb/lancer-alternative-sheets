<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { TotalSPProps } from "@/interfaces/actor/decoration/TotalSPProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { H2_ICON_SIZE, H2_TEXT_SIZE } from "../header/HeaderSecondary.svelte";

    const {
        value,
        max,
        style,
        textStyle,
        iconStyle,
        tooltip,
        tooltipDirection,
    }: TotalSPProps & TooltipProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.mech.system.points.total.tooltip"))
</script>

<div class="la-combine-h -aligncenter -height2 {style?.join(' ') || H2_TEXT_SIZE}"
    data-tooltip={tip}
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
>
    <span class="{textStyle?.join(' ')}">
    {#if max}
        {value} / {max}
    {:else}
        {value}
    {/if}
    </span>
    <i class="cci cci-system-point {iconStyle?.join(' ') || H2_ICON_SIZE}"></i>
</div>
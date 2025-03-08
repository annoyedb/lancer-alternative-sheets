<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { CollapseAllButtonProps } from "@/interfaces/actor/button/CollapseAllButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { collapseStates, handleCollapseAllToggle } from "@/scripts/collapse";
    import { getLocalized } from "@/scripts/helpers";

    const {
        collapseID,

        style,
        iconStyle,
        tooltipDirection,
    }: IconButtonProps & CollapseAllButtonProps & TooltipProps = $props();
    let isExpanding = $derived.by(() => {
        if (collapseID && $collapseStates[collapseID])
            return !$collapseStates[collapseID].collapsed;
        return true;
    });

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.collapseAll.tooltip"));

    function toggleCollapseAll(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) 
    {
        if (collapseID)
            handleCollapseAllToggle(event, collapseID);
    }
</script>
<script lang="ts" module>
    export const MAIN_HEADER_STYLE = " -glow-header -glow-primary-hover la-text-header -fontsize3 -lineheight2 ";
</script>

<button type="button"
    class="{style?.join(' ') || MAIN_HEADER_STYLE}"
    data-tooltip={tip}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    aria-label={getLocalized("LA.collapseAll.tooltip")}
    onclick={(event) => toggleCollapseAll(event)}
>
    <i class="mdi {isExpanding ? "mdi-arrow-collapse-all" : "mdi-arrow-expand-all" } {iconStyle?.join(' ')}}"></i>
</button>
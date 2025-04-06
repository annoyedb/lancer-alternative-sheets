<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { CollapseAllButtonProps } from "@/interfaces/actor/button/CollapseAllButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getCollapseState, setCollapseState } from "@/scripts/store/collapse";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        collapseID,

        style,
        iconStyle,
        
        tooltipEnabled,
        tooltipDirection,

        logText,
        logType,
        logTypeReset,
    }: IconButtonProps & CollapseAllButtonProps & TooltipProps & TextLogEventProps = $props();
    let isExpanding = $derived(!getCollapseState(collapseID));

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.collapseAll.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.collapseAll.tooltip");

    function toggleCollapseAll(event: MouseEvent) 
    {
        event.stopPropagation();
        if (!collapseID || event.currentTarget === null)
            return;
        
        const collapseGroup = jQuery(event.currentTarget).closest('.collapse-group');
        if (collapseGroup)
        {
            const triggers = collapseGroup.find('[data-la-collapse-id]');
            triggers.each((_: number, trigger: HTMLElement) =>
            {
                const childId = jQuery(trigger).data('la-collapse-id');
                if (childId === collapseID)
                    return;
                if (childId)
                    setCollapseState(childId, isExpanding);
            });
            setCollapseState(collapseID, isExpanding);
        }
    }
</script>
<script lang="ts" module>
    export const MAIN_HEADER_STYLE = " -glow-header -glow-primary-hover la-text-header -fontsize3 -lineheight2 ";
</script>

<button type="button"
    class="{style?.join(' ') || MAIN_HEADER_STYLE}"
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={(event) => toggleCollapseAll(event)}
    aria-label={getLocalized("LA.collapseAll.tooltip")}
>
    <i class="mdi {isExpanding ? "mdi-arrow-collapse-all" : "mdi-arrow-expand-all" } {iconStyle?.join(' ')}}"></i>
</button>
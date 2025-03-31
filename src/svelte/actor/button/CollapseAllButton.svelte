<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { CollapseAllButtonProps } from "@/interfaces/actor/button/CollapseAllButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getCollapseState } from "@/scripts/store/collapse";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        collapseID,

        style,
        iconStyle,
        tooltipDirection,
        logText,
        logType,
        logTypeReset,
    }: IconButtonProps & CollapseAllButtonProps & TooltipProps & TextLogEventProps = $props();
    let isExpanding = $derived(!getCollapseState(collapseID));

    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.collapseAll.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.collapseAll.tooltip");

    function toggleCollapseAll(event: MouseEvent) 
    {
        event.stopPropagation();
        if (!collapseID || event.currentTarget === null)
            return;
        const collapseGroup = jQuery(event.currentTarget).closest('.collapse-group');
        if (collapseGroup.length)
        {
            const triggers = collapseGroup.find('.collapse-trigger');
            triggers.each((_: any, trigger: any) => {
                const clickEvent = new MouseEvent('click');
                trigger.dispatchEvent(clickEvent);
            });
        }
    }
</script>
<script lang="ts" module>
    export const MAIN_HEADER_STYLE = " -glow-header -glow-primary-hover la-text-header -fontsize3 -lineheight2 ";
</script>

<button type="button"
    class="{style?.join(' ') || MAIN_HEADER_STYLE}"
    data-tooltip={tipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={(event) => toggleCollapseAll(event)}
    aria-label={getLocalized("LA.collapseAll.tooltip")}
>
    <i class="mdi {isExpanding ? "mdi-arrow-collapse-all" : "mdi-arrow-expand-all" } {iconStyle?.join(' ')}}"></i>
</button>
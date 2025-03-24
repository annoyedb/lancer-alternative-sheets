<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { resetLog, sendToLog } from "@/scripts/text-log";

    const {
        flowClass,
        path,

        tooltipDirection,

        style,
        iconStyle,
        
        logText,
        logType,
        logTypeReset,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps = $props();

    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.edit.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.edit.tooltip");
</script>
<script lang="ts" module>
    export const HEADER_SECONDARY_STYLE = "-glow-header -glow-primary-hover -fontsize2";
    const _STYLE = "-glow-header -glow-primary-hover -fontsize2";
</script>

<button type="button"
    class="la-combine-v {style?.join(' ') || _STYLE}
        {flowClass || 'lancer-context-menu'}"
    data-path={path}
    data-tooltip={tipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    aria-label={getLocalized("LA.edit.tooltip")}
>
<i class="fas fa-ellipsis-v {iconStyle?.join(' ')}"></i>
</button>
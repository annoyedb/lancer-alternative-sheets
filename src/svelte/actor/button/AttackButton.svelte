<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/settings/mech-sheet";
    import { resetLog, sendToLog } from "@/scripts/text-log";
    import { CLICKABLE_HOVER } from "@/svelte/actor/button/Button.svelte";
    import { H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";

    const {
        style,
        iconStyle,
        iconBackgroundStyle,
        
        flowClass,
        disabled,
        
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,

        logText,
        logType,
        logTypeReset,
    }: IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps = $props();
    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.rollAttack.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.rollAttack.tooltip");
</script>
<script lang="ts" module>
    const _ICON_BG_STYLE = `${H3_ICON_SIZE} la-text-scrollbar-secondary`;
    const _ICON_STYLE = `${H3_ICON_SIZE}`;
</script>

<button type="button" 
    class="
        {style?.join(' ')}
        {flowClass || FlowClass.RollAttack}"
    data-tooltip={tipEnabled && !disabled ? tip : undefined }
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.LEFT}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    aria-label={tooltip || getLocalized("LA.flow.rollAttack.tooltip")}
    disabled={disabled || false}
>
    <i 
        class="
            {disabled ? "" : CLICKABLE_HOVER}
            {iconStyle?.join(' ') || _ICON_STYLE}"
    ></i>
{#if !disabled}
    <i 
        class="fal fa-dice-d20 -positionabsolute -left0 
            {iconBackgroundStyle?.join(' ') || _ICON_BG_STYLE}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
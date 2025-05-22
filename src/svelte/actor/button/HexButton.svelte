<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getDocumentTheme, getManufacturerColor } from "@/scripts/theme";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { HexButtonProps } from "@/interfaces/actor/button/HexButtonProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getSheetStore } from "@/scripts/store/module-store";

    const {
        text,
        value,
        
        flowType,
        flowArgs,
        flowClass,

        uuid,
        path,
        sign,

        tooltipEnabled,
        tooltipHeader,
        tooltip,
        tooltipDirection,

        outerStyle,
        innerStyle,
        outerTextStyle,
        innerTextStyle,
        buttonStyle,
        
        logText,
        logType,
        logTypeReset,

        docUuid
    }: {docUuid: string} & HexButtonProps & ButtonProps & TooltipProps & TerminalTextProps & TextLogEventProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.tooltip");
    const parsedValue = value 
        ? sign 
            ? (value > 0 ? `+${value}` : value) 
            : value
        : value;

    console.log(getManufacturerColor(getSheetStore(docUuid).currentTheme, "anim"));
</script>
<div class="la-attribute la-text-secondary mdi mdi-hexagon {outerStyle?.join(' ')}">
    <div class="la-combine-v {innerStyle?.join(' ')}">
        <span class="la-label__span {outerTextStyle?.join(' ')}">
            {text}
        </span>
        <button type="button" 
            class="la-value__button {buttonStyle?.join(' ')}
                {flowClass || ''}" 
            data-uuid={uuid} 
            data-flow-type={flowType}
            data-flow-args={flowArgs}
            data-path={path}
            data-tooltip={tooltipEnabled ? tip : undefined }
            data-tooltip-class="clipped-bot la-tooltip {getManufacturerColor(getSheetStore(docUuid).currentTheme, "anim")}"
            data-tooltip-direction={tooltipDirection}
            onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
            onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
            aria-label={text}
        >
            <span class="la-value__span {innerTextStyle?.join(' ')}"><!--
            --->{parsedValue}<!--
        ---></span>
        </button>
    </div>
</div>
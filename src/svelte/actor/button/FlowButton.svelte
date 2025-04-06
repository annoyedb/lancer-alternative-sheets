<script lang="ts">
    import { getLocalized, randomExtension } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { FlowButtonProps } from "@/interfaces/actor/button/FlowButtonProps";
    import TerminalText, { FLOW_BUTTON_STYLE } from "@/svelte/actor/TerminalText.svelte";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";

    const {
        text,
        uuid,
        flowType,
        flowArgs,
        flowClass,
        path,
        
        style,
        textStyle,

        tooltipEnabled,
        tooltipHeader,
        tooltip,
        tooltipDirection,

        disableSlide,
        disableCmdline: disableTerminal,
        disableExtension,
        disableCursor,

        logText,
        logType,
        logTypeReset,

        onClick,
    } : FlowButtonProps & ButtonProps & TooltipProps & TerminalTextProps & TextLogEventProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.tooltip");
</script>
<script lang="ts" module>
    const _STYLE = "clipped-bot-alt la-bckg-secondary";
</script>

<button 
    type="button"
    class="-upper
        {disableSlide || "la-flow"} 
        {style?.join(' ') || _STYLE} 
        {flowClass || ''}"
    data-uuid={uuid}
    data-flow-type={flowType}
    data-flow-args={flowArgs}
    data-path={path}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || 'RIGHT'}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={(event) => onClick && onClick(event)}
    aria-label={text}
>
    <TerminalText
        text={text}
        extensionText={randomExtension()}
        textStyle={textStyle || [FLOW_BUTTON_STYLE]}
        disableCmdline={disableTerminal}
        disableExtension={disableExtension}
        disableCursor={disableCursor}
    />
</button>
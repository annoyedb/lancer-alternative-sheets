<script lang="ts">
    import { getLocalized, randomExtension } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    import TerminalText, { FLOW_BUTTON_STYLE } from "@/svelte/shared/TerminalText.svelte";

    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";

    const {
        style,
        onClick,

        uuid,
        flowType,
        flowArgs,
        flowClass,
        path,
        
        text,
        textStyle,

        tooltipEnabled,
        tooltipHeader,
        tooltip,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,

        disableSlide,
        disableCmdline,
        disableExtension,
        disableCursor,

        logText,
        logType,
        logTypeReset,
    } : IconButtonProps & ButtonProps & TooltipProps & TerminalTextProps & TextLogEventProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.tooltip");
</script>
<script lang="ts" module>
    const _DEFAULT_BUTTON = "clipped-bot-alt la-bckg-secondary";
</script>

<button 
    type="button"
    class="-upper
        {disableSlide || "la-flow"} 
        {style?.join(' ') || _DEFAULT_BUTTON} 
        {flowClass || ''}"
    data-uuid={uuid}
    data-flow-type={flowType}
    data-flow-args={flowArgs}
    data-path={path}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
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
        disableCmdline={disableCmdline}
        disableExtension={disableExtension}
        disableCursor={disableCursor}
    />
</button>
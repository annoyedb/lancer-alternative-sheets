<script lang="ts">
    import { randomExtension } from "@/scripts/helpers";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { FlowButtonProps } from "@/interfaces/actor/button/FlowButtonProps";
    import TerminalText, { FLOW_BUTTON_STYLE } from "@/svelte/actor/TerminalText.svelte";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";

    const {
        text,
        uuid,
        flowType,
        flowArgs,
        flowClass,
        path,
        
        style,
        textStyle,

        tooltipHeader,
        tooltip,
        tooltipDirection,

        disableSlide,
        disableCmdline: disableTerminal,
        disableExtension,
        disableCursor,
    } : FlowButtonProps & ButtonProps & TooltipProps & TerminalTextProps = $props();

    const defaultStyle = "clipped-bot-alt la-bckg-secondary";
    const tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : undefined;
</script>

<button 
    type="button"
    class="
        {disableSlide || "la-flow"} 
        {style?.join(' ') || defaultStyle} 
        {flowClass || ''}"
    data-uuid={uuid}
    data-flow-type={flowType}
    data-flow-args={flowArgs}
    data-tooltip={tip}
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction={tooltipDirection || 'RIGHT'}
    data-path={path}
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
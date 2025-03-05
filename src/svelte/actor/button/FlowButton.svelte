<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { FlowButtonProps } from "@/interfaces/actor/button/FlowButtonProps";
    import TerminalText from "@/svelte/actor/TerminalText.svelte";

    const {
        text: name,
        tooltipHeader,
        tooltip,
        tooltipDirection,
        uuid,
        flowType,
        flowArgs,
        flowClass,
        path,
        style,
        textStyle,
        disableSlide,
        disableTerminal,
        disableExtension,
        disableCursor,
    } : FlowButtonProps = $props();

    const defaultStyle = "clipped-bot-alt la-bckg-secondary";
    const defaultTextStyle = "la-text-header la-anim-header";
    const tip = tooltip || TooltipFactory.buildTooltip(tooltip!, tooltipHeader);
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
    aria-label={name}
>
    <TerminalText
        text={name}
        textStyle={textStyle || [defaultTextStyle]}
        disableTerminal={disableTerminal}
        disableExtension={disableExtension}
        disableCursor={disableCursor}
    />
</button>
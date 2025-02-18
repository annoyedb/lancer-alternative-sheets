<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { FlowButtonProps } from "@/interfaces/actor/FlowButtonProps";
    import { randomExtension } from "@/scripts/helpers";

    const {
        name,
        tooltipHeader,
        tooltip,
        tooltipDirection,
        uuid,
        flowType,
        flowArgs,
        flowClass,
        dataPath,
        style,
        backgroundStyle,
        textStyle,
        disableSlide,
    } : FlowButtonProps = $props();

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>

<button 
    type="button"
    class="{disableSlide ? "" : "la-flow"} -textalignleft -letterspacing0 {backgroundStyle ?? "la-bckg-secondary"} {textStyle ?? "la-text-header"} {style ? style?.join(' ') : "clipped-bot-alt"} {flowClass.toString()}"
    data-uuid="{uuid}" 
    data-flow-type="{flowType}" 
    data-flow-args="{flowArgs}"
    data-tooltip="{tip}"
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction="{tooltipDirection ? tooltipDirection : "RIGHT" }"
    data-path="{dataPath}"
    aria-label="{name}"
>
    <div class="-padding0-tb -height3 -whitespacenowrap -padding1-r">
        <span class="la-terminal la-text-header -fadein">>//: </span><!--
    ---><span>{name}</span><!--
    ---><span class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><!--
    ---><span class="la-cursor la-anim-header -fadein"></span>
    </div>
</button>
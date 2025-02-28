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
        disableSlide,
    } : FlowButtonProps = $props();

    let tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : "";
</script>

<button 
    type="button"
    class="
        {disableSlide ? "" : "la-flow"} 
        {style ? style?.join(' ') : "clipped-bot-alt la-bckg-secondary"} 
        {flowClass.toString()}"
    data-uuid="{uuid}" 
    data-flow-type="{flowType}" 
    data-flow-args="{flowArgs}"
    data-tooltip="{tip}"
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction="{tooltipDirection ? tooltipDirection : "RIGHT" }"
    data-path="{dataPath}"
    aria-label="{name}"
>
    <div class="la-text-header -padding0-tb -height3 -whitespacenowrap -padding1-r -textalignleft -letterspacing0">
        <span class="la-terminal -fadein">>//: </span><!--
    ---><span class="">{name}</span><!--
    ---><span class="la-extension -lower -fadein">{randomExtension()}</span><!--
    ---><span class="la-cursor la-anim-header -fadein"></span>
    </div>
</button>
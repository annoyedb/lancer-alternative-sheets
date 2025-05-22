<script lang="ts">
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import type { CounterBoxProps } from "@/interfaces/actor/CounterBoxProps";
    import type { PointerClickProps } from "@/interfaces/actor/events/PointerClickProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        text,
        type,
        usesValue,
        usesMax,
        path,
        style,
        
        logText,
        logType,
        logTypeReset,

        onPointerClick,
    }: CounterBoxProps & TextLogEventProps & PointerClickProps = $props();
    
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.counter.tooltip");

    function handleOnClick(event: MouseEvent, index: number)
    {
        event.stopPropagation();

        if (onPointerClick)
            onPointerClick(event, index);
    }
</script>
<script lang="ts" module>
    const _COUNTER_STYLE = "clipped-alt -widthfull la-bckg-header-anti"
</script>

{#if usesMax}
<div 
    class="la-counterbox la-combine-h -aligncenter la-text-header -padding1-lr
        {style?.join(' ') || type === CounterBoxType.Counter ? _COUNTER_STYLE : ""}"
>
{#if text}
    <span class="la-counterbox__span -fontsize1">
        {text}
    </span>
{/if}
{#each {length: usesMax} as _, index}
    <button type="button"
        class="la-counterbox__button
            mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"} 
            -glow-header -glow-primary-hover -fontsize5 
            {type}"
        data-available={index < usesValue}
        data-path={path}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        onclick={event => handleOnClick(event, index)}
        aria-label="{getLocalized("LA.use.label")} {text}"
    ></button>
{/each}
</div>
{/if}
<!-- 
 While functionally identical to limited, it does technically have a unique
 a unique foundryvtt-lancer class... so we distinguish it as well.

 Uniquely from limited, it can also be named anything
-->
<script lang="ts">
    import type { CounterBoxProps } from "@/interfaces/actor/CounterBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/text-log";

    const {
        name,
        style,
        usesValue,
        usesMax,
        path,
        onClick,
        
        logText,
        logType,
        logTypeReset,
    }: CounterBoxProps & TextLogEventProps = $props();
    
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.counter.tooltip");

    function handleOnClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }, index: number)
    {
        event.stopPropagation();
        if (onClick)
            onClick(event, index);
    }
</script>
<script lang="ts" module>
    const _STYLE = "clipped-alt -widthfull la-bckg-header-anti"
</script>

{#if usesMax}
<div class="la-limited la-combine-h la-text-header -aligncenter -padding1-lr
        {style?.join(' ') || _STYLE}"
>
    <span class="la-hexarray__span -fontsize1">
        {name}
    </span>
{#each {length: usesMax} as _, index}
    <!-- (#2) onclick has issues bubbling events, on:click does not -->
    <!-- svelte-ignore event_directive_deprecated -->
    <button type="button"
        class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"} -glow-header -glow-primary-hover -fontsize5 
            counter-hex" 
        data-available={index < usesValue}
        data-path={path}
        on:pointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        on:pointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        on:click={event => handleOnClick(event, index)}
        aria-label={`${getLocalized("LA.use.label")} ${name}`}>
    </button>
{/each}
</div>
{/if}
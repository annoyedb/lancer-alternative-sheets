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

    //@ts-ignore
    function logToConsole(any: any) {
        console.log(any);
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
    <button type="button"
        class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"} -glow-header -glow-primary-hover -fontsize5 
            counter-hex" 
        data-available={index < usesValue}
        data-path={path}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        onclick={onClick ? (event) => onClick(event) : null}
        aria-label={`${getLocalized("LA.use.label")} ${name}`}>
    </button>
{/each}
</div>
{/if}
<script lang="ts">
    import type { LimitedBoxProps } from "@/interfaces/actor/LimitedBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/text-log";

    const {
        usesValue,
        usesMax,
        path,
        
        logText,
        logType,
        logTypeReset,
    }: LimitedBoxProps & TextLogEventProps = $props();

    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.limited.tooltip");
</script>

{#if usesMax}
<div class="la-limited la-combine-h la-text-header 
        -aligncenter -padding1-lr">
    <span class="la-hexarray__span -fontsize1">
        {getLocalized("LA.limited.label")}
    </span>
{#each {length: usesMax} as _, index}
    <button type="button" 
        class="-glow-header -glow-primary-hover -fontsize5"
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        aria-label={getLocalized("LA.use.label")}
    >
        <i class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}
                uses-hex" 
            data-available="{index < usesValue}" 
            data-path="{path}">
        </i>
    </button>
{/each}
</div>
{/if}
<script lang="ts">
    import type { LimitedBondBoxProps } from "@/interfaces/pilot/LimitedBondBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        usesValue,
        usesMax,
        uuid,
        power,
        
        logText,
        logType,
        logTypeReset,
    }: LimitedBondBoxProps & TextLogEventProps = $props();

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
        class="la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover -fontsize5"
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        aria-label={getLocalized("LA.use.label")}
    >
        <i class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}
                power-uses-hex" 
            data-available="{index < usesValue}"
            data-uuid={uuid}
            data-power-index={power}
            data-path={`system.bond.system.powers.${power}`}
        ></i>
    </button>
{/each}
</div>
{/if}
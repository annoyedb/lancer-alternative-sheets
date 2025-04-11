<!-- Reimplementation of LimitedBox -->
<script lang="ts">
    import type { LoadedBoxProps } from "@/interfaces/actor/LoadedBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized, isLoading } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        item,
        path,
        
        logText,
        logType,
        logTypeReset,
    }: LoadedBoxProps & TextLogEventProps = $props();
    const loaded = item.system.loaded;
    const usesValue = loaded ? 1 : 0;
    const usesMax = 1;

    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.loaded.tooltip");
    
    // Reimplementation of Lancer's `handleLoadedInteraction` function for this module
    export function handleLoadedInteraction(event: MouseEvent)
    {
        event.stopPropagation();
        item.update({
            "system.loaded": !loaded,
        });
    }
</script>

{#if isLoading(item)}
{#if item.type === "mech_weapon" 
    || item.type === "pilot_weapon"
    || item.type === "npc_feature"}
    <div class="la-limited la-combine-h la-text-header 
            -aligncenter -padding1-lr">
        <span class="la-hexarray__span -fontsize1">
            {getLocalized("LA.loaded.label")}
        </span>
    {#each {length: usesMax} as _, index}
        <button type="button" 
            class="-glow-header -glow-primary-hover -fontsize5"
            aria-label={getLocalized("LA.use.label")}
            onclick={handleLoadedInteraction}
            onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
            onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        >
        <!-- 
            We don't use the 'loaded-hex' here to prevent adding an unnecessary event listener 
            from the Lancer system, effectively deprecating its use
        -->
            <i class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}" 
                data-available={index < usesValue}
                data-path={path}>
            </i>
        </button>
    {/each}
    </div>
{/if}
{/if}
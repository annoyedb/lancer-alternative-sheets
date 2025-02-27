<script lang="ts">
    import type { LoadedBoxProps } from "@/interfaces/actor/LoadedBoxProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        item,
        path,
    }: LoadedBoxProps = $props();
    let loaded = item.system.loaded;
    let usesValue = loaded ? 1 : 0;
    let usesMax = 1;
</script>

{#if item.type === "mech_weapon" || 
    item.type === "pilot_weapon" || 
    (item.type === "npc_feature" && item.system.type === "Weapon")}
<div class="la-limited la-combine-h la-text-header 
        -flex1 -aligncenter -padding1-lr">
    <span class="la-hexarray__span -fontsize1">
        {getLocalized("LA.loaded.label")}
    </span>
{#each {length: usesMax} as _, index}
    <button type="button" 
        class="-glow-header -glow-primary-hover -fontsize5"
        aria-label={getLocalized("LA.use.label")}
    >
        <i class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}
            loaded-hex" 
            data-available="{index < usesValue}" 
            data-path="{path}">
        </i>
    </button>
{/each}
</div>
{/if}
<script lang="ts">
    import type { LimitedBoxProps } from "@/interfaces/actor/LimitedBoxProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        usesValue,
        usesMax,
        path,
    }: LimitedBoxProps = $props();
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
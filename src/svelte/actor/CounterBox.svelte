<!-- 
 While functionally identical to limited, it does technically have a unique
 a unique foundryvtt-lancer class... so we distinguish it as well.

 Uniquely from limited, it can also be named anything
-->
<script lang="ts">
    import type { CounterBox } from "@/interfaces/actor/CounterBox";
    import { getLocalized } from "@/scripts/helpers";

    const {
        name,
        usesValue,
        usesMax,
        path,
    }: CounterBox = $props();
</script>

{#if usesMax}
<div class="la-limited la-combine-h clipped-alt la-bckg-pilot la-text-header 
        -flex1 -aligncenter -padding1-lr">
    <span class="la-hexarray__span -fontsize1">
        {name}
    </span>
{#each {length: usesMax} as _, index}
    <button type="button" 
        class="-glow-header -glow-primary-hover -fontsize5"
        aria-label={`${getLocalized("LA.use.label")} ${name}`}
    >
        <i class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}
                counter-hex" 
            data-available="{index < usesValue}" 
            data-path="{path}">
        </i>
    </button>
{/each}
</div>
{/if}
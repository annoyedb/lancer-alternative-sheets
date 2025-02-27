<!-- 
 While functionally identical to limited, it does technically have a unique
 a unique foundryvtt-lancer class... so we distinguish it as well.

 Uniquely from limited, it can also be named anything
-->
<script lang="ts">
    import type { CounterBoxProps } from "@/interfaces/actor/CounterBoxProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        name,
        usesValue,
        usesMax,
        path,
        onClick,
    }: CounterBoxProps = $props();

    //@ts-ignore
    function log(any: any) {
        console.log(any);
    }
</script>

{#if usesMax}
<div class="la-limited la-combine-h clipped-alt la-bckg-header-anti la-text-header 
        -flex1 -aligncenter -padding1-lr">
    <span class="la-hexarray__span -fontsize1">
        {name}
    </span>
{#each {length: usesMax} as _, index}
    <!-- (#2) -->
    <!-- svelte-ignore event_directive_deprecated -->
    <button class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"} -glow-header -glow-primary-hover -fontsize5 
            counter-hex" 
        data-available="{index < usesValue}" 
        data-path="{path}"
        on:click={onClick ? (event) => onClick(event) : null}
        aria-label={`${getLocalized("LA.use.label")} ${name}`}>
    </button>
{/each}
</div>
{/if}
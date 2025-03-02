<script lang="ts">
    import type { ChargedBoxProps } from "@/interfaces/npc/ChargedBoxProps";
    import { getLocalized, isRecharge } from "@/scripts/helpers";

    const {
        item,
        path,
    }: ChargedBoxProps = $props();
    let charged = item.system.charged;
    let usesValue = charged ? 1 : 0;
    let usesMax = 1;

    console.log(item.name, isRecharge(item));
</script>

{#if isRecharge(item)}
<div class="la-charged la-combine-h la-text-header 
        -aligncenter -padding1-lr">
    <span class="la-hexarray__span -fontsize1">
        {getLocalized("LA.npc.charged.label")}
    </span>
{#each {length: usesMax} as _, index}
    <button type="button" 
        class="-glow-header -glow-primary-hover -fontsize5"
        aria-label={getLocalized("LA.use.label")}
    >
        <i class="mdi {index < usesValue ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}
                charged-hex" 
            data-available="{index < usesValue}" 
            data-path="{path}">
        </i>
    </button>
{/each}
</div>
{/if}
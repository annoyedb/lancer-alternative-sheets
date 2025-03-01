<script lang="ts">
    import type { BonusBoxProps } from "@/interfaces/actor/BonusBoxProps";
    
    const {
        bonuses,
        bonusPath,
        editable,
    }: BonusBoxProps = $props();
</script>

<!-- TODO: bonus.lid needs a localization map (but it's all over the place??) -->
{#if bonuses.length}
<div class="la-combine-h -widthfull">
{#each bonuses as bonus, index}
    <div class="la-effectbox la-brdr-repcap la-bckg-card la-combine-h -widthfull {index === 0 ? "-bordersround" : "-bordersround-ltb"}">
        <span 
            class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -upper -fontsize0
                {editable ? "editable" : ""}" 
            data-path="${bonusPath}.${index}"
        >
            {bonus.lid}
        </span>
        <div class="la-combine-h -fontsize3">{bonus.val}</div>
    </div>
{/each}
</div>
{/if}
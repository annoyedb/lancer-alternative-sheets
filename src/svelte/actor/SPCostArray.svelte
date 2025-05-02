<script lang="ts">
    const {
        cost
    } : { cost: number } = $props(); 
</script>

{#if cost}
<div class="la-loading la-hexarray la-combine-h -aligncenter la-text-header -fontsize5">
    <span class="la-hexarray__span -fontsize4">{cost}</span>
    <i class="cci cci-system-point"></i>
</div>
{/if}
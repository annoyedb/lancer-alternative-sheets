<script lang="ts">
    const {
        cost
    } : { cost: number } = $props(); 
</script>

{#if cost}
<div class="la-loading la-hexarray la-flexrow -aligncenter la-text-header -fontsize7">
    <span class="la-hexarray__span -fontsize6">{cost}</span>
    <i class="cci cci-system-point"></i>
</div>
{/if}
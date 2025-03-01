<script lang="ts">
    const {ranges}: any = $props();
</script>

{#if ranges.length}
<span class="la-range la-combine-h -justifycenter -aligncenter -lineheight1 -widthfull -flex1">
    {#each ranges as range}
        <span class="la-number__span">{range.val}</span>
        <i class="cci {range.icon}"></i>
    {/each}
</span>
{/if}
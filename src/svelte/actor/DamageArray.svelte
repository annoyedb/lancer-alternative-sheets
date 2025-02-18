<script lang="ts">
    const {damages}: any = $props();
</script>

{#if damages.length}
<span class="la-damage la-combine-h -justifycenter -aligncenter -lineheight1 -widthfull -flex1">
    {#each damages as damage}
        <span class="la-number__span -glow-header">{damage.val.replace(/\s/g, "")}</span><!--
    ---><i class="cci {damage.icon} -glow-{damage.type.toLowerCase()}"></i>
    {/each}
</span>
{/if}
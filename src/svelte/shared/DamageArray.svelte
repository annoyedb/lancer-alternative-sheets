<script lang="ts">
    type DamageArrayProps = 
    {
        damages: any[],

        style?: string[];
    }

    const {
        damages,
        style,
    }: DamageArrayProps = $props();
</script>

{#if damages.length}
<span class={
    "la-damage la-flexrow -justifycenter -aligncenter -lineheight3 -widthfull -flex1"
    + style?.join(' ')
}
>
    {#each damages as damage}
        <span class="la-number-weapon__span">{damage.val.replace(/\s/g, "")}</span><!--
    ---><i class="cci {damage.icon} -glow-{damage.type.toLowerCase()}"></i>
    {/each}
</span>
{/if}
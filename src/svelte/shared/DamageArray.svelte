<script lang="ts">
    import {getExtraEffectsEnabled} from "@/scripts/settings";

    type DamageArrayProps =
    {
        damages: any[],

        style?: string[];
    }

    const {
        damages,
        style,
    }: DamageArrayProps = $props();

    const qualityMode = getExtraEffectsEnabled();
</script>

{#if damages.length}
<span class="la-damage la-flexrow -justifycenter -aligncenter -lineheight3 -widthfull -flex1 -fontface-stylized
    {style?.join(' ')}"
>
    {#each damages as damage}
        <span class="la-number-weapon__span
                {qualityMode ? '-glow-' + damage.type.toLowerCase() : ''}"
        >{damage.val.replace(/\s/g, "")}</span><!--
    ---><i class="cci {damage.icon}
                {qualityMode ? '-glow-' + damage.type.toLowerCase() : ''}"
        ></i>
    {/each}
</span>
{/if}
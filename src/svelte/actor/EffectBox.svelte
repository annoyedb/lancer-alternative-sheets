<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import type { EffectBoxProps } from "@/interfaces/actor/EffectBoxProps";
    import { getLocalized } from "@/scripts/helpers";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";

    const {
        children,
        name,
        effect,
        hasFlow,
        innerStyle,
        outerStyle
    }: EffectBoxProps = $props();

</script>

{#if effect || children}
<div class="la-effectbox la-bckg-card la-brdr-repcap -widthfull -fontsize1 -bordersround-ltb {outerStyle?.join(' ')}">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
        {name}
    </span>
    {#if hasFlow}
        <FlowButton
            name={getLocalized("LA.use.label")}
            flowClass={FlowClass.Effect}
        />
    {/if}
    <span
        class="{innerStyle?.join(' ')}"
    >
        {@html effect}
    {#if children}
        {@render children()}
    {/if}
    </span>
</div>
{/if}
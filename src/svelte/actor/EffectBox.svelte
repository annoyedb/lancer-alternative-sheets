<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import type { EffectBoxProps } from "@/interfaces/actor/EffectBoxProps";
    import { getLocalized } from "@/scripts/helpers";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";

    const {
        name,
        effect,
        hasFlow,
    }: EffectBoxProps = $props();

</script>

{#if effect}
<div class="la-effectbox la-bckg-card -fontsize1">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
        {name}
    </span>
    {#if hasFlow}
        <FlowButton
            name={getLocalized("LA.use.label")}
            flowClass={FlowClass.Effect}
        />
    {/if}
    <span>
        {effect}
    </span>
</div>
{/if}
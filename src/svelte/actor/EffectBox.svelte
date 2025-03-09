<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import type { EffectBoxProps } from "@/interfaces/actor/EffectBoxProps";
    import { getLocalized } from "@/scripts/helpers";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";

    const {
        children,
        name,
        effect,
        hasFlow,
        innerStyle,
        outerStyle,

        editOption,
        editPath,
    }: EffectBoxProps = $props();

</script>

{#if effect || children}
<div class="la-effectbox la-bckg-card la-brdr-repcap -widthfull -fontsize1 -bordersround-ltb {outerStyle?.join(' ')}">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
        {name}<!--
--->{#if editOption}
        <!-- TODO: allow edit details -->
        <button type="button" 
            class="fas fa-edit popout-text-edit-button" 
            data-path={editPath}
            aria-label={getLocalized("LA.edit.label")}>
        </button><!--
--->{/if}<!--
---></span>
    {#if hasFlow}
        <FlowButton
            text={getLocalized("LA.use.label")}
            flowClass={FlowClass.SendEffectToChat}
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
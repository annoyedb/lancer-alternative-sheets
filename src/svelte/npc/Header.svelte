<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Template from "@/svelte/npc/Template.svelte";
    import Stats from "@/svelte/npc/Stats.svelte";
    import { getExtraEffectsEnabled } from "@/scripts/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";

    const props = $props();
    const {
        actor,
        system,
        itemTypes,
    }: NPCSheetProps = $derived(props);

    const qualityMode = getExtraEffectsEnabled();
    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const templates = $derived(itemTypes.npc_template);
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
</script>

<div class="la-flexcol -widthfull -heightfull">
    <!-- Name & Templates -->
    <div class="la-bckg-primary -widthfull -height15
            {qualityMode ? 'la-bg-scroll-alt' : 'la-bg-alt'}"
    >
        <div class="la-flexcol -widthfull -heightfull -padding1-lr">
            <input type="text" 
                class="la-actorname__input la-text-header -upper -fontsize6 -textaligncenter -heightfull"
                name="name" 
                value="{actor.name}" 
                placeholder={getLocalized("LA.namePlaceholder")}
            />
            <div class="la-flexrow -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
            {#if templates.length}
            {#each templates as template, index}
                <Template
                    name={template.name}
                    uuid={template.uuid}
                    path={`itemTypes.npc_template.${index}`}
                    editOption={advancedOptions}
                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltip={getLocalized("LA.edit.tooltip")}
                />
            {/each}
            {/if}
            {#if system.class}
                <Template
                    name={system.class.name}
                    uuid={system.class.uuid}
                    path={`system.class`}
                    editOption={advancedOptions}
                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltip={getLocalized("LA.edit.tooltip")}
                />
            {/if}
            </div>
        </div>
    </div>

    <Stats {...props} />
</div>
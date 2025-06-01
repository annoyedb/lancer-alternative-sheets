<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Template from "@/svelte/npc/Template.svelte";
    import Stats from "@/svelte/npc/Stats.svelte";

    const props = $props();
    const {
        actor,
        system,
        itemTypes,
    }: NPCSheetProps = props;

    const templates = itemTypes.npc_template;
</script>

<div class="la-combine-v -widthfull -heightfull">
    <!-- Name & Templates -->
    <div class="la-bg-scroll-alt la-bckg-primary -widthfull -height10">
        <div class="la-combine-v -widthfull -heightfull -padding1-lr">
            <input 
                class="la-actorname__input la-text-header -upper -fontsize4 -textaligncenter"
                name="name" 
                type="text" 
                value="{actor.name}" 
                placeholder="{getLocalized("LA.namePlaceholder")}"
            />
            <div class="la-combine-h -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
            {#if templates.length}
            {#each templates as template, index}
                <Template
                    name={template.name}
                    uuid={template.uuid}
                    path={`itemTypes.npc_template.${index}`}
                />
            {/each}
            {/if}
            {#if system.class}
                <Template
                    name={system.class.name}
                    uuid={system.class.uuid}
                    path={`system.class`}
                />
            {/if}
            </div>
        </div>
    </div>

    <Stats {...props} />
</div>
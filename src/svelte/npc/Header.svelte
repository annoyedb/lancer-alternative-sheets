<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Template from "@/svelte/npc/Template.svelte";
    import Stats from "@/svelte/npc/Stats.svelte";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";

    const props = $props();
    const {
        actor,
        collapse,
        system,
        itemTypes,
    }: NPCSheetProps = props;

    let templates = itemTypes.npc_template;
</script>

<div class="la-combine-v -widthfull -heightfull">
    <div class="la-bckg-primary la-bg-scroll -widthfull -height10">
        <div class="la-combine-v -widthfull -heightfull -padding1-lr">
            <input 
                class="la-mechname__input la-text-header -upper -fontsize4 -textaligncenter"
                name="name" 
                type="text" 
                value="{actor.name}" 
                placeholder="{getLocalized("LA.namePlaceholder")}"
            />
            <div class="la-combine-h -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
            {#each templates as template, index}
                <Template
                    name={template.name}
                    uuid={template.uuid}
                    path={`itemTypes.npc_template.${index}`}
                />
            {/each}
                <Template
                    name={system.class.name}
                    uuid={system.class.uuid}
                    path={`system.class`}
                />
            </div>
        </div>
    </div>
    <Stats {...props} />
    <HeaderMain
        title={getLocalized("LA.tab.status.effects.label")}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}

        collapse={collapse}
        collapseID={`${actor.uuid}_status_activeeffects`}
        startCollapsed={false}

        collapseAllOption={true}
        >
        <ActiveEffects {...props} />
    </HeaderMain>
</div>
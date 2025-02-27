<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import Features from "@/svelte/npc/Features.svelte";


    const props = $props();
    const {
        actor,
        collapse,
    }: NPCSheetProps = props;
</script>

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
<Features {...props} />
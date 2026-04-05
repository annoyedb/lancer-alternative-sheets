<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { NPCStore } from "@/scripts/store/module-store";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import type { PinItem } from "@/interfaces/npc/PinInfo";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import TraitItem from "@/svelte/npc/TraitItem.svelte";
    import HeaderSecondary from "@/svelte/shared/header/HeaderSecondary.svelte";

    const {
        actor,
        traits,
    }: NPCSheetProps & {traits : Array<any>} = $props();

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const collID = `${actor.uuid}.traits`;
    const pinCollID = `${actor.uuid}.traits.pins`
    const nonpinCollID = `${actor.uuid}.traits.nonpins`

    let pinnedItems = $derived.by(() => {
        const serializedLIDs = NPCStore.get(actor.uuid).pinnedTraits;
        let pinned: any[] = [];
        let unpinned: any[] = [];
        traits.map((trait: any) => {
            if (serializedLIDs.includes(trait.system.lid))
                pinned.push(trait);
            else
                unpinned.push(trait);
        });
        return {pinned, unpinned} as PinItem;
    });
    let collapseAllButtonHover = $state(false);
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if traits.length}
<HeaderMain
    text={getLocalized("LA.npc.traits.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-action--downtime"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
    <div class="la-flexcol -gap0 -widthfull">
    <!-- Pinned -->
    {#if pinnedItems.pinned.length}
        <HeaderSecondary
            text={getLocalized("LA.pin.pinned.label")}
            headerStyle={["clipped-bot-alt la-bckg-primary -letterspacing0 la-text-header la-prmy-header -padding2-l -padding0-tb -fontsizemedium"]}

            collapseID={pinCollID}
            startCollapsed={false}
        >
            <div class="la-flexcol -gap0 -widthfull">
            {#each pinnedItems.pinned as trait}
                <TraitItem
                    actor={actor}
                    trait={trait}
                    pinned={true}
                ></TraitItem>
            {/each}
            </div>
        </HeaderSecondary>
        <div></div>
        <HeaderSecondary
            text={getLocalized("LA.pin.unpinned.label")}
            headerStyle={["clipped-bot-alt la-bckg-weapon -letterspacing0 la-text-header la-prmy-header -padding2-l -padding0-tb -fontsizemedium"]}

            collapseID={nonpinCollID}
            startCollapsed={false}
        >
            <div class="la-flexcol -gap0 -widthfull">
            {#each pinnedItems.unpinned as trait}
                <TraitItem
                    actor={actor}
                    trait={trait}
                    pinned={false}
                ></TraitItem>
            {/each}
            </div>
        </HeaderSecondary>
    {:else}
        <!-- Non-pinned -->
        {#each pinnedItems.unpinned as trait}
            <TraitItem
                actor={actor}
                trait={trait}
                pinned={false}
            ></TraitItem>
        {/each}
    {/if}
    </div>
</HeaderMain>
{/if}
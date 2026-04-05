<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { NPCStore } from "@/scripts/store/module-store";
    import type { PinItem } from "@/interfaces/npc/PinInfo";
    
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/shared/header/HeaderSecondary.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import TechAttackItem from "@/svelte/npc/TechAttackItem.svelte";

    const {
        actor,
        system,
        techs,
    }: NPCSheetProps & {techs : Array<any>} = $props();

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const collID = `${actor.uuid}.techs`;
    const pinCollID = `${actor.uuid}.techs.pins`
    const nonpinCollID = `${actor.uuid}.techs.nonpins`

    let pinnedItems = $derived.by(() => {
        const serializedLIDs = NPCStore.get(actor.uuid).pinnedTechs;
        let pinned: any[] = [];
        let unpinned: any[] = [];
        techs.map((reaction: any) => {
            if (serializedLIDs.includes(reaction.system.lid))
                pinned.push(reaction);
            else
                unpinned.push(reaction);
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

{#if techs.length}
<HeaderMain
    text={getLocalized("LA.npc.techAttacks.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--tech"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-action--tech -gap0"]}
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
            {#each pinnedItems.pinned as tech}
                <TechAttackItem
                    actor={actor}
                    system={system}
                    tech={tech}
                    pinned={true}
                ></TechAttackItem>
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
            {#each pinnedItems.unpinned as tech}
                <TechAttackItem
                    actor={actor}
                    system={system}
                    tech={tech}
                    pinned={false}
                ></TechAttackItem>
            {/each}
            </div>
        </HeaderSecondary>
    {:else}
        <!-- Non-pinned -->
        {#each pinnedItems.unpinned as tech}
            <TechAttackItem
                actor={actor}
                    system={system}
                    tech={tech}
                pinned={false}
            ></TechAttackItem>
        {/each}
    {/if}
    </div>
</HeaderMain>
{/if}
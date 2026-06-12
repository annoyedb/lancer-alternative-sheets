<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { NPCStore } from "@/scripts/store/module-store";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import type { PinItem } from "@/interfaces/npc/PinInfo";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import SystemItem from "./SystemItem.svelte";
    import HeaderSecondary from "@/svelte/shared/header/HeaderSecondary.svelte";

    const {
        actor,
        system, // The `system` object in the NPC object
        systems, // The actual NPC systems (the gameplay mechanic)
    }: NPCSheetProps & {systems : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    
    const tooltipEnabled = getNPCSheetTooltipEnabled(); 
    const collID = $derived(`${actor.uuid}.systems`);
    const pinCollID = $derived(`${actor.uuid}.systems.pins`)
    const nonpinCollID = $derived(`${actor.uuid}.systems.nonpins`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
    const pinnedItems = $derived.by(() => {
        const serializedLIDs = NPCStore.get(actor.uuid).pinnedSystems;
        let pinned: any[] = [];
        let unpinned: any[] = [];
        systems.map((component: any) => {
            if (serializedLIDs.includes(component.system.lid))
                pinned.push(component);
            else
                unpinned.push(component);
        });
        return {pinned, unpinned} as PinItem;
    });
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if systems.length}
<HeaderMain
    text={getLocalized("LA.systems.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-system"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden -upper"]}
    borderStyle={["la-brdr-system -gap0"]}
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
            headerStyle={["clipped-bot-alt la-bckg-primary -letterspacing0 la-text-header la-prmy-header -padding2-l -padding0-tb -fontsizemedium -fontface-stylized"]}

            collapseID={pinCollID}
            startCollapsed={false}
        >
            <div class="la-flexcol -gap0 -widthfull">
            {#each pinnedItems.pinned as component}
                <SystemItem
                    actor={actor}
                    system={system}
                    component={component}
                    pinned={true}
                ></SystemItem>
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
            {#each pinnedItems.unpinned as component}
                <SystemItem
                    actor={actor}
                    system={system}
                    component={component}
                    pinned={false}
                ></SystemItem>
            {/each}
            </div>
        </HeaderSecondary>
    {:else}
        <!-- Non-pinned -->
        {#each pinnedItems.unpinned as component}
            <SystemItem
                actor={actor}
                    system={system}
                    component={component}
                pinned={false}
            ></SystemItem>
        {/each}
    {/if}
    </div>
</HeaderMain>
{/if}
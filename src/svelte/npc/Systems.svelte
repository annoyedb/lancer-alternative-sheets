<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { NPCStore } from "@/scripts/store/module-store";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";

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
    const pinCollID = $derived(`${actor.uuid}.systems.pins`);
    const nonpinCollID = $derived(`${actor.uuid}.systems.nonpins`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));

    // Stable container refs; items are moved into these via placeItem rather than
    // re-rendered, so Foundry's directly-bound event listeners survive pin/unpin.
    const pinnedSet = $derived(new Set<string>(NPCStore.get(actor.uuid).pinnedSystems ?? []));
    const pinnedSystems = $derived(systems.filter((s: any) => pinnedSet.has(s.system.lid)));
    const hasPinned = $derived(pinnedSystems.length > 0);

    let pinnedContainer = $state<HTMLElement | undefined>();
    let unpinnedContainer = $state<HTMLElement | undefined>();
    let noSectionsContainer = $state<HTMLElement | undefined>();

    function placeItem(node: HTMLElement, container: HTMLElement | undefined) {
        container?.appendChild(node);
        return {
            update(newContainer: HTMLElement | undefined) {
                newContainer?.appendChild(node);
            },
            destroy() {
                node.remove();
            }
        };
    }
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
        <!-- No pins -->
        <div bind:this={noSectionsContainer}
            class="la-flexcol -gap0 -widthfull
                {hasPinned ? '-displaynone' : ''}"
        ></div>
        <!-- Pin/Unpinned -->
        <div class="-widthfull
                {hasPinned ? '' : '-displaynone'}"
        >
            <HeaderSecondary
                text={getLocalized("LA.pin.pinned.label")}
                headerStyle={["clipped-bot-alt la-bckg-primary -letterspacing0 la-text-header la-prmy-header -padding2-l -padding0-tb -fontsizemedium -fontface-stylized"]}
                collapseID={pinCollID}
                startCollapsed={false}
            >
                <div bind:this={pinnedContainer}
                    class="la-flexcol -gap0 -widthfull"
                ></div>
            </HeaderSecondary>
            <div></div>
            <HeaderSecondary
                text={getLocalized("LA.pin.unpinned.label")}
                headerStyle={["clipped-bot-alt la-bckg-weapon -letterspacing0 la-text-header la-prmy-header -padding2-l -padding0-tb -fontsizemedium"]}
                collapseID={nonpinCollID}
                startCollapsed={false}
            >
                <div bind:this={unpinnedContainer}
                    class="la-flexcol -gap0 -widthfull"
                ></div>
            </HeaderSecondary>
        </div>
        <!-- Staging area
            Items rendered here then immediately moved into the correct container above. -->
        <div
            class="-displaynone"
            aria-hidden="true"
        >
        {#each systems as component (component.uuid)}
            {@const container = hasPinned
                ? (pinnedSet.has(component.system.lid) ? pinnedContainer : unpinnedContainer)
                : noSectionsContainer}
            <div use:placeItem={container}
                class="-widthfull"
            >
                <SystemItem
                    actor={actor}
                    system={system}
                    component={component}
                    pinned={pinnedSet.has(component.system.lid)}
                />
            </div>
        {/each}
        </div>
    </div>
</HeaderMain>
{/if}

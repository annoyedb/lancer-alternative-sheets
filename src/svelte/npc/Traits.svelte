<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { NPCStore } from "@/scripts/store/module-store";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import TraitItem from "@/svelte/npc/TraitItem.svelte";
    import HeaderSecondary from "@/svelte/shared/header/HeaderSecondary.svelte";

    const {
        actor,
        traits,
    }: NPCSheetProps & {traits : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const collID = $derived(`${actor.uuid}.traits`);
    const pinCollID = $derived(`${actor.uuid}.traits.pins`);
    const nonpinCollID = $derived(`${actor.uuid}.traits.nonpins`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));

    const pinnedSet = $derived(new Set<string>(NPCStore.get(actor.uuid).pinnedTraits ?? []));
    const pinnedTraits = $derived(traits.filter((t: any) => pinnedSet.has(t.system.lid)));
    const hasPinned = $derived(pinnedTraits.length > 0);

    // Stable container refs; items are moved into these via placeItem rather than
    // re-rendered, so Foundry's directly-bound event listeners survive pin/unpin.
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
                headerStyle={["clipped-bot-alt la-bckg-primary -letterspacing0 la-text-header la-prmy-header -padding2-l -padding0-tb -fontsizemedium"]}
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
        {#each traits as trait (trait.uuid)}
            {@const container = hasPinned
                ? (pinnedSet.has(trait.system.lid) ? pinnedContainer : unpinnedContainer)
                : noSectionsContainer}
            <div use:placeItem={container}
                class="-widthfull"
            >
                <TraitItem
                    actor={actor}
                    trait={trait}
                    pinned={pinnedSet.has(trait.system.lid)}
                />
            </div>
        {/each}
        </div>
    </div>
</HeaderMain>
{/if}

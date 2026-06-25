<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { NPCStore } from "@/scripts/store/module-store";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/shared/header/HeaderSecondary.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import TechAttackItem from "@/svelte/npc/TechAttackItem.svelte";

    const {
        actor,
        system,
        techs,
    }: NPCSheetProps & {techs : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const collID = $derived(`${actor.uuid}.techs`);
    const pinCollID = $derived(`${actor.uuid}.techs.pins`);
    const nonpinCollID = $derived(`${actor.uuid}.techs.nonpins`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));

    // Stable container refs; items are moved into these via placeItem rather than
    // re-rendered, so Foundry's directly-bound event listeners survive pin/unpin.
    const pinnedSet = $derived(new Set<string>(NPCStore.get(actor.uuid).pinnedTechs ?? []));
    const pinnedTechs = $derived(techs.filter((t: any) => pinnedSet.has(t.system.lid)));
    const hasPinned = $derived(pinnedTechs.length > 0);

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
        {#each techs as tech (tech.uuid)}
            {@const container = hasPinned
                ? (pinnedSet.has(tech.system.lid) ? pinnedContainer : unpinnedContainer)
                : noSectionsContainer}
            <div use:placeItem={container}
                class="-widthfull"
            >
                <TechAttackItem
                    actor={actor}
                    system={system}
                    tech={tech}
                    pinned={pinnedSet.has(tech.system.lid)}
                />
            </div>
        {/each}
        </div>
    </div>
</HeaderMain>
{/if}

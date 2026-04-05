<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import WeaponItem from "@/svelte/npc/WeaponItem.svelte";

    const {
        actor,
        system,
        weapons,
    }: NPCSheetProps & {weapons : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    const tier = system.tier;

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const collID = `${actor.uuid}.weapons`;
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

{#if weapons.length}
<HeaderMain
    text={getLocalized("LA.weapons.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-weapon -gap0"]}
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
    {#each weapons as weapon, index}
        <WeaponItem
            actor={actor}
            tier={tier}
            weapon={weapon}
            index={index}
        ></WeaponItem>
    {/each}
    </div>
</HeaderMain>
{/if}
<script lang="ts">
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";

    const {
        actor,
        traits,
    }: NPCSheetProps & {traits : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
    const collID = `${actor.uuid}.traits`;

    function hasTraitSpecial(trait: any)
    {
        return trait.system.uses.max || isLoading(trait) || isRecharge(trait);
    }

    function isDestroyed(trait: any)
    {
        return trait.system.destroyed;
    }

    function getHeaderStyle(reaction: any)
    {
        return isDestroyed(reaction)
            ? "la-text-error la-anim-error horus--very--subtle -strikethrough"
            : "la-text-header la-anim-header";
    }

    function getIconStyle(reaction: any)
    {
        return isDestroyed(reaction)
            ? "la-text-repcap"
            : "la-text-header";
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if traits.length}
<HeaderMain
    text={getLocalized("LA.npc.traits.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
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
    <div class="la-combine-v -gap0 -widthfull">
    {#each traits as trait}
    {#snippet outerContent()}
        {#if !isDestroyed(trait)}
        <div class="-widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
                <ChargedBox
                    item={trait}
                />
                <LoadedBox
                    item={trait}
                />
                <LimitedBox
                    usesValue={trait.system.uses.value}
                    usesMax={trait.system.uses.max}
                />
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(trait), "cci", "cci-trait", "-fontsize5"]}
            iconBackgroundStyle={["-padding0-l", "-fontsize5", "la-anim-secondary", `${qualityMode ? "la-pulse-color" : "la-text-scrollbar-secondary"}`]}

            flowClass={FlowClass.SendEffectToChat}
            path={`itemTypes.npc_feature.${trait.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltip={trait.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(trait)}

            onPointerEnter={() => {effectButtonHover = true;}}
            onPointerLeave={() => {effectButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${trait.index}`}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={trait.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={trait.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(trait), "-fontsize1", "-overflowhidden"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (effectButtonHover)
                    return `--${getLocalized("LA.use.label")}`;
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            itemID={trait.lid}
            uuid={trait.uuid}
            path={`itemTypes.npc_feature.${trait.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={trait.uuid}
            startCollapsed={true}
            renderOutsideCollapse={hasTraitSpecial(trait) ? outerContent : undefined }

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}

                tooltipEnabled={tooltipEnabled}
            >
                {@html trait.system.effect}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={trait.system.on_hit}

                tooltipEnabled={tooltipEnabled}
            />
            <TagArray
                tags={trait.system.tags}
                path={`itemTypes.npc_feature.${trait.index}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
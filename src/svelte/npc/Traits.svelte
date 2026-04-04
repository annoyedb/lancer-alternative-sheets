<script lang="ts">
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";

    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";

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

    function renderOuter(trait: any)
    {
        return !isDestroyed(trait) && (trait.system.uses.max || isLoading(trait) || isRecharge(trait));
    }

    function isDestroyed(trait: any)
    {
        return trait.system.destroyed;
    }

    function getHeaderStyle(reaction: any)
    {
        return isDestroyed(reaction)
            ? "la-text-error la-prmy-error horus--very--subtle -strikethrough"
            : "la-text-header la-prmy-header";
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
    {#each traits as trait}
    {#snippet outerContent()}
        <div class="-widthfull -padding2-l">
            <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
                <!-- Rechargeable -->
                <ChargedBox
                    item={trait}
                    path={`itemTypes.npc_feature.${trait.index}.system.charged`}
                />
                <!-- Loading -->
                <LoadedBox
                    item={trait}
                    path={`itemTypes.npc_feature.${trait.index}.system.loaded`}
                />
                <!-- Limited -->
                <LimitedBox
                    usesValue={trait.system.uses.value}
                    usesMax={trait.system.uses.max}
                    path={`itemTypes.npc_feature.${trait.index}.system.uses`}
                />
            </div>
        </div>
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(trait), "cci cci-trait -fontsize7"]}
            iconBackgroundStyle={["-fontsize7 la-prmy-secondary", qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"]}

            flowClass={FlowClass.SendEffectToChat}
            path={`itemTypes.npc_feature.${trait.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltipDirection={TooltipDirection.UP}
            tooltip={trait.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}

            disabled={isDestroyed(trait)}

            onPointerEnter={() => {effectButtonHover = true;}}
            onPointerLeave={() => {effectButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <!-- Edit -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${trait.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.edit.tooltip")}

            onPointerEnter={() => {editButtonHover = true;} }
            onPointerLeave={() => {editButtonHover = false;} }
        >
            <i class="fas fa-ellipsis-v"></i>
        </GlyphButton>
        <!-- Send to Chat -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
            flowClass={FlowClass.SendEffectToChat}
            type={"trait"}
            index={trait.index}
            uuid={trait.uuid}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.chat.tooltip")}

            onPointerEnter={() => {messageButtonHover = true;} }
            onPointerLeave={() => {messageButtonHover = false;} }
        >
            <i class="mdi mdi-message"></i>
        </GlyphButton>
    {/snippet}
        <HeaderSecondary
            text={trait.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(trait), "-fontsizemedium -overflowhidden"]}
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
            renderOutsideCollapse={renderOuter(trait) ? outerContent : undefined }

            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
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
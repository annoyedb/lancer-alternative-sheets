<script lang="ts">
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { TooltipFactory } from "@/classes/TooltipFactory";
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
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";

    const {
        actor,
        system,
        techs,
    }: NPCSheetProps & {techs : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
    const tier = system.tier;
    const collID = `${actor.uuid}.techs`;
    const accuracyTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.accuracy.tooltip"));
    const attackTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.attackBonus.tooltip"));

    function getTechIcon(tech: any)
    {
        return tech.system.tech_type === "Full" ? "cci-tech-full" : "cci-tech-quick";
    }

    function getTechTipHeader(tech: any)
    {
        return tech.system.tech_type === "Full"
            ? getLocalized("LA.action.fullTech.label")
            : getLocalized("LA.action.quickTech.label");
    }

    function renderOuter(tech: any)
    {
        return !isDestroyed(tech) && (hasAccuracyBonus(tech) || hasAttackBonus(tech) || isLoading(tech) || isRecharge(tech) || tech.system.uses.max)
    }

    function hasAccuracyBonus(tech: any)
    {
        return tech.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(tech: any)
    {
        return tech.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(tech: any)
    {
        return tech.system.destroyed;
    }

    function getHeaderStyle(tech: any)
    {
        return isDestroyed(tech)
            ? "la-text-error la-prmy-error horus--very--subtle -strikethrough"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(tech: any)
    {
        return isDestroyed(tech)
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
    {#each techs as tech}
    {#snippet outerContent()}
        <div class="-widthfull -padding2-l">
            <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
                {#if hasAccuracyBonus(tech)}
                    <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -padding0-lr"
                        data-tooltip={accuracyTip}
                        data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                        data-tooltip-direction={"DOWN"}
                    >
                        {tech.system.accuracy[tier - 1]}
                        <i class="cci cci-accuracy -fontsize6"></i>
                    </span>
                {/if}
                {#if hasAttackBonus(tech)}
                    <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -padding0-lr"
                        data-tooltip={attackTip}
                        data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                        data-tooltip-direction={"DOWN"}
                    >
                        {tech.system.attack_bonus[tier - 1]}
                        <i class="cci cci-reticule -fontsize4"></i>
                    </span>
                {/if}
                <!-- Rechargeable -->
                <ChargedBox
                    item={tech}
                    path={`itemTypes.npc_feature.${tech.index}.system.charged`}
                />
                <!-- Loading -->
                <LoadedBox
                    item={tech}
                    path={`itemTypes.npc_feature.${tech.index}.system.loaded`}
                />
                <!-- Limited -->
                <LimitedBox
                    usesValue={tech.system.uses.value}
                    usesMax={tech.system.uses.max}
                    path={`itemTypes.npc_feature.${tech.index}.system.uses`}
                />
            </div>
        </div>
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <!-- Only 'tech attacks' need to pull up the tech attack flow, just 'use' otherwise -->
        <EffectButton
            iconStyle={["cci -fontsize7", getIconStyle(tech), getTechIcon(tech)]}
            iconBackgroundStyle={["-fontsize7 la-prmy-secondary", qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"]}

            flowClass={tech.system.attack_bonus.every((bonus: number) => bonus === 0) ? FlowClass.SendEffectToChat : FlowClass.RollTech}
            path={`itemTypes.npc_feature.${tech.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltipDirection={TooltipDirection.UP}
            tooltipHeader={getTechTipHeader(tech)}
            tooltip={tech.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}

            disabled={isDestroyed(tech)}

            onPointerEnter={() => {effectButtonHover = true;}}
            onPointerLeave={() => {effectButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <!-- Edit -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${tech.index}`}

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
            index={tech.index}
            uuid={tech.uuid}

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
            text={tech.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(tech), "-fontsizemedium"]}
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

            itemID={tech.id}
            uuid={tech.uuid}
            path={`itemTypes.npc_feature.${tech.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={tech.uuid}
            startCollapsed={true}
            renderOutsideCollapse={renderOuter(tech) ? outerContent : undefined }

            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
        >
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}

                tooltipEnabled={tooltipEnabled}
            >
                {@html tech.system.effect}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={tech.system.on_hit}

                tooltipEnabled={tooltipEnabled}
            />
            <TagArray
                tags={tech.system.tags}
                path={`itemTypes.npc_feature.${tech.index}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
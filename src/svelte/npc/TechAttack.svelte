<script lang="ts">
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipFactory } from "@/classes/TooltipFactory";
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
        system,
        techs,
    }: NPCSheetProps & {techs : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
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

    function hasTechSpecial(tech: any)
    {
        return isRecharge(tech) || tech.system.uses.max || isLoading(tech) || hasAccuracyBonus(tech) || hasAttackBonus(tech);
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
            ? "la-text-error la-anim-error horus--very--subtle -strikethrough"
            : "la-text-header la-anim-header";
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

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if techs.length}
<HeaderMain
    text={getLocalized("LA.npc.techAttacks.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--tech"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--tech", "-gap0"]}
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
    {#each techs as tech}
    {#snippet outerContent()}
        {#if !isDestroyed(tech)}
        <div class="-widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
                {#if hasAccuracyBonus(tech)}
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                        data-tooltip={accuracyTip}
                        data-tooltip-class={"clipped-bot la-tooltip"}
                        data-tooltip-direction={"DOWN"}
                    >
                        {tech.system.accuracy[tier - 1]}
                        <i class="cci cci-accuracy -fontsize4"></i>
                    </span>
                {/if}
                {#if hasAttackBonus(tech)}
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                        data-tooltip={attackTip}
                        data-tooltip-class={"clipped-bot la-tooltip"}
                        data-tooltip-direction={"DOWN"}
                    >
                        {tech.system.attack_bonus[tier - 1]}
                        <i class="cci cci-reticule -fontsize2"></i>
                    </span>
                {/if}
                <ChargedBox
                    item={tech}
                />
                <LoadedBox
                    item={tech}
                />
                <LimitedBox
                    usesValue={tech.system.uses.value}
                    usesMax={tech.system.uses.max}
                />
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(tech), "cci", getTechIcon(tech), "-fontsize5"]}

            flowClass={FlowClass.RollTech}
            path={`itemTypes.npc_feature.${tech.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltip={tech.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            tooltipHeader={getTechTipHeader(tech)}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(tech)}

            onPointerEnter={() => {effectButtonHover = true;}}
            onPointerLeave={() => {effectButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${tech.index}`}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={tech.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={tech.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(tech), "-fontsize1"]}
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
            renderOutsideCollapse={hasTechSpecial(tech) ? outerContent : undefined }

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
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
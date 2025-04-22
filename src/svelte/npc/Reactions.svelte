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
        system,
        reactions,
    }: NPCSheetProps & {reactions : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const tier = system.tier;
    const collID = `${actor.uuid}.reactions`;
    
    function getReactionTooltip(reaction: any): string 
    {
        if (reaction.system.effect)
            return `
                ${getLocalized("LA.trigger.label")}: ${reaction.system.trigger}
                <br><br>
                ${getLocalized("LA.mech.system.effect.label")}: ${reaction.system.effect}
                <br><br>
                ${getLocalized("LA.action.reaction.tooltip")}`;
        else
            return getLocalized("LA.action.reaction.tooltip");
    }

    function hasReactionSpecial(reaction: any)
    {
        return reaction.system.uses.max || isLoading(reaction) || isRecharge(reaction);
    }

    function hasAccuracyBonus(reaction: any)
    {
        return reaction.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(reaction: any)
    {
        return reaction.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(reaction: any)
    {
        return reaction.system.destroyed;
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

{#if reactions.length}
<HeaderMain
    text={getLocalized("LA.npc.reactions.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--reaction"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--reaction", "-gap0"]}
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
    {#each reactions as reaction}
    {#snippet outerContent()}
        {#if !isDestroyed(reaction)}
        <div class="-widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull -padding2-l">
                <ChargedBox
                    item={reaction}
                />
                <LoadedBox
                    item={reaction}
                />
                <LimitedBox
                    usesValue={reaction.system.uses.value}
                    usesMax={reaction.system.uses.max}
                />
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(reaction), "cci", "cci-reaction", "-fontsize5"]}

            flowClass={FlowClass.SendEffectToChat}
            path={`itemTypes.npc_feature.${reaction.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltip={getReactionTooltip(reaction)}
            tooltipHeader={getLocalized("LA.action.reaction.label")}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(reaction)}

            onPointerEnter={() => {effectButtonHover = true;}}
            onPointerLeave={() => {effectButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${reaction.index}`}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={reaction.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={reaction.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(reaction), "-fontsize1"]}
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

            itemID={reaction.id}
            uuid={reaction.uuid}
            path={`itemTypes.npc_feature.${reaction.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={reaction.uuid}
            startCollapsed={true}
            renderOutsideCollapse={hasReactionSpecial(reaction) ? outerContent : undefined }

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
        {#if hasAttackBonus(reaction) || hasAccuracyBonus(reaction)}
            <div class="la-combine-h -gap0 -widthfull">
                <EffectBox
                    name={getLocalized("LA.npc.attackBonus.label")}
                    outerStyle={[
                        `${hasAccuracyBonus(reaction) ? "-bordersround" : "-bordersround-ltb"}`, 
                    ]}

                    tooltipEnabled={tooltipEnabled}
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                        {reaction.system.attack_bonus[tier - 1]}
                        <i class="cci cci-reticule -fontsize2"></i>
                    </span>
                </EffectBox>
                <EffectBox
                    name={getLocalized("LA.npc.accuracy.label")}

                    tooltipEnabled={tooltipEnabled}
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                        {reaction.system.accuracy[tier - 1]}
                        <i class="cci cci-accuracy -fontsize4"></i>
                    </span>
                </EffectBox>
            </div>
        {/if}
            <EffectBox
                name={getLocalized("LA.trigger.label")}

                tooltipEnabled={tooltipEnabled}
            >
                {@html reaction.system.trigger}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={reaction.system.effect}

                tooltipEnabled={tooltipEnabled}
            />
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={reaction.system.on_hit}

                tooltipEnabled={tooltipEnabled}
            />
            <TagArray
                tags={reaction.system.tags}
                path={`itemTypes.npc_feature.${reaction.index}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
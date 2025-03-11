<script lang="ts">
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "../actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    const {
        actor,
        system,
        reactions,
    }: NPCSheetProps & {reactions : Array<any>} = $props();

    const tier = system.tier;
    let collID = `${actor.uuid}.reactions`;
    
    function getReactionTooltip(reaction: any)
    {
        if (!reaction.system.effect)
            return getLocalized("LA.action.reaction.tooltip");

        return `${reaction.system.trigger}<br><br>${reaction.system.effect}`;
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
/>
{/snippet}

{#if reactions.length}
<HeaderMain
    text={getLocalized("LA.npc.reactions.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--reaction"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--reaction", "-gap0"]}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each reactions as reaction}
    {#snippet outerContent()}
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
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(reaction), "cci", "cci-reaction", "-fontsize5"]}

            flowClass={FlowClass.SendEffectToChat}
            path={`itemTypes.npc_feature.${reaction.index}`}

            tooltip={getReactionTooltip(reaction)}
            tooltipHeader={getLocalized("LA.action.reaction.label")}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(reaction)}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${reaction.index}`}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={reaction.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
        />
    {/snippet}
        <HeaderSecondary
            text={reaction.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(reaction), "-fontsize1"]}
            borderStyle={["-bordersoff"]}

            itemID={reaction.id}
            uuid={reaction.uuid}
            path={`itemTypes.npc_feature.${reaction.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={reaction.uuid}
            startCollapsed={true}
            renderOutsideCollapse={hasReactionSpecial(reaction) ? outerContent : undefined}

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
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                        {reaction.system.attack_bonus[tier - 1]}
                        <i class="cci cci-reticule -fontsize2"></i>
                    </span>
                </EffectBox>
                <EffectBox
                    name={getLocalized("LA.npc.accuracy.label")}
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
            >
                <FlowButton
                    text={getLocalized("LA.use.label")}
                    flowClass={FlowClass.SendEffectToChat}
                    style={["clipped-bot", "la-bckg-secondary"]}
                />
                <hr>
                {@html reaction.system.trigger}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={reaction.system.effect}
            />
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={reaction.system.on_hit}
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
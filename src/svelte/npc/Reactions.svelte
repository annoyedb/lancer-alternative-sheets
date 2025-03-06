<script lang="ts">
    import HeaderMain from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        actor,
        collapse,
        system,
        reactions,
    }: NPCSheetProps & {reactions : Array<any>} = $props();

    const tier = system.tier;
    let collID = `${actor.uuid}_reactions`;
    
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
            ? "la-text-error horus--very--subtle -strikethrough"
            : "la-text-header";
    }
</script>

{#if reactions.length}
<HeaderMain
    title={getLocalized("LA.npc.reactions.label")}
    headerStyle={["la-bckg-action--reaction", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-action--reaction", "-gap0"]}
    
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}

    collapseAllOption={true}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each reactions as reaction}
    {#snippet limitedUses()}
        <div class="la-combine-h clipped-alt la-text-header la-bckg-header-anti -widthfull -margin2-l">
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
        <HeaderSecondary
            title={reaction.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={[getHeaderStyle(reaction), "-fontsize1"]}
            headerIconStyle={["cci", "cci-system", "-fontsize5", "-lineheight3", "-glow-primary-hover", "-glow-header"]}
            borderStyle={["-bordersoff"]}

            itemID={reaction.id}
            uuid={reaction.uuid}
            path={`itemTypes.npc_feature.${reaction.index}`}
            acceptTypes={"npc_feature"}
            
            collapse={collapse}
            collapseID={reaction}
            startCollapsed={true}
            renderOutsideCollapse={hasReactionSpecial(reaction) ? limitedUses : undefined}

            editOption={true}
            editStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}
            messageOption={true}
            messageUUID={reaction.uuid}
            messageStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}

            useEffectOption={true}
            useEffectTooltip={getReactionTooltip(reaction)}
            useEffectTooltipHeader={getLocalized("LA.action.reaction.label")}
            useEffectTooltipDirection={"UP"}
            useEffectBackgroundStyle={["-fontsize5", "-lineheight3", "la-text-scrollbar-secondary", "-padding0-l"]}
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
                    flowClass={FlowClass.SendToChatEffect}
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
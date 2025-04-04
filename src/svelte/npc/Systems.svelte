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
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    const {
        actor,
        system,
        systems,
    }: NPCSheetProps & {systems : Array<any>} = $props();
    
    const tier = system.tier;
    const collID = `${actor.uuid}.systems`;

    function hasComponentSpecial(component: any)
    {
        return component.system.uses.max || isLoading(component) || isRecharge(component)
    }

    function hasAccuracyBonus(component: any)
    {
        return component.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(component: any)
    {
        return component.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(component: any)
    {
        return component.system.destroyed;
    }

    function getHeaderStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-error la-anim-error horus--very--subtle -strikethrough"
            : "la-text-header la-anim-header";
    }

    function getIconStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-repcap"
            : "la-text-header";
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
/>
{/snippet}

{#if systems.length}
<HeaderMain
    text={getLocalized("LA.systems.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-system"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-system", "-gap0"]}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each systems as component}
    {#snippet outerContent()}
        {#if !isDestroyed(component)}
        <div class="-widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
                <ChargedBox
                    item={component}
                />
                <LoadedBox
                    item={component}
                />
                <LimitedBox
                    usesValue={component.system.uses.value}
                    usesMax={component.system.uses.max}
                />
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(component), "cci", "cci-system", "-fontsize5"]}

            flowClass={FlowClass.SendEffectToChat}
            path={`itemTypes.npc_feature.${component.index}`}

            tooltip={component.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(component)}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${component.index}`}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={component.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
        />
    {/snippet}
        <HeaderSecondary
            text={component.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(component), "-fontsize1"]}
            borderStyle={["-bordersoff"]}

            itemID={component.id}
            uuid={component.uuid}
            path={`itemTypes.npc_feature.${component.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={component.uuid}
            startCollapsed={true}
            renderOutsideCollapse={hasComponentSpecial(component) ? outerContent : undefined }

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
        {#if hasAttackBonus(component) || hasAccuracyBonus(component)}
            <div class="la-combine-h -gap0 -widthfull">
                <EffectBox
                    name={getLocalized("LA.npc.attackBonus.label")}
                    outerStyle={[
                        `${hasAccuracyBonus(component) ? "-bordersround" : "-bordersround-ltb"}`, 
                    ]}
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                        {component.system.attack_bonus[tier - 1]}
                        <i class="cci cci-reticule -fontsize2"></i>
                    </span>
                </EffectBox>
                <EffectBox
                    name={getLocalized("LA.npc.accuracy.label")}
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                        {component.system.accuracy[tier - 1]}
                        <i class="cci cci-accuracy -fontsize4"></i>
                    </span>
                </EffectBox>
            </div>
        {/if}
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
            >
                <FlowButton
                    text={getLocalized("LA.use.label")}
                    style={["clipped-bot", "la-bckg-secondary"]}

                    flowClass={FlowClass.SendEffectToChat}
                />
                <hr>
                {@html component.system.effect}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={component.system.on_hit}
            />
            <TagArray
                tags={component.system.tags}
                path={`itemTypes.npc_feature.${component.index}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
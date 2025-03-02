<script lang="ts">
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        actor,
        collapse,
        system,
        systems,
    }: NPCSheetProps & {systems : Array<any>} = $props();

    const tier = system.tier;
    let collID = `${actor.uuid}_systems`;

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
            ? "la-text-error horus--very--subtle -strikethrough"
            : "la-text-header";
    }
</script>

{#if systems.length}
<HeaderMain
    title={getLocalized("LA.systems.label")}
    headerStyle={["la-bckg-system", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-system", "-gap0"]}
    
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}

    collapseAllOption={true}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each systems as component}
    {#snippet limitedUses()}
        <div class="la-combine-h clipped-alt la-text-header la-bckg-header-anti -widthfull -margin2-l">
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
    {/snippet}
        <HeaderSecondary
            title={component.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={[getHeaderStyle(component), "-fontsize1"]}
            headerIconStyle={["cci", "cci-system", "-fontsize5", "-lineheight3", "-glow-primary-hover", "-glow-header"]}
            borderStyle={["-bordersoff"]}

            itemID={component.id}
            uuid={component.uuid}
            path={`itemTypes.npc_feature.${component.index}`}
            acceptTypes={"npc_feature"}
            
            collapse={collapse}
            collapseID={component}
            startCollapsed={true}
            renderOutsideCollapse={hasComponentSpecial(component) ? limitedUses : undefined}

            editOption={true}
            editStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}
            messageOption={true}
            messageUUID={component.uuid}
            messageStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}

            useEffectOption={true}
            useEffectTooltip={component.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            useEffectTooltipDirection={"UP"}
            useEffectBackgroundStyle={["-fontsize5", "-lineheight3", "la-text-scrollbar-secondary", "-padding0-l"]}
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
                    name={getLocalized("LA.use.label")}
                    flowClass={FlowClass.Effect}
                    style={["clipped-bot", "la-bckg-secondary"]}
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
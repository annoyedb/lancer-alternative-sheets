<script lang="ts">
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
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
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";

    const {
        actor,
        collapse,
        traits,
    }: NPCSheetProps & {traits : Array<any>} = $props();

    let collID = `${actor.uuid}.traits`;

    function hasTraitSpecial(trait: any)
    {
        return trait.system.uses.max || isLoading(trait) || isRecharge(trait);
    }

    function isDestroyed(trait: any)
    {
        return trait.system.destroyed;
    }

    function getHeaderStyle(trait: any)
    {
        return isDestroyed(trait)
            ? "la-text-error horus--very--subtle -strikethrough"
            : "la-text-header";
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
/>
{/snippet}

{#if traits.length}
<HeaderMain
    text={getLocalized("LA.npc.traits.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-action--downtime"]}
    
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each traits as trait}
    {#snippet limitedUses()}
        <div class="la-combine-h clipped-alt la-text-header la-bckg-header-anti -widthfull -margin2-l">
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
    {/snippet}
        <HeaderSecondary
            title={trait.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={[getHeaderStyle(trait), "-fontsize1"]}
            headerIconStyle={["cci", "cci-trait", "-fontsize5", "-lineheight3", "-glow-primary-hover", "-glow-header"]}
            borderStyle={["-bordersoff", ""]}

            itemID={trait.lid}
            uuid={trait.uuid}
            path={`itemTypes.npc_feature.${trait.index}`}
            acceptTypes={"npc_feature"}
            
            collapse={collapse}
            collapseID={trait}
            startCollapsed={true}
            renderOutsideCollapse={hasTraitSpecial(trait) ? limitedUses : undefined}

            editOption={true}
            editStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}
            messageOption={true}
            messageUUID={trait.uuid}
            messageStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}

            useEffectOption={true}
            useEffectTooltip={trait.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            useEffectTooltipDirection={"UP"}
            useEffectBackgroundStyle={["-fontsize5", "-lineheight3", "la-text-scrollbar-secondary", "-padding0-l"]}
        >
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
            >
                <FlowButton
                    text={getLocalized("LA.use.label")}
                    flowClass={FlowClass.SendToChatEffect}
                    style={["clipped-bot", "la-bckg-secondary"]}
                />
                <hr>
                {@html trait.system.effect}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={trait.system.on_hit}
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
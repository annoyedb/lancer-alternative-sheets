<script lang="ts">
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { SECONDARY_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EffectButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_BUTTON_STYLE } from "@/svelte/actor/button/EffectButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "../actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    const {
        actor,
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
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[HEADER_SECONDARY_ICON_BUTTON_STYLE, "cci", "cci-trait"]}

            flowClass={FlowClass.SendToChatEffect}
            path={`itemTypes.npc_feature.${trait.index}`}

            tooltip={trait.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            tooltipDirection={TooltipDirection.UP}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={trait.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
        />
    {/snippet}
        <HeaderSecondary
            text={trait.name}
            headerStyle={[SECONDARY_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(trait), "-fontsize1"]}
            borderStyle={["-bordersoff"]}

            itemID={trait.lid}
            uuid={trait.uuid}
            path={`itemTypes.npc_feature.${trait.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={trait.uuid}
            startCollapsed={true}
            renderOutsideCollapse={hasTraitSpecial(trait) ? limitedUses : undefined}

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
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
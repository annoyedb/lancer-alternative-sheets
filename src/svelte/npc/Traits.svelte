<script lang="ts">
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import FlowButton from "../actor/FlowButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        actor,
        collapse,
        traits,
    }: NPCSheetProps & {traits : Array<any>} = $props();

    let collID = `${actor.uuid}_traits`;
// let reactionCollID = `${actor.uuid}_reactions`;

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

{#if traits.length}
<HeaderMain
    title={getLocalized("LA.npc.traits.label")}
    headerStyle={["la-bckg-action--downtime", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-action--downtime", "-gap0"]}
    
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}

    collapseAllOption={true}
>
{#each traits as trait}
{#snippet limitedUses()}
    <div class="la-combine-h clipped-alt la-bckg-header-anti -widthfull -margin2-l">
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
        headerIconStyle={["cci", "cci-trait", "-fontsize5", "-lineheight3", "-glow-primary-hover"]}
        borderStyle={["-bordersoff"]}

        itemID={trait.lid}
        uuid={trait.uuid}
        path={`itemTypes.npc_feature.${trait.index}`}
        acceptTypes={"npc_feature"}
        
        collapse={collapse}
        collapseID={trait}
        startCollapsed={false}
        renderOutsideCollapse={trait.system.uses.max || trait.system.loaded ? limitedUses : undefined}

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
                name={getLocalized("LA.use.label")}
                flowClass={FlowClass.Effect}
                style={["clipped-bot", "la-bckg-secondary"]}
            />
            <hr>
            {@html trait.system.effect}
        </EffectBox>
        <EffectBox
            name={getLocalized("LA.effect.hit.label")}
            effect={trait.system.on_hit}
        />
    </HeaderSecondary>
{/each}
</HeaderMain>
{/if}
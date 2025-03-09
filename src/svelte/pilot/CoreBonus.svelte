<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { FlowClass } from "@/enums/FlowClass";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { SECONDARY_HEADER_STYLE, SECONDARY_ICON_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";

    const props: MechSheetProps = $props();
    const {
        collapse,
        pilot,
    } = props;
    
    let coreBonuses = pilot.itemTypes.core_bonus;
    let collID = `${pilot.uuid}.coreBonus`;
    
    function getActionCollID(index: number)
    {
        return `${pilot.uuid}.coreBonus.${index}.action`;
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
/>
{/snippet}

{#if coreBonuses.length}
<HeaderMain
    text={getLocalized("LA.pilot.coreBonus.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--downtime"]}

    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each coreBonuses as coreBonus, index}
        {#snippet headerSecondaryLeftOptions()}
        <i class="{SECONDARY_ICON_STYLE} cci cci-corebonus"></i>
        {/snippet}
        {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`system.pilot.value.itemTypes.core_bonus.${index}`}
            iconStyle={["-lineheight3"]}
        />
        {/snippet}
        <HeaderSecondary
            text={coreBonus.name}
            headerStyle={[SECONDARY_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["-fontsize2"]}
            borderStyle={["-bordersoff"]}
            
            rootStyle={["ref", "set"]}
            uuid={coreBonus.uuid}
            path={`system.pilot.value.itemTypes.core_bonus.${index}`}
            collapseID={`${collID}.${index}`}
            startCollapsed={true}

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <div class="la-generated -widthfull -gap2 la-combine-v">
            {#if coreBonus.system.counters.length}
            {#each coreBonus.system.counters as counter, jndex}
                <CounterBox
                    name={counter.name}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={`itemTypes.core_bonus.${index}.system.counters.${jndex}`}
                />
            {/each}
            {/if}
                <BonusBox
                    bonuses={coreBonus.system.bonuses}
                    bonusPath={`itemTypes.core_bonus.${index}.system.bonuses`}
                />
                <EffectBox
                    name={getLocalized("LA.mech.system.effect.label")}
                    effect={coreBonus.system.effect}
                />
                <ActionBox
                    actions={coreBonus.system.actions}
                    uuid={coreBonus.uuid}
                    path={`system.pilot.value.itemTypes.core_bonus.${index}.system.actions`}
                    collapse={collapse}
                    collapseID={getActionCollID(index)}
                    startCollapsed={false}
                />
                <DeployableBox
                    source={pilot}
                    lidSource={coreBonus.system}
                    collapse={collapse}
                />
            </div>
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
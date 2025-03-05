<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderMain from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";

    const props: MechSheetProps = $props();
    const {
        collapse,
        pilot,
    } = props;
    
    let coreBonuses = pilot.itemTypes.core_bonus;
    let collapseID = `${pilot.uuid}_corebonus`;
    let actionCollapseID = `${pilot.uuid}_corebonus_action`;
</script>

{#if coreBonuses.length}
<HeaderMain
    title={getLocalized("LA.pilot.coreBonus.label")}
    headerStyle={["la-bckg-action--downtime", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-action--downtime"]}

    collapse={collapse}
    collapseID={collapseID}
    startCollapsed={true}

    collapseAllOption={true}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each coreBonuses as coreBonus, index}
        <HeaderSecondary
            title={coreBonus.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={["-fontsize2"]}
            headerIconStyle={["cci", "cci-corebonus", "-fontsize5", "-lineheight3"]}
            borderStyle={["-bordersoff"]}
            
            rootStyle={["ref", "set"]}
            uuid={coreBonus.uuid}
            path={`system.pilot.value.itemTypes.core_bonus.${index}`}
            collapse={collapse}
            collapseID={coreBonus}
            startCollapsed={true}

            editOption={true}
            editIconStyle={["-lineheight3"]}
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
                    collapseID={actionCollapseID}
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
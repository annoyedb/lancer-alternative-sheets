<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "../actor/BonusBox.svelte";
    import EffectBox from "../actor/EffectBox.svelte";
    import ActionBox from "../actor/ActionBox.svelte";

    const props: MechSheetProps = $props();
    const {
        collapse,
        pilot,
    } = props;
    
    let talents = pilot.itemTypes.talent;
    let collapseID = `${pilot.uuid}_talents`;
</script>

{#if talents.length}
<HeaderMain
title={getLocalized("LA.pilot.talent.label")}
headerStyle={["la-bckg-action--downtime", "clipped-top", "-padding0-tb", "-padding3-lr"]}
headerFontStyle={["la-text-header", "-fontsize2"]}
borderStyle={["la-brdr-action--downtime"]}

collapse={collapse}
collapseID={collapseID}
startCollapsed={true}

spTextStyle={["la-text-header", "-fontsize2"]}
spIconStyle={["la-text-header", "-fontsize5", "-lineheight3", "-width3"]}
>
{#each talents as talent, index}
    <HeaderSecondary
        title={`${talent.name} ${talent.system.curr_rank}`}
        headerStyle={["la-bckg-primary", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
        headerFontStyle={["-fontsize2"]}
        headerIconStyle={["cci", "cci-license", "-fontsize5", "-lineheight3"]}
        borderStyle={["-borderoff"]}
        
        rootStyle={["ref", "set"]}
        uuid={talent.uuid}
        path={`system.pilot.value.itemTypes.talent.${index}`}
        collapse={collapse}
        collapseID={talent}
        startCollapsed={false}

        editOption={true}
        editIconStyle={["-lineheight3"]}
    >
    {#each talent.system.ranks as rank, jndex}
    {#if jndex < talent.system.curr_rank}
        <HeaderSecondary
            title={rank.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={["-fontsize2"]}
            headerIconStyle={["cci", "cci-talent", "-fontsize5", "-lineheight3"]}
            borderStyle={["la-brdr-pilot"]}

            rootStyle={["ref", "set"]}
            uuid={talent.uuid}
            collapse={collapse}
            collapseID={rank}
            startCollapsed={false}

            messageOption={true}
            messageType="rank"
            messageIndex={jndex}
            messageUUID={talent.uuid}
        >
            <div class="la-generated -widthfull -gap1 la-combine-v">
            {#if rank.counters.length}
            {#each rank.counters as counter, kndex}
                <CounterBox
                    name={counter.name}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={`itemTypes.talent.${index}.system.ranks.${jndex}.counters.${kndex}`}
                />
            {/each}
            {/if}
                <BonusBox
                    bonuses={rank.bonuses}
                    bonusPath={`itemTypes.talent.${index}.system.ranks.${jndex}.bonuses`}
                />
                <EffectBox
                    name={getLocalized("LA.pilot.trait.label")}
                    effect={rank.description}
                />
                <ActionBox
                    actions={rank.actions}
                    path={`itemTypes.talent.${index}.system.ranks.${jndex}.actions`}
                />
            </div>
        </HeaderSecondary>
    {/if}
    {/each}
    </HeaderSecondary>
{/each}
</HeaderMain>
{/if}
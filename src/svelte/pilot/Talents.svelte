<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "../actor/BonusBox.svelte";
    import EffectBox from "../actor/EffectBox.svelte";
    import ActionBox from "../actor/ActionBox.svelte";

    const props: MechSheetProps = $props();
    const {
        actor,
        collapse,
        pilot,
    } = props;
    
    let talents = pilot.itemTypes.talent;
    let collapseID = `${pilot.uuid}_talents`;
    let actionCollapseID = `${pilot.uuid}_talents_action`;

    function forceUpdateTalent(event: MouseEvent, _talent: any)
    {
        event.stopPropagation();
        if (actor.type === "pilot")
        {
            return;
        }
        console.log(pilot.items, pilot.itemTypes, _talent);
    }

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
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

    collapseAllOption={true}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each talents as talent, index}
        <HeaderSecondary
            title={`${talent.name} ${talent.system.curr_rank}`}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={["-fontsize2"]}
            headerIconStyle={["cci", "cci-license", "-fontsize5", "-lineheight3"]}
            borderStyle={["-bordersoff"]}
            
            rootStyle={["ref", "set", "lancer-talent", "submajor"]}
            uuid={talent.uuid}
            path={`system.pilot.value.itemTypes.talent.${index}`}
            collapse={collapse}
            collapseID={talent}
            startCollapsed={false}

            editOption={true}
            editIconStyle={["-lineheight3"]}

            collapseAllOption={true}
        >
            <div class="la-combine-v -gap0 -widthfull">
            {#each talent.system.ranks as rank, jndex}
            {#if jndex < talent.system.curr_rank}
                <HeaderSecondary
                    title={rank.name}
                    headerStyle={["la-bckg-header-anti", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
                    headerFontStyle={["-fontsize2"]}
                    headerIconStyle={["cci", "cci-talent", "-fontsize5", "-lineheight3"]}
                    borderStyle={["la-brdr-header-anti"]}

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
                    <div class="la-generated -widthfull -gap2 la-combine-v">
                    {#if rank.counters.length}
                    {#each rank.counters as counter, kndex}
                        <CounterBox
                            name={counter.name}
                            usesValue={counter.value}
                            usesMax={counter.max}
                            path={`system.pilot.value.itemTypes.talent.${index}.system.ranks.${jndex}.counters.${kndex}`}
                            onClick={(event) => forceUpdateTalent(event, talent)}
                        />
                    {/each}
                    {/if}
                        <BonusBox
                            bonuses={rank.bonuses}
                            bonusPath={`system.pilot.value.itemTypes.talent.${index}.system.ranks.${jndex}.bonuses`}
                        />
                        <EffectBox
                            name={getLocalized("LA.pilot.trait.label")}
                            effect={rank.description}
                        />
                        <ActionBox
                            actions={rank.actions}
                            uuid={talent.uuid}
                            path={`system.ranks.${jndex}.actions`}
                            collapse={collapse}
                            collapseID={actionCollapseID}
                            startCollapsed={false}
                        />
                    </div>
                </HeaderSecondary>
            {/if}
            {/each}
            </div>
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
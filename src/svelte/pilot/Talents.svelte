<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { getCollapseState } from "@/scripts/store/collapse";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";

    const props: MechSheetProps = $props();
    const {
        actor,
        pilot,
    } = props;
    
    const tooltipEnabled = getMechSheetTipEnabled();
    const isMechSheet = actor.type === "mech";
    const talents = pilot.itemTypes.talent;
    const collID = `${pilot.uuid}.talents`;

    function getTalentCollID(talentIndex: number)
    {
        return `${pilot.uuid}.talents.${talentIndex}`;
    }

    function getRankCollID(talentIndex: number, rankIndex: number)
    {
        return `${pilot.uuid}.talents.${talentIndex}.ranks.${rankIndex}`;
    }
    
    function getActionCollID(talentIndex: number, rankIndex: number)
    {
        return `${pilot.uuid}.talents.${talentIndex}.ranks.${rankIndex}.action`;
    }

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
    function log(...args: any[])
    {
        console.log(...args);
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    logType={isMechSheet ? TextLogHook.MechHeader : undefined }
    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
/>
{/snippet}

{#if talents.length}
<HeaderMain
    text={getLocalized("LA.pilot.talent.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--downtime"]}

    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each talents as talent, index}
    {#snippet headerSecondaryTalentLeftOptions()}
        <i class="{H2_ICON_SIZE} cci cci-license"></i>
    {/snippet}
    {#snippet headerSecondaryTalentRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            iconStyle={["-lineheight3"]}
            path={`system.pilot.value.itemTypes.talent.${index}`}

            tooltipEnabled={tooltipEnabled}
            logType={isMechSheet ? TextLogHook.MechHeader : undefined }
            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
        />
        <CollapseAllButton
            collapseID={getTalentCollID(index)}
            tooltipEnabled={tooltipEnabled}
            logType={isMechSheet ? TextLogHook.MechHeader : undefined }
            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
        />
    {/snippet}
        <HeaderSecondary
            text={`${talent.name} ${talent.system.curr_rank}`}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["-fontsize2"]}
            borderStyle={["-bordersoff"]}
            
            rootStyle={["ref", "set", "lancer-talent", "submajor"]}
            uuid={talent.uuid}
            path={`system.pilot.value.itemTypes.talent.${index}`}

            collapseID={getTalentCollID(index)}
            startCollapsed={true}

            headerContentLeft={headerSecondaryTalentLeftOptions}
            headerContentRight={headerSecondaryTalentRightOptions}
        >
            <div class="la-combine-v -gap0 -widthfull">
            {#each talent.system.ranks as rank, jndex}
            {#if jndex < talent.system.curr_rank}
                {#snippet outerContent()}
                    {#if rank.counters.length}
                    <div class="la-combine-v -widthfull -padding2-l
                        {getCollapseState(getRankCollID(index, jndex)) ? "" : "la-brdr-trait -borders-l -collapseFadeOut"}"
                    >
                    {#each rank.counters as counter, kndex}
                        <CounterBox
                            name={counter.name}
                            usesValue={counter.value}
                            usesMax={counter.max}
                            path={`system.pilot.value.itemTypes.talent.${index}.system.ranks.${jndex}.counters.${kndex}`}
                            onClick={(event) => forceUpdateTalent(event, talent)}
                            style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}
                            
                            logType={isMechSheet ? TextLogHook.MechHeader : undefined }
                            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
                        />
                    {/each}
                    </div>
                    {/if}
                {/snippet}
                {#snippet headerSecondaryRankLeftOptions()}
                    <i class="{H2_ICON_SIZE} cci cci-talent"></i>
                {/snippet}
                    {#snippet headerSecondaryRankRightOptions()}
                    <MessageButton
                        flowClass={FlowClass.SendToChat}
                        uuid={talent.uuid}
                        rank={jndex}

                        tooltipEnabled={tooltipEnabled}
                        logType={isMechSheet ? TextLogHook.MechHeader : undefined }
                        logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
                    />
                {/snippet}
                <HeaderSecondary
                    text={rank.name}
                    headerStyle={[H2_HEADER_STYLE, "la-bckg-header-anti"]}
                    textStyle={["-fontsize2"]}
                    borderStyle={["la-brdr-trait"]}

                    rootStyle={["ref", "set"]}
                    uuid={talent.uuid}
                    collapseID={getRankCollID(index, jndex)}
                    startCollapsed={false}
                    
                    renderOutsideCollapse={outerContent}
                    headerContentLeft={headerSecondaryRankLeftOptions}
                    headerContentRight={headerSecondaryRankRightOptions}
                >
                    <div class="la-generated -widthfull -gap2 la-combine-v">
                        <BonusBox
                            bonuses={rank.bonuses}
                            bonusPath={`system.pilot.value.itemTypes.talent.${index}.system.ranks.${jndex}.bonuses`}
                        />
                        <EffectBox
                            name={getLocalized("LA.pilot.trait.label")}
                            effect={rank.description}

                            tooltipEnabled={tooltipEnabled}
                            logType={isMechSheet ? TextLogHook.MechHeader : undefined }
                            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
                        />
                        <ActionBox
                            actions={rank.actions}
                            uuid={talent.uuid}
                            path={`system.ranks.${jndex}.actions`}

                            collapseID={getActionCollID(index, jndex)}
                            startCollapsed={false}

                            logType={isMechSheet ? TextLogHook.MechHeader : undefined }
                            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }
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
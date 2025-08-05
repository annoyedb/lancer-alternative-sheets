<script lang="ts">
    import { onMount } from "svelte";
    import { trackHook } from "@/scripts/store/hooks";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { getCollapseState } from "@/scripts/store/collapse";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";

    const {
        actor, // Source data (e.g. pilot)
        sheetActor, // Presenting actor (e.g. mech | pilot)
    } : {actor: any; sheetActor: any} = $props();
    let collapseAllButtonHoverTalent = $state(false);
    let collapseAllButtonHoverRank = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);
    
    const isMechSheet = sheetActor?.type === "mech" || false;
    const tooltipEnabled = isMechSheet ? getMechSheetTooltipEnabled() : getPilotSheetTooltipEnabled();
    const talents = actor.itemTypes.talent;
    const collID = `${sheetActor.uuid}.talents`;

    onMount(() => {
        if (isMechSheet)
            trackHook(sheetActor.uuid, Hooks.on("updateItem", (item: any, _caller: any, _options: any) => 
            {
                if (item.type !== "talent" || item.parent.uuid !== actor.uuid)
                    return;
                
                // (#6)
                // Also for some reason, this calls twice when updating an Items document
                Hooks.call("laForceRerender", sheetActor.uuid);
            }), "updateItem");
    });

    function getTalentCollID(talentIndex: number)
    {
        return `${collID}.${talentIndex}`;
    }

    function getRankCollID(talentIndex: number, rankIndex: number)
    {
        return `${collID}.${talentIndex}.ranks.${rankIndex}`;
    }
    
    function getActionCollID(talentIndex: number, rankIndex: number)
    {
        return `${collID}.${talentIndex}.ranks.${rankIndex}.action`;
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    logType={isMechSheet ? TextLogHook.MechHeader : undefined }
    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }

    onPointerEnter={() => {collapseAllButtonHoverTalent = true;}}
    onPointerLeave={() => {collapseAllButtonHoverTalent = false;}}
/>
{/snippet}

{#if talents.length}
<HeaderMain
    text={getLocalized("LA.pilot.talent.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--downtime"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHoverTalent)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}

    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each talents as talent, index}
    {#snippet headerSecondaryTalentLeftOptions()}
        <i class="{H2_ICON_SIZE} cci cci-compendium"></i>
    {/snippet}
    {#snippet headerSecondaryTalentRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-margin0-lr"]}
            iconStyle={["-lineheight3"]}
            path={ isMechSheet
                ? `system.pilot.value.itemTypes.talent.${index}`
                : `itemTypes.talent.${index}`
            }

            tooltipEnabled={tooltipEnabled}
            logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <CollapseAllButton
            collapseID={getTalentCollID(index)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }

            onPointerEnter={() => {collapseAllButtonHoverRank = true;}}
            onPointerLeave={() => {collapseAllButtonHoverRank = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={`${talent.name} ${talent.system.curr_rank}`}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["-fontsize2"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (collapseAllButtonHoverRank)
                    return `--${getLocalized("LA.collapseAll.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}
            
            rootStyle={["ref", "set", "lancer-talent", "submajor"]}
            uuid={talent.uuid}
            path={ isMechSheet
                ? `system.pilot.value.itemTypes.talent.${index}`
                : `itemTypes.talent.${index}`
            }

            collapseID={getTalentCollID(index)}
            startCollapsed={true}

            contentLeft={headerSecondaryTalentLeftOptions}
            contentRight={headerSecondaryTalentRightOptions}
        >
            <div class="la-combine-v -gap0 -widthfull">
            {#each talent.system.ranks as rank, jndex}
            {#if jndex < talent.system.curr_rank}
                {#snippet outerContent()}
                    {#if rank.counters.length}
                    <div class="la-combine-v -widthfull -padding2-l
                        {getCollapseState(getRankCollID(index, jndex)) ? "la-brdr-transparent -borders-l" : "la-brdr-trait -borders-l -collapse-fade-out"}"
                    >
                    {#each rank.counters as counter, kndex}
                        <CounterBox
                            text={counter.name}
                            type={CounterBoxType.Counter}
                            usesValue={counter.value}
                            usesMax={counter.max}
                            path={ isMechSheet
                                ? `system.pilot.value.itemTypes.talent.${index}.system.ranks.${jndex}.counters.${kndex}`
                                : `itemTypes.talent.${index}.system.ranks.${jndex}.counters.${kndex}`
                            }
                            style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}
                            
                            logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
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
                        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                        logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                        logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }

                        onPointerEnter={() => {messageButtonHover = true;}}
                        onPointerLeave={() => {messageButtonHover = false;}}
                    />
                {/snippet}
                <HeaderSecondary
                    text={rank.name}
                    headerStyle={[H2_HEADER_STYLE, "la-bckg-header-anti"]}
                    textStyle={["-fontsize2"]}
                    borderStyle={["la-brdr-trait"]}
                    extensionTextFunction={() => {
                        if (messageButtonHover)
                            return `--${getLocalized("LA.chat.extension")}`;
                        return undefined;
                    }}

                    rootStyle={["ref", "set"]}
                    uuid={talent.uuid}
                    collapseID={getRankCollID(index, jndex)}
                    startCollapsed={false}
                    
                    renderOutsideCollapse={outerContent}
                    contentLeft={headerSecondaryRankLeftOptions}
                    contentRight={headerSecondaryRankRightOptions}
                >
                    <div class="la-generated -widthfull -gap2 la-combine-v">
                        <BonusBox
                            bonuses={rank.bonuses}
                            bonusPath={ isMechSheet
                                ? `system.pilot.value.itemTypes.talent.${index}.system.ranks.${jndex}.bonuses`
                                : `itemTypes.talent.${index}.system.ranks.${jndex}.bonuses`
                            }
                        />
                        <EffectBox
                            name={getLocalized("LA.pilot.trait.label")}
                            effect={rank.description}

                            tooltipEnabled={tooltipEnabled}
                            logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                        />
                        <ActionBox
                            actions={rank.actions}
                            uuid={talent.uuid}
                            path={`system.ranks.${jndex}.actions`}

                            collapseID={getActionCollID(index, jndex)}
                            startCollapsed={false}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(sheetActor.uuid)}
                            logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                            logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
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
<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import { RESERVE_ICON_MAP } from "@/scripts/constants";

    const {
        actor,
        reserves
    } = $props();
    let collapseAllButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const collID = `${actor.uuid}.reserves`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();

    function getReservePath(index: number)
    {
        return `itemTypes.reserve.${index}`;
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

<HeaderMain
    text={getLocalized("LA.pilot.reserve.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-action--downtime"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-action--downtime"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
{#if reserves.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each reserves as reserve, index}
    {#snippet outerContent()}
    {#if reserve.system.counters.length}
        <div class="la-combine-v -gap0 -widthfull -padding2-l">
        {#if reserve.system.counters.length}
        {#each reserve.system.counters as counter, jndex}
            <CounterBox
                name={counter.name}
                usesValue={counter.value}
                usesMax={counter.max}
                path={`${getReservePath(index)}.system.counters.${jndex}`}
        
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {/each}
        {/if}
        </div>
    {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <i class="{H2_ICON_SIZE} cci {RESERVE_ICON_MAP[reserve.system.type]}"></i>
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getReservePath(index)}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={reserve.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={reserve.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["la-text-header", "la-anim-header", "-fontsize2", "-overflowhidden"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            itemID={reserve.lid}
            uuid={reserve.uuid}
            path={getReservePath(index)}
            acceptTypes={"reserve"}
            
            collapseID={reserve.uuid}
            startCollapsed={true}

            renderOutsideCollapse={outerContent}
            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <BonusBox
                bonuses={reserve.system.bonuses}
                bonusPath={`${getReservePath(index)}.system.bonuses`}
            />
            <DeployableBox
                source={actor}
                lidSource={reserve.system}
                uuid={actor.uuid}
                sheetUUID={actor.uuid}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <ActionBox
                actions={reserve.system.actions}
                uuid={reserve.uuid}
                path={`system.actions`}

                collapseID={`${reserve.uuid}.actions`}
                startCollapsed={true}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={reserve.system.description}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <TagArray 
                tags={reserve.system.tags}
                path={`${getReservePath(index)}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
{:else}
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable reserve"
        data-accept-types="reserve"
        data-path={`itemTypes.reserve.${reserves.length}`}
    >
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.pilot.reserve.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getLocalized("LA.pilot.reserve.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>
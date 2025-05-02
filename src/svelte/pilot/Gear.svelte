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
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";

    const {
        actor,
        gears
    } = $props();
    let collapseAllButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const collID = `${actor.uuid}.gears`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();

    function getGearPath(index: number)
    {
        return `system.loadout.gear.${index}.value`;
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
    text={getLocalized("LA.pilot.gear.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-system"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-system"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
{#if gears.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each gears as gear, index}
    {#snippet outerContent()}
    {#if gear.system.uses.max || gear.system.counters.length}
        <div class="la-combine-v -gap0 -widthfull -padding2-l">
        {#if gear.system.uses.max}
            <div class="la-combine-h clipped-bot-alt la-bckg-header-anti -widthfull">
                <LimitedBox
                    usesValue={gear.system.uses.value}
                    usesMax={gear.system.uses.max}
                    path={getGearPath(index)}
        
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            </div>
        {/if}
        {#if gear.system.counters.length}
        {#each gear.system.counters as counter, jndex}
            <CounterBox
                name={counter.name}
                usesValue={counter.value}
                usesMax={counter.max}
                path={`${getGearPath(index)}.system.counters.${jndex}`}
        
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {/each}
        {/if}
        </div>
    {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <i class="{H2_ICON_SIZE} cci cci-system"></i>
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getGearPath(index)}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={gear.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={gear.name}
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

            itemID={gear.lid}
            uuid={gear.uuid}
            path={getGearPath(index)}
            acceptTypes={"pilot_gear"}
            
            collapseID={gear.uuid}
            startCollapsed={true}

            renderOutsideCollapse={outerContent}
            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <BonusBox
                bonuses={gear.system.bonuses}
                bonusPath={`${getGearPath(index)}.system.bonuses`}
            />
            <DeployableBox
                source={actor}
                lidSource={gear.system}
                uuid={actor.uuid}
                sheetUUID={actor.uuid}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <ActionBox
                actions={gear.system.actions}
                uuid={gear.uuid}
                path={`system.actions`}

                collapseID={`${gear.uuid}.actions`}
                startCollapsed={true}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={gear.system.description}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <TagArray 
                tags={gear.system.tags}
                path={`${getGearPath(index)}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
{:else}
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable pilot_gear"
        data-accept-types="pilot_gear"
        data-path={`system.loadout.gear.${gears.length}.value`}
    >
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.pilot.gear.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getLocalized("LA.pilot.gear.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>
<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getDocumentTheme } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import LimitedBondBox from "@/svelte/pilot/LimitedBondBox.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

    const {
        actor,
        system,
    } = $props();
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const unlockedPowers = system.bond?.system.powers
        .map((power: any, index: number) => ({ ...power, index }))
        .filter((power: any) => power.unlocked) || [];
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
    const bondUUID = system.bond?.uuid;
    const collID = `${actor.uuid}.powers`;
    
    function getPowerCollapseID(index: number)
    {
        return `${actor.uuid}.powers.${index}`;
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, power: any)
    {
        event.stopPropagation();
        let chatData = {
            title: power.name, 
            description: power.description
        } as ChatData
        SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
    }
</script>

{#if system.bond}
{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getDocumentTheme(actor.uuid)}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}
<HeaderMain
    text={getLocalized("LA.pilot.bond.power.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-primary"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
{#if unlockedPowers.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each unlockedPowers as power}
    {#snippet outerContent()}
        {#if power.uses || power.frequency}
        <div class="la-combine-v -gap0 -widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-bckg-header-anti -widthfull">
            {#if power.uses}
                <LimitedBondBox
                    usesValue={power.uses.value}
                    usesMax={power.uses.max}
                    uuid={bondUUID}
                    power={power.index}
                />
            {/if}
            {#if power.frequency}
                <span class="la-text-header -aligncontentcenter -fontsize0 -upper">
                    {power.frequency}
                </span>
            {/if}
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={["la-text-header", "-fontsize4", "mdi", "mdi-weather-sunny"]}
            iconBackgroundStyle={["-fontsize5", "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}
            
            flowClass={FlowClass.BondPower}
            uuid={bondUUID}
            powerIndex={power.index}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            tooltipDirection={TooltipDirection.LEFT}
            tooltip={power.description}
            tooltipHeader={getLocalized("LA.pilot.bond.power.subLabel")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
                        
            onPointerEnter={() => {effectButtonHover = true;} }
            onPointerLeave={() => {effectButtonHover = false;} }
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <span class="la-combine-h -gap0 -padding2-r">
            {#if power.veteran}
            <span class="-fontsize0 -letterspacing0">
                {getLocalized("LA.pilot.bond.power.veteran.label")}
            </span>
            {/if}
            {#if power.master}
            <span class="-fontsize0 -letterspacing0">
                {getLocalized("LA.pilot.bond.power.master.label")}
            </span>
            {/if}
        </span>
        <MessageButton
            flowClass={FlowClass.None}
            uuid={power.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}

            onClick={event => sendToChat(event, power)}
        />
    {/snippet}
        <HeaderSecondary
            text={power.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["la-text-header", "la-prmy-header", "-fontsize2", "-overflowhidden"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (effectButtonHover)
                    return `--${getLocalized("LA.use.label")}`;
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                return undefined;
            }}

            itemID={power.lid}
            uuid={power.uuid}
            
            collapseID={getPowerCollapseID(power.index)}
            startCollapsed={true}

            renderOutsideCollapse={outerContent}
            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={power.description}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        </HeaderSecondary>
    {/each}
    </div>
{:else}
    <EmptyBox
        label={getLocalized("LA.pilot.bond.power.empty.label")}
        subLabel={getLocalized("LA.pilot.bond.power.empty.subLabel")}
    />
{/if}
</HeaderMain>
{/if}
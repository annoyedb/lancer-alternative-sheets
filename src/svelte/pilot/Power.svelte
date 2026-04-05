<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";

    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import LimitedBondBox from "@/svelte/pilot/LimitedBondBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import EmptyBox from "@/svelte/shared/EmptyBox.svelte";
    import { Logger } from "@/classes/Logger";

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
        if (actor?.uuid && power)
        {
            let chatData = {
                title: power.name, 
                description: power.description
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }
</script>

{#if system.bond}
{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}
<HeaderMain
    text={getLocalized("LA.pilot.bond.power.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
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
    <div class="la-flexcol -gap0 -widthfull">
    {#each unlockedPowers as power}
    {#snippet outerContent()}
        {#if power.uses || power.frequency}
        <div class="la-flexcol -gap0 -widthfull -padding2-l">
            <div class="la-flexrow clipped-bot-alt la-bckg-header-anti -widthfull">
            {#if power.uses}
                <LimitedBondBox
                    usesValue={power.uses.value}
                    usesMax={power.uses.max}
                    uuid={bondUUID}
                    power={power.index}
                />
            {/if}
            {#if power.frequency}
                <span class="la-text-header -aligncontentcenter -fontsizesmall -upper">
                    {power.frequency}
                </span>
            {/if}
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={["la-text-header -fontsize6 mdi mdi-weather-sunny"]}
            iconBackgroundStyle={[
                "-fontsize7 la-prmy-secondary", 
                qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"
            ]}
            
            flowClass={FlowClass.BondPower}
            uuid={bondUUID}
            powerIndex={power.index}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
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
        <span class="la-flexrow -gap0 -padding2-r">
            {#if power.veteran}
            <span class="-fontsizesmall -letterspacing0">
                {getLocalized("LA.pilot.bond.power.veteran.label")}
            </span>
            {/if}
            {#if power.master}
            <span class="-fontsizesmall -letterspacing0">
                {getLocalized("LA.pilot.bond.power.master.label")}
            </span>
            {/if}
        </span>
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
            flowClass={FlowClass.None}
            index={power.index}
            uuid={power.uuid}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.chat.tooltip")}
            logText={getLocalized("LA.chat.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onClick={event => sendToChat(event, power)}
            onPointerEnter={() => {messageButtonHover = true;} }
            onPointerLeave={() => {messageButtonHover = false;} }
        >
            <i class="mdi mdi-message"></i>
        </GlyphButton>
    {/snippet}
        <HeaderSecondary
            text={power.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["la-text-header la-prmy-header -fontsize4 -overflowhidden"]}
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
            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
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
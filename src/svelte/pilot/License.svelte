<script lang="ts">
    import { onMount } from "svelte";
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { AcceptType } from "@/enums/AcceptType";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { Logger } from "@/classes/Logger";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import EmptyBox from "@/svelte/shared/EmptyBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";

    const {
        actor,
        licenses
    } = $props();
    let collapseAllButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let licenseDescriptions = $state<string[]>([]);

    const collID = `${actor.uuid}.licenses`;
    const tooltipEnabled = getNPCSheetTooltipEnabled();

    onMount(() => {
        // Fetch license descriptions from the compendium's cold storage
        // and use Svelte's reactivity to update the UI
        licenses.forEach((license: any, index: number) => {
            fetchLicenseDescription(license, index);
        });
    });

    async function fetchLicenseDescription(license: any, index: number) 
    {
        try {
            const item = await (game.lancer as any).fromLid(license.system.key);
            const frame = await fromUuid(item.uuid) as any;
            updateLicenseDescription(index, frame?.system.description || "");
        } catch (error) {
            console.error(`Failed to fetch license description for index ${index}:`, error);
        }
    }

    function updateLicenseDescription(index: number, description: string) 
    {
        licenseDescriptions[index] = description;
    }

    function getLicensePath(index: number)
    {
        return `itemTypes.license.${index}`;
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, license: any, index: number)
    {
        event.stopPropagation();
        if (actor?.uuid && license)
        {
            let chatData = {
                title: `${license.name} ${license.system.curr_rank}`, 
                description: licenseDescriptions[index] || "",
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }
</script>

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
    text={getLocalized("LA.pilot.license.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-weapon"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
{#if licenses.length}
    <div class="la-flexcol -gap0 -widthfull">
    {#each licenses as license, index}
    {#snippet headerSecondaryLeftOptions()}
        <i class="{H2_ICON_SIZE} cci cci-license"></i>
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <span class="la-flexrow -gap0 -padding2-r">
            <span class="-fontsizesmall -letterspacing0">
                {getLocalized("LA.rank.label")}
            </span>
            {license.system.curr_rank}
        </span>
        <!-- Edit -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "-padding0-lr la-flexrow"]}
            flowClass={FlowClass.ContextMenu}
            path={getLicensePath(index)}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.edit.tooltip")}
            logText={getLocalized("LA.edit.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {editButtonHover = true;} }
            onPointerLeave={() => {editButtonHover = false;} }
        >
            <i class="fas fa-ellipsis-v"></i>
        </GlyphButton>
        <!-- Send to chat -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
            flowClass={FlowClass.None}
            index={index}
            uuid={license.uuid}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.chat.tooltip")}
            logText={getLocalized("LA.chat.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onClick={event => sendToChat(event, license, index)}
            onPointerEnter={() => {messageButtonHover = true;} }
            onPointerLeave={() => {messageButtonHover = false;} }
        >
            <i class="mdi mdi-message"></i>
        </GlyphButton>
    {/snippet}
        <HeaderSecondary
            text={`${license.system.manufacturer} ${license.name}`}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["la-text-header la-prmy-header -fontsize4 -overflowhidden"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            itemID={license.lid}
            uuid={license.uuid}
            path={getLicensePath(index)}
            acceptTypes={"license"}

            collapseID={license.uuid}
            startCollapsed={true}

            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
        >
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={licenseDescriptions[index]}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        </HeaderSecondary>
    {/each}
    </div>
{:else}
    <EmptyBox
        label={getLocalized("LA.pilot.license.empty.label")}
        subLabel={getLocalized("LA.pilot.license.empty.subLabel")}
        type={AcceptType.License}
        path="itemTypes.license.{licenses.length}"
    />
{/if}
</HeaderMain>
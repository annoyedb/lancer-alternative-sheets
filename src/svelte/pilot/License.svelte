<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import { onMount } from "svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";

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

    function fetchLicenseDescription(license: any, index: number) {
        getLicenseItem(license.system.key).then((item: any) => {
            getCompendiumFrame(item.uuid).then((frame: any) => {
                updateLicenseDescription(index, frame?.system.description);
            });
        });
    }

    function getLicenseItem(key: string): Promise<any> {
        return (game.lancer as any).fromLid(key);
    }

    function getCompendiumFrame(uuid: string): Promise<any> {
        return fromUuid(uuid);
    }

    function updateLicenseDescription(index: number, description: string) {
        licenseDescriptions[index] = description;
        licenseDescriptions = [...licenseDescriptions];
    }

    function getLicensePath(index: number)
    {
        return `itemTypes.license.${index}`;
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, license: any)
    {
        event.stopPropagation();
        let chatData = {
            title: `${license.name} ${license.system.curr_rank}`, 
            description: ""
        } as ChatData
        SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
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
    text={getLocalized("LA.pilot.license.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
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
    <div class="la-combine-v -gap0 -widthfull">
    {#each licenses as license, index}
    {#snippet headerSecondaryLeftOptions()}
        <i class="{H2_ICON_SIZE} cci cci-license"></i>
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <span class="la-combine-h -gap0 -padding2-r">
            <span class="-fontsize0 -letterspacing0">
                {getLocalized("LA.rank.label")}
            </span>
            {license.system.curr_rank}
        </span>
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getLicensePath(index)}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.None}
            uuid={license.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}

            onClick={event => sendToChat(event, license)}
        />
    {/snippet}
        <HeaderSecondary
            text={`${license.system.manufacturer} ${license.name}`}
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

            itemID={license.lid}
            uuid={license.uuid}
            path={getLicensePath(index)}
            acceptTypes={"license"}

            collapseID={license.uuid}
            startCollapsed={true}

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
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
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable license"
        data-accept-types="license"
        data-path={`itemTypes.license.${licenses.length}`}
    >
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.pilot.license.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getLocalized("LA.pilot.license.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>
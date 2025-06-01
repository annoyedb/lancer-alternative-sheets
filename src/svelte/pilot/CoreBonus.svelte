<script lang="ts">
    import { onMount } from "svelte";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { getLocalized } from "@/scripts/helpers";
    import { trackHook } from "@/scripts/store/hooks";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";

    const {
        actor,
        sheetActor,
    } : {actor: any; sheetActor: any} = $props();
    let collapseAllButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const isMechSheet = sheetActor?.type === "mech" || false;
    const coreBonuses = actor.itemTypes.core_bonus;
    const collID = `${sheetActor.uuid}.coreBonus`;
    
    onMount(() => {
        if (isMechSheet)
            trackHook(sheetActor.uuid, Hooks.on("updateItem", (item: any, _caller: any, _options: any) => 
            {
                if (item.type !== "core_bonus" || item.parent.uuid !== actor.uuid)
                    return;
                
                // (#6)
                // Also for some reason, this calls twice when updating an Items document
                Hooks.call("laForceRerender", sheetActor.uuid);
            }), "updateItem");
    });

    function getActionCollID(index: number)
    {
        return `${collID}.${index}.action`;
    }

    // (#4) Not a deployable but same idea
    function sendActionToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any)
    {
        event.stopPropagation();
        if (actor && action)
        {
            let description = `${action.detail}`;
            if (action.trigger)
                description = `${getLocalized("LA.trigger.label")}: ${action.trigger}<br><br>${getLocalized("LA.mech.system.effect.label")}: ${description}`;
            let chatData = {
                title: action.name, 
                description: description
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    logType={isMechSheet ? TextLogHook.MechHeader : undefined }
    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : undefined }

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if coreBonuses.length}
<HeaderMain
    text={getLocalized("LA.pilot.coreBonus.label")}
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
    <div class="la-combine-v -gap0 -widthfull">
    {#each coreBonuses as coreBonus, index}
        {#snippet outercontent()}
            {#if coreBonus.system.counters.length}
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull -padding2-l">
            {#each coreBonus.system.counters as counter, jndex}
                <CounterBox
                    text={counter.name}
                    type={CounterBoxType.Counter}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={isMechSheet
                        ? `system.pilot.value.itemTypes.core_bonus.${index}.system.counters.${jndex}`
                        : `itemTypes.core_bonus.${index}.system.counters.${jndex}`}
                    style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}

                    logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                />
            {/each}
            </div>
            {/if}
        {/snippet}
        {#snippet headerSecondaryLeftOptions()}
            <i class="{H2_ICON_SIZE} cci cci-corebonus"></i>
        {/snippet}
        {#snippet headerSecondaryRightOptions()}
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={ isMechSheet 
                    ? `system.pilot.value.itemTypes.core_bonus.${index}`
                    : `itemTypes.core_bonus.${index}`
                }
                iconStyle={["-lineheight3"]}
                
                tooltipEnabled={tooltipEnabled}
                logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }

                onPointerEnter={() => {editButtonHover = true;}}
                onPointerLeave={() => {editButtonHover = false;}}
            />
            <MessageButton
                flowClass={FlowClass.SendToChat}
                uuid={coreBonus.uuid}
    
                style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
                
                tooltipEnabled={tooltipEnabled}
                logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
    
                onPointerEnter={() => {messageButtonHover = true;}}
                onPointerLeave={() => {messageButtonHover = false;}}
            />
        {/snippet}
        <HeaderSecondary
            text={coreBonus.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["-fontsize2"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}
            
            rootStyle={["ref", "set"]}
            uuid={coreBonus.uuid}
            path={ isMechSheet 
                ? `system.pilot.value.itemTypes.core_bonus.${index}`
                : `itemTypes.core_bonus.${index}`
            }
            collapseID={`${collID}.${index}`}
            startCollapsed={true}

            renderOutsideCollapse={outercontent}
            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <div class="la-generated -widthfull -gap2 la-combine-v">
                <BonusBox
                    bonuses={coreBonus.system.bonuses}
                    bonusPath={`itemTypes.core_bonus.${index}.system.bonuses`}
                />
                <EffectBox
                    name={getLocalized("LA.mech.system.effect.label")}
                    effect={coreBonus.system.effect}

                    tooltipEnabled={tooltipEnabled}
                    logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                />
                <!-- TODO: maybe make a special action box or some condition that will handle getting the action... -->
                <ActionBox
                    actions={coreBonus.system.actions}
                    uuid={coreBonus.uuid}
                    path={ isMechSheet 
                        ? `system.pilot.value.itemTypes.core_bonus.${index}.system.actions`
                        : `itemTypes.core_bonus.${index}.system.actions`
                    }
                    collapseID={getActionCollID(index)}

                    startCollapsed={false}
                    onClick={sendActionToChat}

                    tooltipEnabled={tooltipEnabled}
                    logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                />
                <DeployableBox
                    source={actor}
                    lidSource={coreBonus.system}
                    uuid={actor.uuid}
                    sheetUUID={sheetActor?.uuid}

                    tooltipEnabled={tooltipEnabled}
                    logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                />
            </div>
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
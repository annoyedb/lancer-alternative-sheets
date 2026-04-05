<script lang="ts">
    import { onMount } from "svelte";
    import { Logger } from "@/classes/Logger";

    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import type { ChatData } from "@/interfaces/flows/ChatData";

    import { getLocalized } from "@/scripts/helpers";
    import { trackHook } from "@/scripts/store/hooks";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/shared/counter/CounterBox.svelte";
    import BonusBox from "@/svelte/shared/BonusBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import ActionBox from "@/svelte/shared/ActionBox.svelte";
    import DeployableBox from "@/svelte/shared/DeployableBox.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";

    const {
        actor, // Source data (e.g. pilot)
        sheetActor, // Presenting actor (e.g. mech | pilot)
    } : {actor: any; sheetActor: any} = $props();
    let collapseAllButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);

    const isMechSheet = sheetActor?.type === "mech" || false;
    const tooltipEnabled = isMechSheet ? getMechSheetTooltipEnabled() : getPilotSheetTooltipEnabled();
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
    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any)
    {
        event.stopPropagation();
        if (actor?.uuid && action)
        {
            let chatData = {
                title: action.name, 
                trigger: action.trigger,
                effect: action.detail
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }

    function getCoreBonusPath(index: number)
    {
        return isMechSheet 
            ? `system.pilot.value.itemTypes.core_bonus.${index}`
            : `itemTypes.core_bonus.${index}`
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
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
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
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
    <div class="la-flexcol -gap0 -widthfull">
    {#each coreBonuses as coreBonus, index}
        {#snippet outercontent()}
            {#if coreBonus.system.counters.length}
            <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull -padding2-l">
            {#each coreBonus.system.counters as counter, jndex}
                <CounterBox
                    text={counter.name}
                    type={CounterBoxType.Counter}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={isMechSheet
                        ? `system.pilot.value.itemTypes.core_bonus.${index}.system.counters.${jndex}`
                        : `itemTypes.core_bonus.${index}.system.counters.${jndex}`}
                    style={["clipped-bot-alt -widthfull la-bckg-header-anti"]}

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
            <!-- Edit -->
            <GlyphButton
                style={[H2_BUTTON_ICON_STYLE, "-padding0-lr la-flexcol"]}
                flowClass={FlowClass.ContextMenu}
                path={getCoreBonusPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltipDirection={TooltipDirection.UP}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.edit.tooltip")}
                logText={getLocalized("LA.edit.tooltip")}
                logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }

                onPointerEnter={() => {editButtonHover = true;} }
                onPointerLeave={() => {editButtonHover = false;} }
            >
                <i class="fas fa-ellipsis-v"></i>
            </GlyphButton>
            <!-- Send to chat -->
            <GlyphButton
                style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
                flowClass={FlowClass.SendToChat}
                index={index}
                uuid={coreBonus.uuid}

                tooltipEnabled={tooltipEnabled}
                tooltipDirection={TooltipDirection.UP}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.chat.tooltip")}
                logText={getLocalized("LA.chat.tooltip")}
                logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }

                onPointerEnter={() => {messageButtonHover = true;} }
                onPointerLeave={() => {messageButtonHover = false;} }
            >
                <i class="mdi mdi-message"></i>
            </GlyphButton>
        {/snippet}
        <HeaderSecondary
            text={coreBonus.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["-fontsize4"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}
            
            rootStyle={["ref set"]}
            uuid={coreBonus.uuid}
            path={ isMechSheet 
                ? `system.pilot.value.itemTypes.core_bonus.${index}`
                : `itemTypes.core_bonus.${index}`
            }
            collapseID={`${collID}.${index}`}
            startCollapsed={true}

            renderOutsideCollapse={outercontent}
            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
        >
            <div class="la-generated -widthfull -gap2 la-flexcol">
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
                <ActionBox
                    actions={coreBonus.system.actions}
                    actor={actor}
                    uuid={coreBonus.uuid}
                    path={ isMechSheet 
                        ? `system.pilot.value.itemTypes.core_bonus.${index}.system.actions`
                        : `itemTypes.core_bonus.${index}.system.actions`
                    }
                    collapseID={getActionCollID(index)}

                    startCollapsed={false}
                    onClick={sendToChat}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={getCSSDocumentTheme(sheetActor.uuid)}
                    logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                />
                <DeployableBox
                    source={actor}
                    lidSource={coreBonus.system}
                    uuid={actor.uuid}
                    sheetUUID={sheetActor?.uuid}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={getCSSDocumentTheme(sheetActor.uuid)}
                    logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
                    logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
                />
            </div>
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}
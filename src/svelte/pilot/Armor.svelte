<script lang="ts">
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { getDocumentTheme } from "@/scripts/theme";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { AcceptType } from "@/enums/AcceptType";
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
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

    const {
        actor,
        armors
    } = $props();
    let collapseAllButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let [armorBonuses, otherBonuses] = armors.map((armor: any) => {
        // Separate bonuses into armor-related and other-related categories
        return armor.system.bonuses.reduce(
            (bonusCategories: { armorBonuses: { [key: string]: any }; otherBonuses: { [key: string]: any } }, bonus: { lid: string; val: any }) => {
                const isArmorBonus = ["pilot_hp", "pilot_armor", "pilot_evasion", "pilot_edef", "pilot_speed"].includes(bonus.lid);
                const categoryKey = isArmorBonus ? "armorBonuses" : "otherBonuses";
                bonusCategories[categoryKey][bonus.lid] = bonus.val;
                return bonusCategories;
            },
            { armorBonuses: {}, otherBonuses: {} }
        );
    }).reduce(
        (
            [armorBns, otherBns]: [{ [key: string]: number }[], { [key: string]: number }[]],
            { armorBonuses, otherBonuses }: { armorBonuses: { [key: string]: number }; otherBonuses: { [key: string]: number } }
        ) => {
            // Accumulate armor-related and other-related bonuses
            if (Object.keys(armorBonuses).length > 0)
                armorBns.push(armorBonuses);
            if (Object.keys(otherBonuses).length > 0)
                otherBns.push(otherBonuses);
            return [armorBns, otherBns];
        },
        [[], []]
    );

    const collID = `${actor.uuid}.armors`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const healthTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.hardsuit.health.tooltip"));
    const evasionTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.hardsuit.evasion.tooltip"));
    const edefenseTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.hardsuit.edefense.tooltip"));
    const speedTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.hardsuit.speed.tooltip"));
    const armorTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.hardsuit.armor.tooltip"));

    function getArmorPath(index: number)
    {
        return `itemTypes.pilot_armor.${index}`;
    }
    
    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, armor: any)
    {
        event.stopPropagation();
        let chatData = {
            title: armor.name, 
            description: armor.system.description
        } as ChatData
        SendUnknownToChatBase.getInstance().startFlow(armor.uuid, chatData);
    }
</script>

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
    text={getLocalized("LA.armor.label")}
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
{#if armors.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each armors as armor, index}
    {#snippet outerContent()}
    {#if Object.keys(armorBonuses[index]).length}
        <div class="la-combine-v -gap0 -widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-bckg-header-anti -widthfull -justifyevenly">
                {#if armorBonuses[index].pilot_hp}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr -padding0-tb la-text-header -gap0"
                    data-tooltip={tooltipEnabled ? healthTip : undefined}
                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {armorBonuses[index].pilot_hp}
                    <i class="mdi mdi-heart-half-full -fontsize3"></i>
                </span>
                {/if}
                {#if armorBonuses[index].pilot_armor}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr la-text-header"
                    data-tooltip={tooltipEnabled ? armorTip : undefined}
                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {armorBonuses[index].pilot_armor}
                    <i class="cci cci-role-defender -fontsize4"></i>
                </span>
                {/if}
                {#if armorBonuses[index].pilot_evasion}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr la-text-header"
                    data-tooltip={tooltipEnabled ? evasionTip : undefined}
                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {armorBonuses[index].pilot_evasion}
                    <i class="cci cci-evasion -fontsize4"></i>
                </span>
                {/if}
                {#if armorBonuses[index].pilot_edef}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr la-text-header"
                    data-tooltip={tooltipEnabled ? edefenseTip : undefined}
                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {armorBonuses[index].pilot_edef}
                    <i class="cci cci-edef -fontsize4"></i>
                </span>
                {/if}
                {#if armorBonuses[index].pilot_speed}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr la-text-header"
                    data-tooltip={tooltipEnabled ? speedTip : undefined}
                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {armorBonuses[index].pilot_speed}
                    <i class="mdi mdi-arrow-right-bold-hexagon-outline -fontsize3"></i>
                </span>
                {/if}
            </div>
        {#if armor.system.counters.length}
        {#each armor.system.counters as counter, jndex}
            <CounterBox
                text={counter.name}
                type={CounterBoxType.Counter}
                usesValue={counter.value}
                usesMax={counter.max}
                path="{getArmorPath(index)}.system.counters.{jndex}"
        
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {/each}
        {/if}
        </div>
    {/if}
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <i class="{H2_ICON_SIZE} cci cci-pilot"></i>
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getArmorPath(index)}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.None}
            uuid={armor.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
            
            onClick={event => sendToChat(event, armor)}
        />
    {/snippet}
        <HeaderSecondary
            text={armor.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["la-text-header", "la-prmy-header", "-fontsize2", "-overflowhidden"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            itemID={armor.id}
            uuid={armor.uuid}
            path={getArmorPath(index)}
            acceptTypes={"pilot_armor"}
            
            collapseID={armor.uuid}
            startCollapsed={true}

            renderOutsideCollapse={outerContent}
            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
        >
            {#if otherBonuses.length}
            <BonusBox
                bonuses={otherBonuses}
                bonusPath={`${getArmorPath(index)}.system.bonuses`}
            />
            {/if}
            <DeployableBox
                source={actor}
                lidSource={armor.system}
                uuid={actor.uuid}
                sheetUUID={actor.uuid}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <ActionBox
                actions={armor.system.actions}
                uuid={armor.uuid}
                path={`system.actions`}

                collapseID={`${armor.uuid}.actions`}
                startCollapsed={true}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={armor.system.description}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        {#if armor.system.effect}
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={armor.system.effect}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        {/if}
            <TagArray 
                tags={armor.system.tags}
                path={`${getArmorPath(index)}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
{:else}
    <EmptyBox
        label={getLocalized("LA.pilot.hardsuit.empty.label")}
        subLabel={getLocalized("LA.pilot.hardsuit.empty.subLabel")}
        type={AcceptType.PilotArmor}
        path="system.loadout.armor.{armors.length}.value"
    />
{/if}
</HeaderMain>
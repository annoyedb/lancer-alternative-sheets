<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { formatString, getLocalized, isLoading } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { CHAT_CARD_COLOR_MAP } from "@/scripts/constants";
    import { ChatCardType } from "@/enums/ChatCardType";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { AcceptType } from "@/enums/AcceptType";

    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/shared/header/HeaderTertiary.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import AttackButton from "@/svelte/shared/button/AttackButton.svelte";
    import DamageButton from "@/svelte/shared/button/DamageButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import CounterBox from "@/svelte/shared/counter/CounterBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import ActionBox from "@/svelte/shared/ActionBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import SpCostArray from "@/svelte/shared/SPCostArray.svelte";
    import DeployableBox from "@/svelte/shared/DeployableBox.svelte";
    import BonusBox from "@/svelte/shared/BonusBox.svelte";
    import EmptyBox from "@/svelte/shared/EmptyBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";

    const {
        actor,
        weapons
    } = $props();
    let collapseAllButtonHover = $state(false);
    let attackButtonHover = $state(false);
    let damageButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);
    
    const collID = `${actor.uuid}.weapons`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
    
    function getWeaponPath(index: number)
    {
        return `system.loadout.weapons.${index}.value`
    }
    
    function getRollWeaponTip(weapon: any)
    {
        return formatString(
            getLocalized("LA.flow.rollAttack.template.tooltip"), 
            weapon.name);
    }

    function renderOuter(weapon: any)
    {
        return (
            weapon.system.sp || 
            isLoading(weapon) || 
            weapon.isLimited() ||
            weapon.system.counters.length
        );
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, weapon: any)
    {
        event.stopPropagation();
        if (actor?.uuid && weapon)
        {
            let range = "";
            weapon.system.range.map((rng: any) => {
                range += `<div class="la-flexrow">${rng.val}<i class="cci cci-${rng.type.toLowerCase()} -fontsize6"></i></div>`
            });
            let damage = "";
            weapon.system.damage.map((dmg: any) => {
                damage += `<div class="la-flexrow">${dmg.val}<i class="cci cci-${dmg.type.toLowerCase()} -fontsize6"></i></div>`;
            });
            const description = `
                <div>
                    ${weapon.system.description}
                </div>
                <hr>
                <div 
                    class="la-flexrow -justifyevenly clipped-alt -fontsize5 -padding0-tb -padding1-lr"
                    style="
                        background-color: var(--weapon-color);
                        color: var(--light-text);
                        align-items: baseline;
                    "
                >
                    ${range}
                    ${damage}
                </div>
            `;
            let chatData = {
                title: weapon.name, 
                description: description,
                trigger: weapon.system.trigger,
                effect: weapon.system.effect,
                onHit: weapon.system.on_hit,
                tags: weapon.system.tags,
                color: CHAT_CARD_COLOR_MAP[ChatCardType.Weapon],
            } as ChatData;
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
        logType={TextLogHook.PilotHeader}
        logTypeReset={TextLogHook.PilotHeaderReset}

        onPointerEnter={() => {collapseAllButtonHover = true;}}
        onPointerLeave={() => {collapseAllButtonHover = false;}}
    />
{/snippet}
<HeaderMain
    text={getLocalized("LA.weapons.label")}
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
{#if weapons.length}
    <div class="la-flexcol -gap0 -widthfull">
    {#each weapons as weapon, index}
    {#snippet outerContent()}
        <div class="la-flexcol -gap0 -widthfull -padding2-l">
        {#if isLoading(weapon) || weapon.isLimited() || weapon.system.sp}
            <div class="la-flexrow clipped-bot-alt la-bckg-header-anti -widthfull">
                <!-- Loading -->
                <LoadedBox
                    item={weapon}
                    path={getWeaponPath(index)}
                    
                    logType={TextLogHook.PilotHeader}
                    logTypeReset={TextLogHook.PilotHeaderReset}
                />
                <!-- Limited -->
                <LimitedBox
                    usesValue={weapon.system.uses.value}
                    usesMax={weapon.system.uses.max}
                    path={getWeaponPath(index)}

                    logType={TextLogHook.PilotHeader}
                    logTypeReset={TextLogHook.PilotHeaderReset}
                />
                <SpCostArray
                    cost={weapon.system.sp}
                />
            </div>
        {/if}
        <!-- Counters -->
        {#if weapon.system.counters.length}
        {#each weapon.system.counters as counter, jndex}
            <CounterBox
                text={counter.name}
                type={CounterBoxType.Counter}
                usesValue={counter.value}
                usesMax={counter.max}
                path="{getWeaponPath(index)}.system.counters.{jndex}"
        
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {/each}
        {/if}
        </div>
    {/snippet}
        {#snippet headerTertiaryLeftOptions()}
            <AttackButton
                iconStyle={[H3_ICON_SIZE, "la-text-header cci cci-weapon"]}
                iconBackgroundStyle={[
                    "la-prmy-secondary", 
                    H3_ICON_SIZE, 
                    qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"
                ]}

                flowClass={FlowClass.RollAttack}
                path={getWeaponPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                tooltipDirection={TooltipDirection.LEFT}
                tooltip={getRollWeaponTip(weapon)}
                logText={getRollWeaponTip(weapon)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {attackButtonHover = true;} }
                onPointerLeave={() => {attackButtonHover = false;} }
            />
        {/snippet}
        {#snippet headerTertiaryRightOptions()}
        <DamageButton
            iconBackgroundStyle={[
                "-fontsize9 la-prmy-secondary", 
                qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"
            ]}
            
            flowClass={FlowClass.RollDamage}
            range={weapon.system.range}
            damage={weapon.system.damage}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {damageButtonHover = true;} }
            onPointerLeave={() => {damageButtonHover = false;} }
        />
        <div class="la-flexcol -margin3-lr">
            <!-- Send to chat -->
            <GlyphButton
                style={[H2_BUTTON_ICON_STYLE]}
                flowClass={FlowClass.None}
                uuid={weapon.uuid}

                tooltipEnabled={tooltipEnabled}
                tooltipDirection={TooltipDirection.UP}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.chat.tooltip")}
                logText={getLocalized("LA.chat.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onClick={(event) => sendToChat(event, weapon)}
                onPointerEnter={() => {messageButtonHover = true;} }
                onPointerLeave={() => {messageButtonHover = false;} }
            >
                <i class="mdi mdi-message"></i>
            </GlyphButton>
            <!-- Edit -->
            <GlyphButton
                style={[H2_BUTTON_ICON_STYLE, "-padding0-lr la-flexrow -margin0-lr"]}
                flowClass={FlowClass.ContextMenu}
                path={getWeaponPath(index)}

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
        </div>
        {/snippet}
        <HeaderTertiary
            text={weapon.name}
            subText={getLocalized("LA.weapons.label")}
            subHeaderFontStyle={["la-text-header la-prmy-header -fontsizesmall"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (attackButtonHover)
                    return `--${getLocalized("LA.flow.rollAttack.extension")}`;
                if (damageButtonHover)
                    return `--${getLocalized("LA.flow.rollDamage.extension")}`;
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}
            headerStyle={[H3_HEADER_STYLE, "la-bckg-pilot"]}
            headerFontStyle={["la-text-header -fontsize4"]}

            itemID={weapon.id}
            uuid={weapon.uuid}
            path={getWeaponPath(index)}
            acceptTypes={"pilot_weapon"}

            collapseID={weapon.uuid}
            startCollapsed={true}

            renderOutsideCollapse={renderOuter(weapon) ? outerContent : undefined}
            contentLeft={headerTertiaryLeftOptions}
            contentRight={headerTertiaryRightOptions}
        >
            <BonusBox    
                bonuses={weapon.system.bonuses}
                bonusPath={`${getWeaponPath(index)}.system.bonuses`}
            />
            <DeployableBox
                source={actor}
                lidSource={weapon.system}
                uuid={actor.uuid}
                sheetUUID={actor.uuid}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <ActionBox
                actions={weapon.system.actions}
                actor={actor}
                uuid={weapon.uuid}
                path={`system.actions`}

                collapseID={`${weapon.uuid}.actions`}
                startCollapsed={true}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={weapon.system.description}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        {#if weapon.system.effect}
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={weapon.system.effect}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        {/if}
            <TagArray 
                tags={weapon.system.tags}
                path={`${getWeaponPath(index)}.system.tags`}
                justify={"start"}
            />
        </HeaderTertiary>
    {/each}
    </div>
    {:else}
        <EmptyBox
            label={getLocalized("LA.pilot.weapon.empty.label")}
            subLabel={getLocalized("LA.pilot.weapon.empty.subLabel")}
            type={AcceptType.PilotWeapon}
            path="system.loadout.weapons.{weapons.length}.value"
        />
    {/if}
</HeaderMain>
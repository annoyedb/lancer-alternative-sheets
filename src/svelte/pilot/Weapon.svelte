<script lang="ts">
    import { formatString, getLocalized, isLoading } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { AcceptType } from "@/enums/AcceptType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import LoadedBox from "@/svelte/actor/counter/LoadedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import DamageButton from "@/svelte/actor/button/DamageButton.svelte";
    import AttackButton from "@/svelte/actor/button/AttackButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import SpCostArray from "@/svelte/actor/SPCostArray.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import LimitedBox from "@/svelte/actor/counter/LimitedBox.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";
    import { getDocumentTheme } from "@/scripts/theme";

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
</script>

{#snippet headerOptions()}
    <CollapseAllButton
        collapseID={collID}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        logType={TextLogHook.PilotHeader}
        logTypeReset={TextLogHook.PilotHeaderReset}

        onPointerEnter={() => {collapseAllButtonHover = true;}}
        onPointerLeave={() => {collapseAllButtonHover = false;}}
    />
{/snippet}
<HeaderMain
    text={getLocalized("LA.weapons.label")}
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
{#if weapons.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each weapons as weapon, index}
    {#snippet outerContent()}
        <div class="la-combine-v -gap0 -widthfull -padding2-l">
        {#if isLoading(weapon) || weapon.isLimited() || weapon.system.sp}
            <div class="la-combine-h clipped-bot-alt la-bckg-header-anti -widthfull">
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
                iconStyle={[H3_ICON_SIZE, "la-text-header", "cci", "cci-weapon"]}
                iconBackgroundStyle={[H3_ICON_SIZE, "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}

                flowClass={FlowClass.RollAttack}
                path={getWeaponPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
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
            iconBackgroundStyle={["-fontsize7", "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}
            
            flowClass={FlowClass.RollDamage}
            range={weapon.system.range}
            damage={weapon.system.damage}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {damageButtonHover = true;} }
            onPointerLeave={() => {damageButtonHover = false;} }
        />
        <div class="la-combine-v -margin3-lr">
            <MessageButton
                flowClass={FlowClass.SendToChat}
                uuid={weapon.uuid}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {messageButtonHover = true;} }
                onPointerLeave={() => {messageButtonHover = false;} }
            />
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={getWeaponPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {editButtonHover = true;} }
                onPointerLeave={() => {editButtonHover = false;} }
            />
        </div>
        {/snippet}
        <HeaderTertiary
            text={weapon.name}
            subText={getLocalized("LA.weapons.label")}
            subHeaderFontStyle={["la-text-header", "la-prmy-header", "-fontsize0"]}
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
            headerFontStyle={["la-text-header", "-fontsize2"]}

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
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <ActionBox
                actions={weapon.system.actions}
                uuid={weapon.uuid}
                path={`system.actions`}

                collapseID={`${weapon.uuid}.actions`}
                startCollapsed={true}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
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
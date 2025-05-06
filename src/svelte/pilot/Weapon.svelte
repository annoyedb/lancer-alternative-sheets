<script lang="ts">
    import { formatString, getLocalized, isLoading } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import DamageButton from "@/svelte/actor/button/DamageButton.svelte";
    import AttackButton from "@/svelte/actor/button/AttackButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import SpCostArray from "@/svelte/actor/SPCostArray.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";

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

    function renderLimited(weapon: any)
    {
        return (
            weapon.system.sp || 
            isLoading(weapon) || 
            weapon.isLimited()
        );
    }
</script>

{#snippet headerOptions()}
    <CollapseAllButton
        collapseID={collID}
        tooltipEnabled={tooltipEnabled}
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
                <LoadedBox
                    item={weapon}
                    path={getWeaponPath(index)}
                    
                    logType={TextLogHook.PilotHeader}
                    logTypeReset={TextLogHook.PilotHeaderReset}
                />
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
        {#if weapon.system.counters.length}
        {#each weapon.system.counters as counter, jndex}
            <CounterBox
                name={counter.name}
                usesValue={counter.value}
                usesMax={counter.max}
                path={`${getWeaponPath(index)}.system.counters.${jndex}`}
        
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
                iconBackgroundStyle={[H3_ICON_SIZE, "la-anim-secondary", `${qualityMode ? "la-pulse-color" : "la-text-scrollbar-secondary"}`]}

                flowClass={FlowClass.RollAttack}
                path={getWeaponPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltip={getRollWeaponTip(weapon)}
                tooltipDirection={TooltipDirection.LEFT}
                logText={getRollWeaponTip(weapon)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {attackButtonHover = true;} }
                onPointerLeave={() => {attackButtonHover = false;} }
            />
        {/snippet}
        {#snippet headerTertiaryRightOptions()}
        <DamageButton
            iconBackgroundStyle={["-fontsize7", "la-anim-secondary", `${qualityMode ? "la-pulse-color" : "la-text-scrollbar-secondary"}`]}
            
            flowClass={FlowClass.RollDamage}
            range={weapon.system.range}
            damage={weapon.system.damage}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
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
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {messageButtonHover = true;} }
                onPointerLeave={() => {messageButtonHover = false;} }
            />
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={getWeaponPath(index)}

                tooltipEnabled={tooltipEnabled}
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
            subHeaderFontStyle={["la-text-header", "la-anim-header", "-fontsize0"]}
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

            renderOutsideCollapse={renderLimited(weapon) ? outerContent : undefined}
            headerContentLeft={headerTertiaryLeftOptions}
            headerContentRight={headerTertiaryRightOptions}
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
            <TagArray 
                tags={weapon.system.tags}
                path={`${getWeaponPath(index)}.system.tags`}
                justify={"start"}
            />
        </HeaderTertiary>
    {/each}
    </div>
    {:else}
        <details class="la-details -widthfull la-combine-v
                ref set drop-settable pilot_weapon"
            data-accept-types="pilot_weapon"
            data-path={`system.loadout.weapons.${weapons.length}.value`}
        >
            <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
                <div class="la-left la-combine-h">
                    <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                    <span class="la-name__span -fontsize2">{getLocalized("LA.pilot.weapon.empty.label")}</span>
                </div>
            </summary>
            <div class="la-details__wrapper -bordersround -bordersoff">
                <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getLocalized("LA.pilot.weapon.empty.subLabel")}</div>
            </div>
        </details>
    {/if}
</HeaderMain>
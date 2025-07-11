<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { SYSTEM_ICON_MAP, SYSTEM_LOCALIZE_MAP } from "@/scripts/constants";
    import { formatString, getLocalized } from "@/scripts/helpers";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { AcceptType } from "@/enums/AcceptType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import TotalSP from "@/svelte/actor/decoration/TotalSP.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import LimitedBox from "@/svelte/actor/counter/LimitedBox.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";
    import { getDocumentTheme } from "@/scripts/theme";

    const props: MechSheetProps = $props();  
    const {
        actor,
        system,
    } = props;
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
    const systemComponents = system?.loadout.systems?.filter((item: any) => item !== null);
    const collID = systemComponents.length
        ? `${actor.uuid}.systems`
        : `${actor.uuid}.systems.empty`;

    function renderOuter(component: any)
    {
        return !isDestroyed(component) && (component.value.system.uses.max)
    }
    
    function getActionCollID(index: number)
    {
        return `${actor.uuid}.systems.${index}.action`;
    }

    function isDestroyed(component: any)
    {
        return component.value.system.destroyed;
    }

    function getTitleStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-repcap la-prmy-accent -strikethrough"
            : "la-text-header la-prmy-accent";
    }

    function getSubtitleStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-error la-prmy-error horus--very--subtle"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(component: any)
    {
        let icon = SYSTEM_ICON_MAP[component.value.system.type] || "cci-system";
        return isDestroyed(component)
            ? `cci ${icon} la-text-repcap`
            : `cci ${icon} la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover`;
    }

    function getSPStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-repcap"
            : "la-text-header";
    }

    function getSubtitle(component: any)
    {
        return isDestroyed(component)
            ? getLocalized("LA.mech.system.destroyed.label")
            : getLocalized(SYSTEM_LOCALIZE_MAP[component.value.system.type]) || getLocalized("LA.mech.system.system.label");
    }

    function getComponentPath(index: number)
    {
        return `system.loadout.systems.${index}.value`;
    }
</script>

{#snippet emptySystems()}
<EmptyBox
    label={!system.loadout.sp.value ? getLocalized("LA.mech.system.empty.label") : getLocalized("LA.mech.system.undermounted.label")}
    subLabel={!system.loadout.sp.value ? getLocalized("LA.mech.system.empty.subLabel") : formatString(getLocalized("LA.mech.system.undermounted.subLabel"), (system.loadout.sp.max - system.loadout.sp.value).toString())}
    type={AcceptType.MechSystem}
    path="system.loadout.systems.{systemComponents.length}.value"
/>
{/snippet}

{#snippet headerOptions()}
<TotalSP
    value={system.loadout.sp.value}
    max={system.loadout.sp.max}
    
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getDocumentTheme(actor.uuid)}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}

    onPointerEnter={() => {collapseAllButtonHover = true;} }
    onPointerLeave={() => {collapseAllButtonHover = false;} }
/>
{/snippet}

{#if system.loadout.frame}
<HeaderMain
    text={getLocalized("LA.mech.system.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-system"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-system"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
{#if systemComponents?.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each systemComponents as component, index}
    {#snippet outerContent()}
        <div class="la-combine-v -gap0 -widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-bckg-header-anti -widthfull">
                <!-- Limited -->
                <LimitedBox
                    usesValue={component.value?.system.uses.value}
                    usesMax={component.value?.system.uses.max}
                    path={getComponentPath(index)}

                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            </div>
        </div>
    {/snippet}
    {#snippet headerTertiaryLeftOptions()}
        <EffectButton
            iconStyle={[H3_ICON_SIZE, getIconStyle(component)]}
            iconBackgroundStyle={[H3_ICON_SIZE, "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}
            
            flowClass={component.value.system.effect 
                ? FlowClass.SendEffectToChat 
                : FlowClass.SendToChat}
            path={getComponentPath(index)}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            tooltipDirection={TooltipDirection.LEFT}
            tooltip={component.value.system.effect}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
            
            disabled={isDestroyed(component)}
            
            onPointerEnter={() => {effectButtonHover = true;} }
            onPointerLeave={() => {effectButtonHover = false;} }
        />
    {/snippet}
    {#snippet headerTertiaryRightOptions()}
        <TotalSP
            value={component.value.system.sp}
            style={[getSPStyle(component)]}

            logText={getLocalized("LA.mech.system.points.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
        <div class="la-combine-v -margin3-lr">
            <MessageButton
                flowClass={FlowClass.SendToChat}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}

                onPointerEnter={() => {messageButtonHover = true;} }
                onPointerLeave={() => {messageButtonHover = false;} }
            />
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={getComponentPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}

                onPointerEnter={() => {editButtonHover = true;} }
                onPointerLeave={() => {editButtonHover = false;} }
            />
        </div>
    {/snippet}
        <HeaderTertiary
            itemID={component.value.id}
            uuid={component.value.uuid}
            path={getComponentPath(index)}
            acceptTypes={"mech_system"}
            collapseID={component.value.uuid}
            startCollapsed={true}

            text={component.value.name}
            headerStyle={[H3_HEADER_STYLE, "la-bckg-pilot"]}
            headerFontStyle={[getTitleStyle(component), "-fontsize2"]}

            subText={getSubtitle(component)}
            subHeaderFontStyle={[getSubtitleStyle(component), "-fontsize0"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (effectButtonHover)
                    return `--${getLocalized("LA.use.label")}`;
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            renderOutsideCollapse={renderOuter(component) ? outerContent : undefined }
            headerContentLeft={headerTertiaryLeftOptions}
            headerContentRight={headerTertiaryRightOptions}
        >
        {#if !isDestroyed(component)}
            <div class="la-generated -widthfull -gap2 la-combine-v">
                {#if component.value.system.counters?.length}
                <div class="la-combine-v -gap0 -widthfull -padding1-l">
                {#each component.value.system.counters as counter, jndex}
                    <CounterBox
                        text={counter.name}
                        type={CounterBoxType.Counter}
                        usesValue={counter.value}
                        usesMax={counter.max}
                        path="{getComponentPath(index)}.system.counters.{jndex}"
            
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                {/each}
                </div>
                {/if}
                <BonusBox
                    bonuses={component.value.system.bonuses}
                    bonusPath={`${getComponentPath(index)}.system.bonuses`}
                />
                <EffectBox
                    name={getLocalized("LA.mech.system.effect.label")}
                    effect={component.value.system.effect}

                    tooltipEnabled={tooltipEnabled}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <ActionBox
                    uuid={component.value.uuid}
                    actions={component.value.system.actions}
                    path={`system.actions`}

                    collapseID={getActionCollID(index)}
                    startCollapsed={false}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={getDocumentTheme(actor.uuid)}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <DeployableBox
                    source={actor}
                    lidSource={component.value.system}
                    uuid={component.value.uuid}
                    sheetUUID={actor.uuid}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={getDocumentTheme(actor.uuid)}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <TagArray 
                    tags={component.value.system.tags}
                    path={`${getComponentPath(index)}.system.tags`}
                    justify={"start"}
                />
            </div>
        {/if}
        </HeaderTertiary>
    {/each}
    {#if system.loadout.sp.value < system.loadout.sp.max}
        {@render emptySystems()}
    {/if}
    </div>
{:else}
    {@render emptySystems()}
{/if}
</HeaderMain>
{/if}
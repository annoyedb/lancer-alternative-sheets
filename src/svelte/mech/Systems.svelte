<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { SYSTEM_ICON_MAP, SYSTEM_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderTertiary, { HEADER_TERTIARY_ICON_BUTTON_STYLE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import TotalSP from "@/svelte/actor/decoration/TotalSP.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        collapse,
        system,
    } = props;

    // Unlinking leaves an array with null values; unsure if it's intended but it specifically breaks this sheet, and doesn't seem intended
    let systemComponents = system.loadout.systems.filter((item: any) => item !== null);
    let collID = systemComponents.length
        ? `${actor.uuid}.systems`
        : `${actor.uuid}.systems.empty`;
    
    function getActionCollID(index: number)
    {
        return `${actor.uuid}.systems.${index}.action`;
    }

    function getDestroyed(component: any)
    {
        return component.value.system.destroyed;
    }

    function getTitleStyle(component: any)
    {
        return getDestroyed(component)
            ? "la-text-repcap -strikethrough"
            : "la-text-header";
    }

    function getSubtitleStyle(component: any)
    {
        return getDestroyed(component)
            ? "la-text-error horus--very--subtle"
            : "la-text-header";
    }

    function getIconStyle(component: any)
    {
        let icon = SYSTEM_ICON_MAP[component.value.system.type] || "cci-system";
        return getDestroyed(component)
            ? `cci ${icon} la-text-repcap`
            : `cci ${icon}`;
    }

    function getSPStyle(component: any)
    {
        return getDestroyed(component)
            ? "la-text-repcap"
            : "la-text-header";
    }

    function getSubtitle(component: any)
    {
        return getDestroyed(component)
            ? getLocalized("LA.mech.system.destroyed.label")
            : getLocalized(SYSTEM_LOCALIZE_MAP[component.value.system.type]) || getLocalized("LA.mech.system.system.label");
    }

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
</script>

{#snippet headerOptions()}
<TotalSP
    value={system.loadout.sp.value}
    max={system.loadout.sp.max}
/>
<CollapseAllButton
    collapseID={collID}
/>
{/snippet}

{#if system.loadout.frame}
<HeaderMain
    text={getLocalized("LA.mech.system.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-system"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-system"]}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
{#if systemComponents.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each systemComponents as component, index}
    {#snippet headerTertiaryLeftOptions()}
        <EffectButton
            iconStyle={[HEADER_TERTIARY_ICON_BUTTON_STYLE, getIconStyle(component), "-glow-header", "-glow-primary-hover"]}
            iconBackgroundStyle={[HEADER_TERTIARY_ICON_BUTTON_STYLE, "la-text-scrollbar-secondary"]}
            
            flowClass={component.value.system.effect 
                ? FlowClass.SendEffectToChat 
                : FlowClass.SendToChat}
            path={`system.loadout.systems.${index}.value`}

            tooltip={component.value.system.effect || getLocalized("LA.chat.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
    {/snippet}
    {#snippet headerTertiaryRightOptions()}
        <TotalSP
            value={component.value.system.sp}
            textStyle={[getSPStyle(component)]}
            tooltip={getLocalized("LA.mech.system.points.tooltip")}
        />
        <div class="la-combine-v -margin3-lr">
            <MessageButton
                flowClass={FlowClass.SendToChat}
            />
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={`system.loadout.systems.${index}.value`}
            />
        </div>
    {/snippet}
        <HeaderTertiary
            itemID={component.value.id}
            uuid={component.value.uuid}
            path={`system.loadout.systems.${index}.value`}
            acceptTypes={"mech_system"}
            collapseID={component.value.uuid}
            startCollapsed={true}

            text={component.value.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0-tb", "la-text-header", "la-anim-accent"]}
            headerFontStyle={[getTitleStyle(component), "-fontsize2"]}

            subText={getSubtitle(component)}
            subHeaderFontStyle={[getSubtitleStyle(component), "-fontsize0", "la-anim-header"]}
            borderStyle={["-bordersoff"]}

            headerContentLeft={headerTertiaryLeftOptions}
            headerContentRight={headerTertiaryRightOptions}
        >
        {#if !getDestroyed(component)}
            <div class="la-generated -widthfull -gap2 la-combine-v">
            {#if component.value.system.uses.max}
                <div class="la-combine-h clipped-alt la-bckg-header-anti -margin2-l">
                    <LimitedBox
                        usesValue={component.value.system.uses.value}
                        usesMax={component.value.system.uses.max}
                        path={`system.loadout.systems.${index}.value`}
                    />
                </div>
            {/if}
            {#if component.value.system.counters?.length}
            {#each component.value.system.counters as counter, jndex}
                <CounterBox
                    name={counter.name}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={`system.loadout.systems.${index}.value.system.counters.${jndex}`}
                />
            {/each}
            {/if}
                <BonusBox
                    bonuses={component.value.system.bonuses}
                    bonusPath={`system.loadout.systems.${index}.value.system.bonuses`}
                />
                <EffectBox
                    name={getLocalized("LA.mech.system.effect.label")}
                    effect={component.value.system.effect}
                />
                <ActionBox
                    uuid={component.value.uuid}
                    actions={component.value.system.actions}
                    path={`system.actions`}
                    collapse={collapse}
                    collapseID={getActionCollID(index)}
                    startCollapsed={false}
                />
                <DeployableBox
                    source={actor}
                    lidSource={component.value.system}
                    collapse={collapse}
                />
            </div>
        {/if}
        </HeaderTertiary>
    {/each}
    </div>
{:else}
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable mech_system"
        data-accept-types="mech_system"
        data-path="system.loadout.systems.0.value">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.mech.system.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.mech.system.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>
{/if}
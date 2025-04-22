<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { getLocalized } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled, getSidebarExecutables, setSidebarExecutables } from "@/scripts/npc/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import MacroDropBox from '@/svelte/actor/dragdrop/MacroDropBox.svelte';

    const props = $props();
    const {
        actor,
    }: NPCSheetProps = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let sidebarExes = $state(getSidebarExecutables(actor.uuid));
    let collapseAllButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled(); 
    const activeEffectsCollID = `${actor.uuid}.status.activeEffects`;
    const utilitiesCollID = `${actor.uuid}.status.utilities`;
    const macrosCollID = `${actor.uuid}.status.macros`;
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={activeEffectsCollID}
    tooltipEnabled={tooltipEnabled}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}
<HeaderMain 
    text={getLocalized("LA.tab.status.effects.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}

    collapseID={activeEffectsCollID}
    startCollapsed={false}

    headerContent={headerOptions}
>
    <ActiveEffects { ...props }
        tooltipEnabled={tooltipEnabled}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset} 
    />
</HeaderMain>

<HeaderMain 
    text={getLocalized("LA.npc.utilities.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}

    collapseID={utilitiesCollID}
    startCollapsed={false}
>
    <div class="la-combine-v -gap0 -widthfull">
        <FlowButton 
            style={["clipped-alt", "-widthfull", "la-bckg-header-anti", "-padding0"]}
            text={getLocalized("LA.npc.recharge.label")}
            
            flowClass={FlowClass.RechargeFeatures}

            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.npc.recharge.tooltip")}
            tooltipHeader={getLocalized("LA.action.startofturn.label")}
            tooltipDirection={TooltipDirection.UP}
        />
        <div class="la-combine-h -wrapwrap -widthfull -gap0">
            <div class="la-combine-v -gap0 -flex1 -widthfull">
                <FlowButton 
                    style={["clipped-alt", "-widthfull", "la-bckg-secondary"]}
                    text={getLocalized("LA.flow.rollAttack.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"BasicAttack"}

                    tooltipEnabled={tooltipEnabled}
                    tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
                    tooltipDirection={TooltipDirection.UP}
                />
                <FlowButton 
                    style={["clipped-alt", "-widthfull", "la-bckg-secondary"]}
                    text={getLocalized("LA.flow.rollDamage.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Damage"}

                    tooltipEnabled={tooltipEnabled}
                    tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
                    tooltipDirection={TooltipDirection.UP}
                />
            </div>
            <div class="la-combine-v -gap0 -flex1 -widthfull">
                <FlowButton 
                    style={["clipped", "-widthfull", "la-bckg-secondary"]}
                    text={getLocalized("LA.flow.rollTechAttack.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"TechAttack"}

                    tooltipEnabled={tooltipEnabled}
                    tooltip={getLocalized("LA.flow.rollTechAttack.tooltip")}
                    tooltipDirection={TooltipDirection.UP}
                />
                <FlowButton
                    style={["clipped", "-widthfull", "la-bckg-secondary"]}
                    text={getLocalized("LA.flow.extinguish.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Burn"}

                    tooltipEnabled={tooltipEnabled}
                    tooltipHeader={getLocalized("LA.action.endofturn.label")}
                    tooltip={getLocalized("LA.flow.extinguish.tooltip")}
                    tooltipDirection={TooltipDirection.UP}
                />
            </div>
        </div>
    </div>
</HeaderMain>

<HeaderMain 
    text={getLocalized("LA.npc.macros.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}

    collapseID={macrosCollID}
    startCollapsed={false}
>
<!-- TODO: make tooltipEnabled respect a setting -->
    <MacroDropBox
        uuid={actor.uuid}
        getExes={sidebarExes}
        setExes={setSidebarExecutables}
        hintDropArea={false}
        allowDrop={advancedOptions}
        buttonStyle={[`${advancedOptions ? "-padding3-l" : ""}`]}
        tooltipEnabled={true}
    />
</HeaderMain>
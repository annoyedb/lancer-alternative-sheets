<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { formatString, getLocalized } from "@/scripts/helpers";
    import { getMechSheetLogActionMainEnabled, getMechSheetLogActionDontSaveCollapse, getMechSheetLogActionStartCollapsed } from "@/scripts/mech/settings";
    import { getMechSheetLogActionMainMaxHeight, getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";

    const props: MechSheetProps = $props();
    const {
        actor,
        system,
    } = props;
    let collapseAllButtonHover = $state(false);
    
    const tooltipEnabled = getMechSheetTooltipEnabled();
    const actionLogEnabled = getMechSheetLogActionMainEnabled();
    const actionLogMaxHeight = getMechSheetLogActionMainMaxHeight();
    const actionLogSaveCollapse = getMechSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getMechSheetLogActionStartCollapsed();
    const overchargeSequence = actor.system.overcharge_sequence.split(",");
    const overchargeStage = actor.system.overcharge;
    const overchargeText = formatString(getLocalized("LA.flow.overcharge.tooltip"), overchargeSequence[overchargeStage]);

    const collID = `${actor.uuid}.status.activeEffects`;
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

<div class="la-status__list la-combine-v -widthfull">
    {#if actionLogEnabled}
    <!-- Action Log -->
    <HeaderMain
        text={getLocalized("LA.tab.status.actionLog.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}
        extensionTextFunction={() => {      
            if (collapseAllButtonHover)
                return `--${getLocalized("LA.collapseAll.extension")}`;
            return undefined;
        }}

        collapseID={`${actor.uuid}.status.actionLog`}
        startCollapsed={false}
    >
        <ActionLog
            uuid={actor.uuid}
            maxHeight={actionLogMaxHeight}
            dontSaveCollapse={actionLogSaveCollapse}
            startCollapsed={actionLogStartCollapsed}
            collapsePrefix={ActionLogCollapsePrefix.MechSheet}
        />
    </HeaderMain>
    {/if}
    <!-- Active Effects -->
    <HeaderMain 
        text={getLocalized("LA.tab.status.effects.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}

        collapseID={collID}
        startCollapsed={false}

        headerContent={headerOptions}
    >
        <ActiveEffects { ...props }
            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset} 
        />
    </HeaderMain>
    <!-- Integrity -->
    <HeaderMain
        text={getLocalized("LA.tab.status.integrity.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}

        collapseID={`${actor.uuid}.status.integrity`}
        startCollapsed={false}
    >
        <div class="la-combine-v -widthfull -heightfull -padding0-r">
            <div class="la-combine-h -justifyevenly -wrapwrap -widthfull -heightfull -flex1">
                <!-- Structure -->
                <div class="la-combine-h -aligncenter">
                    <i class="cci cci-structure la-dropshadow -fontsize9 -displayinline"></i>
                    <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.structure.label")}</span>
                    <div class="la-combine-v -divider la-prmy-accent -fontsize4 -textaligncenter">
                        <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                        <span class="la-top__span -width2ch">{system.structure.value}</span><!--
                    ---><span class="la-bottom__span">{system.structure.max}</span>
                    </div>
                </div>
                <!-- Repair -->
                <div class="la-combine-h -aligncenter">
                    <i class="cci cci-repair la-dropshadow -fontsize9"></i>
                    <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.flow.repair.label")}</span>
                    <div class="la-combine-v -divider la-prmy-accent -fontsize4 -textaligncenter">
                        <input class="la-top__input -width2ch la-shadow -medium -inset la-text-text"
                            type="number" 
                            name="system.repairs.value"
                            data-dtype="Number" value={system.repairs.value}
                        />
                        <span class="la-bottom__span">{system.repairs.max}</span>
                    </div>
                </div>
                <!-- Stress -->
                <div class="la-combine-h -aligncenter">
                    <i class="cci cci-reactor la-dropshadow -fontsize9"></i>
                    <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.stress.label")}</span>
                    <div class="la-combine-v -divider la-prmy-accent -fontsize4 -textaligncenter">
                        <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                        <span class="la-top__span -width2ch">{system.stress.value}</span>
                        <span class="la-bottom__span">{system.stress.max}</span>
                    </div>
                </div>
                <!-- Burn -->
                <div class="la-combine-h -aligncenter">
                    <i class="cci cci-burn la-dropshadow -fontsize9"></i>
                    <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.burn.label")}</span>
                    <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                    <span class="la-value__button -fontsize4 -textaligncenter -width2ch">{system.burn}</span>
                </div>
                <!-- Overcharge -->
                <div class="la-combine-h -aligncenter">
                    <i class="cci cci-overcharge la-dropshadow -fontsize9"></i>
                    <div class="la-combine-v -divider la-prmy-accent -fontsize4 -textaligncenter">
                        <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                        <span class="la-top__span -widthfull">{overchargeSequence[overchargeStage]}</span>
                        <span class="la-bottom__span -fontsize1">{getLocalized("LA.flow.overcharge.label")}</span>
                    </div>
                </div>
            </div>
            <hr class="-widthfull"/>
            <div class="la-combine-h -gap0 -wrapwrap -justifybetween -widthfull -heightfull -flex0">
                <div class="la-combine-v -gap0 la-dropshadow -flex1 -widthfull">
                    <FlowButton
                        style={["clipped-alt", "-widthfull", "la-bckg-tabs", "-padding0"]}
                        text={getLocalized("LA.flow.structureDamage.label")}
    
                        uuid={actor.uuid}
                        flowClass={FlowClass.Standard}
                        flowType={"Structure"}
    
                        tooltipEnabled={tooltipEnabled}
                        tooltip={getLocalized("LA.flow.structureDamage.tooltip")}
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={getLocalized("LA.flow.structureDamage.tooltip")}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                    <FlowButton
                        style={["clipped-alt", "-widthfull", "la-bckg-tabs", "-padding0"]}
                        text={getLocalized("LA.flow.reactorStress.label")}
    
                        uuid={actor.uuid}
                        flowClass={FlowClass.Standard}
                        flowType={"Overheat"}
    
                        tooltipEnabled={tooltipEnabled}
                        tooltip={getLocalized("LA.flow.reactorStress.tooltip")}
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={getLocalized("LA.flow.reactorStress.tooltip")}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                    <FlowButton
                        style={["clipped-alt", "-widthfull", "la-bckg-tabs", "-padding0"]}
                        text={getLocalized("LA.flow.fullRepair.label")}
    
                        uuid={actor.uuid}
                        flowClass={FlowClass.Standard}
                        flowType={"FullRepair"}
    
                        tooltipEnabled={tooltipEnabled}
                        tooltip={getLocalized("LA.flow.fullRepair.tooltip")}
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={getLocalized("LA.flow.fullRepair.tooltip")}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                </div>
                <div class="la-combine-v -gap0 la-dropshadow -flex1">
                    <FlowButton 
                        style={["clipped", "-widthfull", "la-bckg-secondary"]}
                        text={getLocalized("LA.flow.overcharge.label")}

                        uuid={actor.uuid}
                        flowClass={FlowClass.Standard}
                        flowType={"Overcharge"}

                        tooltipEnabled={tooltipEnabled}
                        tooltipHeader={getLocalized("LA.action.overcharge.label")}
                        tooltip={overchargeText}
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={overchargeText}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                    <FlowButton
                        style={["clipped", "-widthfull", "la-bckg-secondary"]}
                        text={getLocalized("LA.flow.overchargeReset.label")}

                        uuid={actor.uuid}
                        flowClass={FlowClass.ResetOvercharge}

                        tooltipEnabled={tooltipEnabled}
                        tooltip={getLocalized("LA.flow.overchargeReset.tooltip")}
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={getLocalized("LA.flow.overchargeReset.tooltip")}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                    <FlowButton
                        style={["clipped", "-widthfull", "la-bckg-secondary"]}
                        text={getLocalized("LA.flow.stabilize.label")}
                        
                        uuid={actor.uuid}
                        flowClass={FlowClass.Standard}
                        flowType={"Stabilize"}
    
                        tooltipEnabled={tooltipEnabled}
                        tooltipHeader={getLocalized("LA.action.full.label")}
                        tooltip={getLocalized("LA.flow.stabilize.tooltip")}
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={getLocalized("LA.flow.stabilize.tooltip")}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
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
                        tooltipDirection={TooltipDirection.LEFT}
                        logText={getLocalized("LA.flow.extinguish.tooltip")}
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                    <!-- TODO: make a flow for partial repair -->
                </div>
            </div>
        </div>
    </HeaderMain>
</div>
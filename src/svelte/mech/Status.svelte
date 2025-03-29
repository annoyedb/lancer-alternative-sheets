<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { formatString, getLocalized } from "@/scripts/helpers";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import ActionLog from "../actor/ActionLog.svelte";
    import { getMechSheetLogActionMainEnabled } from "@/scripts/mech/settings";

    const props: MechSheetProps = $props();
    const {
        actor,
        system,
    } = props;
    const actionLogEnabled = getMechSheetLogActionMainEnabled();
    const overchargeSequence = actor.system.overcharge_sequence.split(",");
    const overchargeStage = actor.system.overcharge;
    const overchargeText = formatString(getLocalized("LA.flow.overcharge.tooltip"), overchargeSequence[overchargeStage]);

    const collID = `${actor.uuid}.status.activeEffects`;
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
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

        collapseID={`${actor.uuid}.status.actionLog`}
        startCollapsed={false}
    >
        <ActionLog
            id={actor.id}
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
        <ActiveEffects {...props} />
    </HeaderMain>
    <!-- Integrity -->
    <HeaderMain 
        text={getLocalized("LA.tab.status.structure.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}
        
        collapseID={`${actor.uuid}.status.structure`}
        startCollapsed={false}
    >
        <!-- Structure -->
        <div class="la-structure la-combine-h la-bckg-card -justifybetween">
            <!-- Info -->
            <div class="la-combine-h -aligncenter">
                <i class="cci cci-structure la-dropshadow -fontsize9 -displayinline"></i>
                <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.structure.label")}</span>
                <div class="la-combine-v -divider la-anim-accent -fontsize4 -textaligncenter">
                    <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                    <span class="la-top__span -width2ch">{system.structure.value}</span><!--
                ---><span class="la-bottom__span">{system.structure.max}</span>
                </div>
            </div>
            <!-- Flow/Macros -->
            <div class="la-combine-v la-dropshadow">
                <FlowButton
                    text={getLocalized("LA.flow.structureDamage.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Structure"}

                    tooltip={getLocalized("LA.flow.structureDamage.tooltip")}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={getLocalized("LA.flow.structureDamage.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            </div>
        </div>
        <!-- Repair -->
        <div class="la-structure la-combine-h la-bckg-card -justifybetween">
            <div class="la-combine-h -aligncenter">
                <i class="cci cci-repair la-dropshadow -fontsize9"></i>
                <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.flow.repair.label")}</span>
                <div class="la-combine-v -divider la-anim-accent -fontsize4 -textaligncenter">
                    <input class="la-top__input -width2ch la-shadow la-text-text -medium -inset"
                        type="number" 
                        name="system.repairs.value"
                        data-dtype="Number" value={system.repairs.value}
                    />
                    <span class="la-bottom__span">{system.repairs.max}</span>
                </div>
            </div>
            <!-- Flow/Macros -->
            <div class="la-combine-v la-dropshadow">
                <FlowButton 
                    text={getLocalized("LA.flow.stabilize.label")}
                    
                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Stabilize"}

                    tooltipHeader={getLocalized("LA.action.full.label")}
                    tooltip={getLocalized("LA.flow.stabilize.tooltip")}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={getLocalized("LA.flow.stabilize.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <FlowButton
                    text={getLocalized("LA.flow.fullRepair.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"FullRepair"}

                    tooltip={getLocalized("LA.flow.fullRepair.tooltip")}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={getLocalized("LA.flow.fullRepair.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <!-- TODO: make a flow for partial repair -->
            </div>
        </div>
    </HeaderMain>
    <HeaderMain 
        text={getLocalized("LA.tab.status.reactor.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}
        
        collapseID={`${actor.uuid}.status.reactor`}
        startCollapsed={false}
    >
        <!-- Stress -->
        <div class="la-structure la-combine-h la-bckg-card -justifybetween">
            <div class="la-combine-h -aligncenter">
                <i class="cci cci-reactor la-dropshadow -fontsize9"></i>
                <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.stress.label")}</span>
                <div class="la-combine-v -divider la-anim-accent -fontsize4 -textaligncenter">
                    <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                    <span class="la-top__span -width2ch">{system.stress.value}</span>
                    <span class="la-bottom__span">{system.stress.max}</span>
                </div>
            </div>
            <!-- Flow/Macros -->
            <div class="la-combine-v la-dropshadow">
                <FlowButton
                    text={getLocalized("LA.flow.reactorStress.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Overheat"}

                    tooltip={getLocalized("LA.flow.reactorStress.tooltip")}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={getLocalized("LA.flow.reactorStress.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            </div>
        </div>
        <!-- Overcharge -->
        <div class="la-structure la-combine-h la-bckg-card -justifybetween">
            <div class="la-combine-h -aligncenter">
                <i class="cci cci-overcharge la-dropshadow -fontsize9"></i>
                <div class="la-combine-v -divider la-anim-accent -fontsize4 -textaligncenter">
                    <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                    <span class="la-top__span -widthfull">{overchargeSequence[overchargeStage]}</span>
                    <span class="la-bottom__span -fontsize1">{getLocalized("LA.flow.overcharge.label")}</span>
                </div>
            </div>
            <!-- Flow/Macros -->
            <div class="la-combine-v la-dropshadow">
                <FlowButton 
                    text={getLocalized("LA.flow.overcharge.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Overcharge"}

                    tooltipHeader={getLocalized("LA.action.overcharge.label")}
                    tooltip={overchargeText}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={overchargeText}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <FlowButton
                    text={getLocalized("LA.flow.overchargeReset.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.ResetOvercharge}

                    tooltip={getLocalized("LA.flow.overchargeReset.tooltip")}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={getLocalized("LA.flow.overchargeReset.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            </div>
        </div>
        <!-- Burn -->
        <div class="la-structure la-brdr-primary la-combine-h la-bckg-card -justifybetween">
            <div class="la-combine-h -aligncenter">
                <i class="cci cci-burn la-dropshadow -fontsize9"></i>
                <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.burn.label")}</span>
                <!-- There exists a bug where when more than one input for a certain name exists it no longer returns a number (likely an array) -->
                <span class="la-value__button -fontsize4 -textaligncenter -width2ch">{system.burn}</span>
            </div>
            <!-- Flow/Macros -->
            <div class="la-combine-v la-dropshadow">
                <FlowButton
                    text={getLocalized("LA.flow.extinguish.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Burn"}

                    tooltipHeader={getLocalized("LA.action.endofturn.label")}
                    tooltip={getLocalized("LA.flow.extinguish.tooltip")}
                    tooltipDirection={TooltipDirection.LEFT}
                    logText={getLocalized("LA.flow.extinguish.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            </div>
        </div>
    </HeaderMain>
</div>
<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import { getLocalized } from "@/scripts/helpers";
    import { FlowClass } from "@/enums/FlowClass";
    import ActiveEffects from "../actor/ActiveEffects.svelte";

    const props: MechSheetProps = $props();
    const {
        actor,
        system,
        collapse,
    } = props;

    let emptyObject = '{}';

    let overchargeSequence = actor.system.overcharge_sequence.split(",");
    let overchargeStage = actor.system.overcharge;
</script>


<div class="la-status__list la-combine-v -widthfull">
    <!-- Active Effects -->
    <HeaderMain
        title={getLocalized("LA.tab.status.effects.label")}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}
        collapse={collapse}
        collapseID={`${actor.uuid}_status_activeeffects`}
        startCollapsed={false}
    >
        <ActiveEffects {...props} />
    </HeaderMain>
    <!-- Integrity -->
    <HeaderMain
        title={getLocalized("LA.tab.status.structure.label")}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}
        collapse={collapse}
        collapseID={`${actor.uuid}_status_structure`}
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
                    name={getLocalized("LA.flow.structureDamage.label")}
                    uuid={actor.uuid}
                    flowClass={FlowClass.Button}
                    tooltip={getLocalized("LA.flow.structureDamage.tooltip")}
                    flowType={"Structure"}
                    flowArgs={emptyObject}
                />
            </div>
        </div>
        <!-- Repair -->
        <div class="la-structure la-combine-h la-bckg-card -justifybetween">
            <div class="la-combine-h -aligncenter">
                <i class="cci cci-repair la-dropshadow -fontsize9"></i>
                <span class="la-label__span -fontsize1 -writingmode-v">{getLocalized("LA.flow.repair.label")}</span>
                <div class="la-combine-v -divider la-anim-accent -fontsize4 -textaligncenter">
                    <input class="la-top__input -width2ch la-shadow -medium -inset"
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
                    flowClass={FlowClass.Button}
                    name={getLocalized("LA.flow.stabilize.label")}
                    tooltipHeader={getLocalized("LA.action.full.label")}
                    tooltip={getLocalized("LA.flow.stabilize.tooltip")}
                    uuid={actor.uuid}
                    flowType="Stabilize"
                    flowArgs={emptyObject}
                />
                <FlowButton
                    name={getLocalized("LA.flow.fullRepair.label")}
                    uuid={actor.uuid}
                    flowClass={FlowClass.Button}
                    tooltip={getLocalized("LA.flow.fullRepair.tooltip")}
                    flowType={"FullRepair"}
                    flowArgs={emptyObject}
                />
                <!-- TODO: make a flow for partial repair -->
                <!-- <button type="button"
                    class="la-flow -textalignleft -letterspacing0 -padding0 la-bckg-secondary la-text-header clipped-bot-alt 
                        lancer-flow-button"
                    data-flow-type="FullRepair.label" data-flow-args="{}"
                    data-tooltip="{getLocalized("LA.flow.repair.tooltip")}">
                    <span class="la-terminal la-text-header -fadein">>//: </span>
                    <span>{getLocalized("LA.flow.repair.label")}</span><span
                        class="la-extension la-text-header -lower -fadein">{randomExtension}</span><span
                        class="la-cursor la-anim-header -fadein" />
                </button> -->
            </div>
        </div>
    </HeaderMain>
    <HeaderMain
        title={getLocalized("LA.tab.status.reactor.label")}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}
        collapse={collapse}
        collapseID={`${actor.uuid}_status_reactor`}
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
                    name={getLocalized("LA.flow.reactorStress.label")}
                    uuid={actor.uuid}
                    flowClass={FlowClass.Button}
                    tooltip={getLocalized("LA.flow.reactorStress.tooltip")}
                    flowType={"Overheat"}
                    flowArgs={emptyObject}
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
                    flowClass={FlowClass.Button}
                    name={getLocalized("LA.flow.overcharge.label")}
                    tooltipHeader={getLocalized("LA.action.overcharge.label")}
                    tooltip={getLocalized("LA.flow.overcharge.tooltip")}
                    uuid={actor.uuid}
                    flowType="Overcharge"
                    flowArgs={emptyObject}
                />
                <FlowButton
                    name={getLocalized("LA.flow.overchargeReset.label")}
                    uuid={actor.uuid}
                    flowClass={FlowClass.OverchargeReset}
                    tooltip={getLocalized("LA.flow.overchargeReset.tooltip")}
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
                    name={getLocalized("LA.flow.extinguish.label")}
                    uuid={actor.uuid}
                    flowClass={FlowClass.Button}
                    tooltipHeader={getLocalized("LA.action.endofturn.label")}
                    tooltip={getLocalized("LA.flow.extinguish.tooltip")}
                    flowType={"Burn"}
                    flowArgs={emptyObject}
                />
            </div>
        </div>
    </HeaderMain>
</div>
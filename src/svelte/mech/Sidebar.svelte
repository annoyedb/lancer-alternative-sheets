<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "../actor/StatComboShort.svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    const { 
        system,
        actor,
    }: MechSheetProps = $props();
    let frame = system.loadout.frame?.value;
    let frameName = frame 
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder");
    let frameUUID = frame ? frame.uuid : "";
    let emptyObject = '{}';

    let speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"));
    let sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"));
</script>

    <!-- Frame Name -->
    <span class="la-framename -overflowhidden">
        <div class="la-flow -textalignleft -letterspacing0 la-bckg-primary la-text-header clipped-bot-alt -padding0-tb -height3 -margin3-t -margin1-l" 
            data-uuid="{frameUUID}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            {frameName}
            <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
        </div>
    </span>
    <div class="la-mech">
        <!-- Size & Speed -->
        <div class="la-combine-v">
        {#if system.size < 1}
            <i class="cci cci-size-half la-text-primary la-outl-background"
                data-tooltip={sizeTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"></i>
        {:else}
            <i class="cci cci-size-{system.size} la-text-primary la-outl-background"
                data-tooltip={sizeTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"></i>
        {/if}
            <div class="la-combine-h" 
                data-tooltip={speedTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT">
                <i class="mdi mdi-arrow-right-bold-hexagon-outline la-text-primary la-outl-background"></i>
                <span class="la-text-primary la-outl-background">{system.speed}</span>
            </div>
        </div>
        <!-- Mech Image -->
        <img class="las-mech__img" 
            src="{actor.img}"
            alt={`modules/${moduleID}/assets/assets/nodata.png`}
            data-edit="img" 
            data-uuid="{actor.uuid}"
        />
    </div>
    <!-- Mech Stats 1 -->
    <div class="la-stats">
        <StatComboShort
            icon={"cci cci-role-defender"}
            label={getLocalized("LA.armor.short")}
            value={system.armor}
            style={["-divider"]}

            tooltip={getLocalized("LA.armor.tooltip")}
            tooltipDirection="RIGHT"
        />
        <StatComboShort
            icon={"cci cci-evasion"}
            label={getLocalized("LA.evasion.short")}
            value={system.evasion}
            style={["-divider"]}

            tooltip={getLocalized("LA.evasion.tooltip")}
            tooltipDirection="RIGHT"
        />
        <StatComboShort
            icon={"cci cci-edef"}
            label={getLocalized("LA.edefense.short")}
            value={system.edef}
            style={["-divider"]}

            tooltip={getLocalized("LA.edefense.tooltip")}
            tooltipDirection="RIGHT"
        />
    </div>
    <!-- Mech Bars -->
    <div class="la-damage -margin0-lr -margin2-tb">
        <div class="la-combine-h">
            <div class="la-visuals">
                <!-- HP, SHIELD (BAR) -->
                <StatusBar
                    name={getLocalized("LA.hitpoint.short")}
                    dataName="system.hp.value"
                    currentValue={system.hp.value}
                    maxValue={system.hp.max}
                    styleClass={["la-bckg-bar-health"]}
                    currentValueAlt={system.overshield.value}
                    maxValueAlt={system.hp.max}
                    styleClassAlt={["la-bckg-bar-shield", "-shield"]}
                    clipPath={"clipped"}
                    
                    tooltip={getLocalized("LA.hitpoint.tooltip")}
                    tooltipDirection="RIGHT"
                />
                <div class="la-spacer -tiny"></div>
                <!-- STRUCTURE -->
                <StatusBar
                    name={getLocalized("LA.structure.label")}
                    dataName="system.structure.value"
                    currentValue={system.structure.value}
                    maxValue={system.structure.max}
                    styleClass={["la-bckg-bar-structure"]}
                    clipPath={"clipped-alt"}

                    tooltip={getLocalized("LA.structure.tooltip")}
                    tooltipDirection="RIGHT"
                />
            </div>
            <!-- SHIELD (VALUE) -->
            <div class="la-combine-v -divider -shield">
                <input class="la-damage__input -heightfull" 
                    type="number" 
                    name="system.overshield.value" 
                    data-dtype="Number"
                    value="{system.overshield.value}">
                <span class="la-damage__span -fontsize0 -heightfull"
                    data-tooltip="{TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'))}"
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT"
                >{getLocalized("LA.overshield.short")}</span>
            </div>
        </div>

        <div class="la-spacer -large"></div>

        <div class="la-combine-h">
            <div class="la-visuals">
                <!-- HEAT -->
                <StatusBar
                    name={getLocalized("LA.heat.label")}
                    dataName="system.heat.value"
                    currentValue={system.heat.value}
                    maxValue={system.heat.max}
                    styleClass={["la-bckg-bar-heat"]}
                    currentValueAlt={system.burn}
                    maxValueAlt={system.heat.max}
                    styleClassAlt={["la-bckg-bar-burn", "-burn"]}
                    clipPath={"clipped"}

                    tooltip={getLocalized("LA.heat.tooltip")}
                    tooltipDirection="RIGHT"
                />
                <div class="la-spacer -tiny"></div>
                <!-- STRESS, BURN (BAR) -->
                 <StatusBar
                    name={getLocalized("LA.stress.label")}
                    dataName="system.stress.value"
                    currentValue={system.stress.value}
                    maxValue={system.stress.max}
                    styleClass={["la-bckg-bar-stress"]}
                    clipPath={"clipped-alt"}

                    tooltip={getLocalized("LA.stress.tooltip")}
                    tooltipDirection="RIGHT"
                />
            </div>
            <!-- BURN (VALUE) -->
            <div class="la-combine-v -divider -burn">
                <input class="la-damage__input -heightfull " 
                    type="number" 
                    name="system.burn" 
                    data-dtype="Number"
                    value="{system.burn}">
                <span class="la-damage__span -fontsize0 -heightfull"
                    data-tooltip="{TooltipFactory.buildTooltip(getLocalized('LA.burn.tooltip'))}"
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT"
                ><!--
                --->{getLocalized("LA.burn.short")}<!--
            ---></span>
            </div>
        </div>
    </div>
    <!-- Mech Stats 2 -->
    <div class="la-stats">
        <StatComboShort
            icon={"cci cci-tech-full"}
            label={getLocalized("LA.tattack.short")}
            value={system.tech_attack}
            style={["-divider"]}

            tooltip={getLocalized("LA.tattack.tooltip")}
            tooltipDirection="RIGHT"
        />
        <StatComboShort
            icon={"cci cci-save"}
            label={getLocalized("LA.save.short")}
            value={system.save}
            style={["-divider"]}

            tooltip={getLocalized("LA.save.tooltip")}
            tooltipDirection="RIGHT"
        />
        <StatComboShort
            icon={"cci cci-sensor"}
            label={getLocalized("LA.sensor.short")}
            value={system.sensor_range}
            style={["-divider"]}

            tooltip={getLocalized("LA.sensor.tooltip")}
            tooltipDirection="RIGHT"
        />
    </div>
    <!-- Macros/Flows -->
    <div class="la-spacer -large"></div>
    <div class="la-macroflows la-combine-v -widthfull">
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
            flowClass={FlowClass.Button}
            name={getLocalized("LA.flow.overcharge.label")}
            tooltipHeader={getLocalized("LA.action.overcharge.label")}
            tooltip={getLocalized("LA.flow.overcharge.tooltip")}
            uuid={actor.uuid}
            flowType="Overcharge"
            flowArgs={emptyObject}
        />
        <FlowButton 
            flowClass={FlowClass.Roll}
            name={getLocalized("LA.grit.label")}
            tooltip={getLocalized("LA.grit.tooltip")}
            uuid={actor.uuid}
            dataPath={"system.grit"}
        />
        <FlowButton 
            flowClass={FlowClass.Button}
            name={getLocalized("LA.flow.rollAttack.label")}
            tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
            uuid={actor.uuid}
            flowType="BasicAttack"
            flowArgs={emptyObject}
        />
        <FlowButton 
            flowClass={FlowClass.Button}
            name={getLocalized("LA.flow.rollDamage.label")}
            tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
            uuid={actor.uuid}
            flowType="Damage"
            flowArgs={emptyObject}
        />
        <FlowButton 
            flowClass={FlowClass.Button}
            name={getLocalized("LA.flow.rollTechAttack.label")}
            tooltip={getLocalized("LA.flow.rollTechAttack.tooltip")}
            uuid={actor.uuid}
            flowType="TechAttack"
            flowArgs={emptyObject}
        />
    </div>
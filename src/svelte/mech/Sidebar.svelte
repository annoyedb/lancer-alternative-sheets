<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import CoreAvailability from "@/svelte/actor/CoreAvailability.svelte";
    import { getSidebarImageTheme } from "@/scripts/theme";

    const { 
        system,
        actor,
    }: MechSheetProps = $props();
    let frame = system.loadout.frame?.value;
    let frameName = frame 
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder");
    let frameUUID = frame ? frame.uuid : "";
    let overchargeSequence = actor.system.overcharge_sequence.split(",");
    let overchargeStage = actor.system.overcharge;
    let emptyObject = '{}';

    let sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `Size ${system.size}`);
    let speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `Speed ${system.speed}`);
</script>

<!-- Frame Name -->
<span class="la-framename -overflowhidden">
    <div class="la-flow -textalignleft -letterspacing0 la-bckg-primary la-text-header la-dropshadow clipped-bot-alt -padding0-tb -height3 -margin3-t -margin1-l" 
        data-uuid="{frameUUID}">
        <span class="la-terminal la-text-header -fadein">>//: </span>
        {frameName}
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
    </div>
</span>
<div class="la-mech la-dropshadow -aligncontentcenter">
    <!-- Size, Speed, & Core Availability -->
    <div class="la-combine-v -positionabsolute -left0 -top0 -fontsize13">
    {#if system.size < 1}
        <i class="cci cci-size-half {getSidebarImageTheme("text")} la-outl-shadow"
            data-tooltip={sizeTip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction="RIGHT"></i>
    {:else}
        <i class="cci cci-size-{system.size} {getSidebarImageTheme("text")} la-outl-shadow"
            data-tooltip={sizeTip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction="RIGHT"></i>
    {/if}
        <div class="la-combine-h -fontsize7" 
            data-tooltip={speedTip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction="RIGHT">
            <i class="mdi mdi-arrow-right-bold-hexagon-outline {getSidebarImageTheme("text")} la-outl-shadow"></i>
            <span class="{getSidebarImageTheme("text")} la-outl-shadow -bold">{system.speed}</span>
        </div>
        <CoreAvailability {system} />
    </div>
    <div class="la-combine-h">
        <!-- Mech Image -->
        <img class="la-mech__img" 
            src="{actor.img}"
            alt={`modules/${moduleID}/assets/assets/nodata.png`}
            data-edit="img" 
            data-uuid="{actor.uuid}"
        />
    </div>
</div>
<!-- Mech Stats 1 -->
<div class="la-stats la-combine-h -justifyevenly">
    <StatComboShort
        icon={"cci cci-role-defender"}
        label={getLocalized("LA.armor.short")}
        value={system.armor}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.armor.tooltip")}
        tooltipDirection="RIGHT"
    />
    <StatComboShort
        icon={"cci cci-evasion"}
        label={getLocalized("LA.evasion.short")}
        value={system.evasion}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.evasion.tooltip")}
        tooltipDirection="RIGHT"
    />
    <StatComboShort
        icon={"cci cci-edef"}
        label={getLocalized("LA.edefense.short")}
        value={system.edef}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.edefense.tooltip")}
        tooltipDirection="RIGHT"
    />
</div>
<!-- Mech Bars -->
<div class="la-damage -margin0-lr -margin2-tb">
    <div class="la-combine-h -gap2">
        <div class="la-visuals -flex5">
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
        <div class="la-combine-v -divider la-anim-bar-shield -flex0 -width3ch -textaligncenter -glow-shield">
            <input class="la-damage__input la-shadow -medium -inset -heightfull -bordersround-lrt -small -bordersoff"
                type="number" 
                name="system.overshield.value" 
                data-dtype="Number"
                value="{system.overshield.value}">
            <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                data-tooltip="{TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'))}"
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"
            ><!--
            --->{getLocalized("LA.overshield.short")}<!--
        ---></span>
        </div>
    </div>

    <div class="la-spacer -large"></div>

    <div class="la-combine-h -gap2">
        <div class="la-visuals -flex5">
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
        <div class="la-combine-v -divider la-anim-bar-burn -flex0 -width3ch -textaligncenter -glow-burn">
            <input class="la-damage__input la-shadow -medium -inset -heightfull -bordersround-lrt -small -bordersoff"
                type="number" 
                name="system.burn" 
                data-dtype="Number"
                value="{system.burn}">
            <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
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
<div class="la-stats la-combine-h -justifyevenly">
    <StatComboShort
        icon={"cci cci-tech-full"}
        label={getLocalized("LA.tattack.short")}
        value={system.tech_attack}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.tattack.tooltip")}
        tooltipDirection="RIGHT"
    />
    <StatComboShort
        icon={"cci cci-save"}
        label={getLocalized("LA.save.short")}
        value={system.save}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.save.tooltip")}
        tooltipDirection="RIGHT"
    />
    <StatComboShort
        icon={"cci cci-sensor"}
        label={getLocalized("LA.sensor.short")}
        value={system.sensor_range}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.sensor.tooltip")}
        tooltipDirection="RIGHT"
    />
</div>
<!-- Mech Stats 3 -->
<div class="la-stats la-combine-h -justifyevenly -margin1-t">
    <StatComboShort
        icon={"cci cci-overcharge"}
        label={getLocalized("LA.overcharge.short")}
        value={overchargeSequence[overchargeStage]}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.overcharge.tooltip")}
        tooltipDirection="RIGHT"
    />
    <StatComboShort
        icon={"cci cci-repair"}
        label={getLocalized("LA.repair.short")}
        value={system.repairs.value}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.repair.tooltip")}
        tooltipDirection="RIGHT"
    />
</div>
<!-- Macros/Flows -->
<div class="la-spacer -large"></div>
<div class="la-macroflows la-dropshadow la-combine-v -alignend -widthfull">
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
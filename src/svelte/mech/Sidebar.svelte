<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { formatString, getLocalized } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import CoreAvailability from "@/svelte/actor/CoreAvailability.svelte";
    import { getSidebarImageTheme } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getThemeOverride } from "@/scripts/settings/mech-sheet";

    const { 
        system,
        actor,
    }: MechSheetProps = $props();
    let themeOverride = $state(getThemeOverride(actor.uuid));

    const frame = system.loadout.frame?.value;
    const frameName = frame 
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder");
    const frameUUID = frame ? frame.uuid : "";
    const overchargeSequence = actor.system.overcharge_sequence.split(",");
    const overchargeStage = actor.system.overcharge;

    const sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `Size ${system.size}`);
    const speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `Speed ${system.speed}`);
    const overchargeText = formatString(getLocalized("LA.flow.overcharge.tooltip"), overchargeSequence[overchargeStage]);
</script>

<!-- Frame Name -->
<div class="la-framename la-dropshadow -overflowhidden">
    <div class="la-flow -textalignleft -letterspacing0 la-bckg-primary la-text-header clipped-bot-alt -padding0-tb -height3 -margin3-t -margin1-l" 
        data-uuid="{frameUUID}">
        <span class="la-cmdline la-text-header -fadein">>//: </span>
        {frameName}
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
    </div>
</div>
<div class="la-mech la-dropshadow -aligncontentcenter">
    <!-- Size, Speed, & Core Availability -->
    <div class="la-combine-v -positionabsolute -left0 -top0 -fontsize13">
    {#if system.size < 1}
        <i class="cci cci-size-half {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
            data-tooltip={sizeTip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction={TooltipDirection.RIGHT}></i>
    {:else}
        <i class="cci cci-size-{system.size} {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
            data-tooltip={sizeTip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction={TooltipDirection.RIGHT}></i>
    {/if}
        <div class="la-combine-h -fontsize7" 
            data-tooltip={speedTip}
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction={TooltipDirection.RIGHT}>
            <i class="mdi mdi-arrow-right-bold-hexagon-outline {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"></i>
            <span class="{getSidebarImageTheme("text", themeOverride)} la-outl-shadow -bold">{system.speed}</span>
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
<div class="la-stats la-dropshadow la-combine-h -justifyevenly">
    <StatComboShort
        icon={"cci cci-role-defender"}
        label={getLocalized("LA.armor.short")}
        value={system.armor}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.armor.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-evasion"}
        label={getLocalized("LA.evasion.short")}
        value={system.evasion}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.evasion.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-edef"}
        label={getLocalized("LA.edefense.short")}
        value={system.edef}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.edefense.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>
<!-- Mech Bars -->
<div class="la-damage la-dropshadow -margin0-lr -margin2-tb">
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
                tooltipDirection={TooltipDirection.RIGHT}
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
                tooltipDirection={TooltipDirection.RIGHT}
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
                data-tooltip-direction={TooltipDirection.RIGHT}
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
                tooltipDirection={TooltipDirection.RIGHT}
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
                tooltipDirection={TooltipDirection.RIGHT}
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
                data-tooltip-direction={TooltipDirection.RIGHT}
            ><!--
            --->{getLocalized("LA.burn.short")}<!--
        ---></span>
        </div>
    </div>
</div>
<!-- Mech Stats 2 -->
<div class="la-stats la-dropshadow la-combine-h -justifyevenly">
    <StatComboShort
        icon={"cci cci-tech-full"}
        label={getLocalized("LA.tattack.short")}
        value={system.tech_attack}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.tattack.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-save"}
        label={getLocalized("LA.save.short")}
        value={system.save}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.save.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-sensor"}
        label={getLocalized("LA.sensor.short")}
        value={system.sensor_range}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.sensor.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>
<!-- Mech Stats 3 -->
<div class="la-stats la-dropshadow la-combine-h -justifyevenly -margin1-t">
    <StatComboShort
        icon={"cci cci-overcharge"}
        label={getLocalized("LA.overcharge.short")}
        value={overchargeSequence[overchargeStage]}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.overcharge.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-repair"}
        label={getLocalized("LA.repair.short")}
        value={system.repairs.value}
        outerStyle={["-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

        tooltip={getLocalized("LA.repair.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>
<!-- Macros/Flows -->
<div class="la-spacer -large"></div>
<div class="la-macroflows la-dropshadow la-combine-v -alignend -widthfull">
    <FlowButton 
        flowClass={FlowClass.Standard}
        text={getLocalized("LA.flow.stabilize.label")}
        tooltipHeader={getLocalized("LA.action.full.label")}
        tooltip={getLocalized("LA.flow.stabilize.tooltip")}
        uuid={actor.uuid}
        flowType="Stabilize"
    />
    <FlowButton 
        flowClass={FlowClass.Standard}
        text={getLocalized("LA.flow.overcharge.label")}
        tooltipHeader={getLocalized("LA.action.overcharge.label")}
        tooltip={overchargeText}
        uuid={actor.uuid}
        flowType="Overcharge"
    />
    <FlowButton 
        flowClass={FlowClass.RollStat}
        text={getLocalized("LA.grit.label")}
        tooltip={getLocalized("LA.grit.tooltip")}
        uuid={actor.uuid}
        path={"system.grit"}
    />
    <FlowButton 
        flowClass={FlowClass.Standard}
        text={getLocalized("LA.flow.rollAttack.label")}
        tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
        uuid={actor.uuid}
        flowType="BasicAttack"
    />
    <FlowButton 
        flowClass={FlowClass.Standard}
        text={getLocalized("LA.flow.rollDamage.label")}
        tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
        uuid={actor.uuid}
        flowType="Damage"
    />
    <FlowButton 
        flowClass={FlowClass.Standard}
        text={getLocalized("LA.flow.rollTechAttack.label")}
        tooltip={getLocalized("LA.flow.rollTechAttack.tooltip")}
        uuid={actor.uuid}
        flowType="TechAttack"
    />
</div>
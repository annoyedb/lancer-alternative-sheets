<script lang="ts">
    import { id as moduleID } from '@/module.json';
    import { onMount } from 'svelte';
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { resetLog, sendToLog } from '@/scripts/store/text-log';
    import { getLocalized } from "@/scripts/helpers";
    import { getDocumentTheme, getSidebarImageTheme } from "@/scripts/theme";
    import { getSheetStore } from '@/scripts/store/module-store';
    import { getAdvancedState } from '@/scripts/store/advanced';
    import { getMechSheetTooltipEnabled, getSidebarExecutables, setSidebarExecutables, getSidebarRatio } from "@/scripts/mech/settings";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import CoreAvailability from "@/svelte/actor/input/CoreAvailability.svelte";
    import MacroDropBox from '@/svelte/actor/dragdrop/MacroDropBox.svelte';

    const props = $props();
    const { 
        system,
        actor,
    }: MechSheetProps = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let component: HTMLElement | null = $state(null);
    let editingBurn = $state(false);
    let editingShield = $state(false);

    const themeOverride = getSheetStore(actor.uuid).currentTheme;
    const sidebarExes = getSidebarExecutables(actor.uuid);
    const actorImg = actor.prototypeToken?.texture.src ?? actor.img;
    const frame = system.loadout.frame?.value;
    const frameName = frame 
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder");
    const frameUUID = frame ? frame.uuid : "";
    const overchargeSequence = actor.system.overcharge_sequence.split(",");
    const overchargeStage = actor.system.overcharge;

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `${getLocalized("LA.size.label")} ${system.size}`);
    const speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `${getLocalized("LA.speed.label")} ${system.speed}`);
    const shieldTip = TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'));
    const burnTip = TooltipFactory.buildTooltip(getLocalized('LA.burn.tooltip'));
    const overchargePlusTip = TooltipFactory.buildTooltip(getLocalized('LA.overcharge.increase.tooltip'));
    const overchargeMinusTip = TooltipFactory.buildTooltip(getLocalized('LA.overcharge.decrease.tooltip'));

    // When rendered, adjust the sidebar ratio to whatever was set
    onMount(() => 
    {
        if (component)
        {
            const ratio = getSidebarRatio(actor.uuid);
            const sidebar = jQuery(component).closest('.la-root').find('.la-sidebar');
            if (sidebar)
                sidebar.css('flex', ratio.toString());
        }
    });

    function handleOverchargeIncrease(event: MouseEvent) 
    {
        event.stopPropagation();
        actor.update({
            "system.overcharge": Math.min(overchargeStage + 1, overchargeSequence.length - 1)
        });
    }

    function handleOverchargeDecrease(event: MouseEvent) 
    {
        event.stopPropagation();
        actor.update({
            "system.overcharge": Math.max(overchargeStage - 1, 0)
        });
    }
</script>

<!-- Frame Name -->
<div class="la-framename la-dropshadow -overflowhidden"
    bind:this={component}
>
    <div class="la-flow -textalignleft -letterspacing0 la-bckg-primary la-text-header clipped-bot-alt -padding0-tb -height3 -margin5-t -margin1-l" 
        data-uuid="{frameUUID}">
        <span class="la-cmdline la-text-header -fadein">>//: </span>
        {frameName}
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-prmy-header -fadein"></span>
    </div>
</div>
<div class="la-actor la-dropshadow -aligncontentcenter -positionrelative">
    <!-- Size, Speed, & Core Availability -->
    <div class="la-combine-v -positionabsolute -left0 -top0 -fontsize13">
    {#if system.size < 1}
        <i class="cci cci-size-half {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
            data-tooltip={tooltipEnabled ? sizeTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.RIGHT}></i>
    {:else}
        <i class="cci cci-size-{system.size} {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
            data-tooltip={tooltipEnabled ? sizeTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.RIGHT}></i>
    {/if}
        <div class="la-combine-h -fontsize7" 
            data-tooltip={tooltipEnabled ? speedTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.RIGHT}>
            <i class="mdi mdi-arrow-right-bold-hexagon-outline {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"></i>
            <span class="{getSidebarImageTheme("text", themeOverride)} la-outl-shadow -bold">{system.speed}</span>
        </div>
        <CoreAvailability {system} 
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
        />
    </div>
    <div class="la-combine-h">
        <!-- Mech Image -->
        <img class="la-actor__img" 
            src={actorImg}
            alt={`modules/${moduleID}/assets/assets/nodata.png`}
            data-edit={"prototypeToken.texture.src"}
            data-uuid={actor.uuid}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.edit.image.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
        />
    </div>
</div>
<!-- Mech Stats 1 -->
<div class="la-stats la-dropshadow la-combine-h -justifyevenly">
    <StatComboShort
        icon={"cci cci-role-defender -alignselfcenter"}
        label={getLocalized("LA.armor.short")}
        value={system.armor}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.armor.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-evasion -alignselfcenter"}
        label={getLocalized("LA.evasion.short")}
        value={system.evasion}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.evasion.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-edef -alignselfcenter"}
        label={getLocalized("LA.edefense.short")}
        value={system.edef}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
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
                dataName={"system.hp.value"}
                currentValue={system.hp.value}
                maxValue={system.hp.max}
                barStyle={["la-bckg-bar-health"]}
                barEditStyle={["la-prmy-bar-health"]}
                currentValueSecondary={system.overshield.value}
                maxValueSecondary={system.hp.max}
                barStyleSecondary={["la-bckg-bar-shield", "-shield"]}
                barEditStyleSecondary={["la-prmy-bar-shield"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingShield}
                
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.hitpoint.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
            <div class="la-spacer -tiny"></div>
            <!-- STRUCTURE -->
            <StatusBar
                name={getLocalized("LA.structure.label")}
                dataName={"system.structure.value"}
                currentValue={system.structure.value}
                maxValue={system.structure.max}
                barStyle={["la-bckg-bar-structure"]}
                barEditStyle={["la-prmy-bar-structure"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped-alt"}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.structure.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
        </div>
        <!-- SHIELD (VALUE) -->
        <div class="la-combine-v -divider la-prmy-bar-shield -flex0 -width3ch -textaligncenter la-prmy-bar-shield -glow-prmy -margin0-r">
            <input type={"number"}
                class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                name={"system.overshield.value"}
                data-dtype={"Number"}
                value={system.overshield.value}
                onfocus={() => {editingShield = true;}}
                onblur={() => {editingShield = false;}}
            >
            <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                data-tooltip={tooltipEnabled ? shieldTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.RIGHT}
            ><!--
            --->{getLocalized("LA.overshield.short")}<!--
        ---></span>
        </div>
    </div>

    <div class="la-spacer -large"></div>

    <div class="la-combine-h -gap2">
        <div class="la-visuals -flex5">
            <!-- HEAT, BURN (BAR) -->
            <StatusBar
                name={getLocalized("LA.heat.label")}
                dataName={"system.heat.value"}
                currentValue={system.heat.value}
                maxValue={system.heat.max}
                barStyle={["la-bckg-bar-heat"]}
                barEditStyle={["la-prmy-bar-heat"]}
                currentValueSecondary={system.burn}
                maxValueSecondary={system.heat.max}
                barStyleSecondary={["la-bckg-bar-burn", "-burn"]}
                barEditStyleSecondary={["la-prmy-bar-burn"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingBurn}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.heat.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
                />
            <div class="la-spacer -tiny"></div>
            <!-- STRESS -->
            <StatusBar
                name={getLocalized("LA.stress.label")}
                dataName={"system.stress.value"}
                currentValue={system.stress.value}
                maxValue={system.stress.max}
                barStyle={["la-bckg-bar-stress"]}
                barEditStyle={["la-prmy-bar-stress"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped-alt"}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.stress.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
                />
        </div>
        <!-- BURN (VALUE) -->
        <div class="la-combine-v -divider la-prmy-bar-burn -flex0 -width3ch -textaligncenter la-prmy-bar-burn -glow-prmy -margin0-r">
            <input type={"number"}
                class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                name={"system.burn"}
                data-dtype={"Number"}
                value={system.burn}
                onfocus={() => {editingBurn = true;}}
                onblur={() => {editingBurn = false;}}
            >
            <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                data-tooltip={tooltipEnabled ? burnTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
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
        icon={"cci cci-tech-full -alignselfcenter"}
        label={getLocalized("LA.tattack.short")}
        value={system.tech_attack}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.tattack.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-save -alignselfcenter"}
        label={getLocalized("LA.save.short")}
        value={system.save}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.save.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-sensor -alignselfcenter"}
        label={getLocalized("LA.sensor.short")}
        value={system.sensor_range}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.sensor.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>
<!-- Mech Stats 3 -->
<div class="la-stats la-dropshadow la-combine-h -justifyevenly -margin1-t">
    <div class="la-combine-h -alignselfcenter -positionrelative">
        <button type="button"
            class="mdi mdi-chevron-left la-text-secondary la-prmy-primary -glow-prmy-hover -positionabsolute -fontsize3 -alignselfcenter"
            style="left: -1rem;"
            data-tooltip={tooltipEnabled ? overchargeMinusTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.UP}
            onclick={event => handleOverchargeDecrease(event)}
            aria-label={getLocalized("LA.overcharge.decrease.tooltip")}
        ></button>
        <StatComboShort
            icon={"cci cci-overcharge -alignselfcenter"}
            label={getLocalized("LA.overcharge.short")}
            value={overchargeSequence[overchargeStage]}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.overcharge.tooltip")}
            tooltipDirection={TooltipDirection.RIGHT}
        />
        <button type="button"
            class="mdi mdi-chevron-right la-text-secondary la-prmy-primary -glow-prmy-hover -positionabsolute -fontsize3 -alignselfcenter"
            style="right: -1.5rem;"
            data-tooltip={tooltipEnabled ? overchargePlusTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.UP}
            onclick={event => handleOverchargeIncrease(event)}
            aria-label={getLocalized("LA.overcharge.increase.tooltip")}
        ></button>
    </div>
    <StatComboShort
        icon={"cci cci-repair -alignselfcenter"}
        label={getLocalized("LA.repair.short")}
        value={system.repairs.value}
        outerStyle={["la-text-text", "-fontsize5"]}
        innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.repair.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>
<!-- Macros/Flows -->
<MacroDropBox
    uuid={actor.uuid}
    getExes={sidebarExes}
    setExes={setSidebarExecutables}
    hintDropArea={true}
    allowDrop={advancedOptions}
    tooltipEnabled={tooltipEnabled}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
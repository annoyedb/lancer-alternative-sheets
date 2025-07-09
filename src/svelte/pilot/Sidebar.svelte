<script lang="ts">
    import { onMount } from "svelte";
    import { id as moduleID } from '@/module.json';
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from '@/enums/TextLogHook';
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized, handleRelativeDataInput } from "@/scripts/helpers";
    import { 
        getPilotSheetSensorsEnabled, 
        getPilotSheetTechAttackEnabled, 
        getPilotSheetTooltipEnabled, 
        getSidebarExecutables, 
        getSidebarRatio, 
        setSidebarExecutables 
    } from "@/scripts/pilot/settings";
    import { getSheetStore } from "@/scripts/store/module-store";
    import { getDocumentTheme, getSidebarImageTheme } from "@/scripts/theme";
    import { resetLog, sendToLog } from '@/scripts/store/text-log';
    import { getAdvancedState } from '@/scripts/store/advanced';
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import MacroDropBox from '@/svelte/actor/dragdrop/MacroDropBox.svelte';


    const props = $props();
    const { 
        system,
        actor,
        itemTypes
    }: PilotSheetProps = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let component: HTMLElement | null = $state(null);
    let editingBurn = $state(false);
    let editingShield = $state(false);

    const themeOverride = getSheetStore(actor.uuid).currentTheme;
    const sidebarExes = getSidebarExecutables(actor.uuid);
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const showSensors = getPilotSheetSensorsEnabled();
    const showTechAttack = getPilotSheetTechAttackEnabled();
    const actorImg = actor.prototypeToken?.texture.src ?? actor.img;
    const sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `${getLocalized("LA.size.label")} ${system.size}`);
    const speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `${getLocalized("LA.speed.label")} ${system.speed}`);
    const shieldTip = TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'));
    const burnTip = TooltipFactory.buildTooltip(getLocalized('LA.burn.tooltip'));

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

    // Insert missing skill trigger UUIDs into the sidebar executables, if any 
    function checkExecutables()
    {
        const newUuids = itemTypes.skill
            .map((skill: any) => skill.uuid)
            .filter((uuid: any) => !sidebarExes.includes(uuid));
        sidebarExes.unshift(...newUuids);

        return sidebarExes;
    }
</script>

<!-- License Level -->
<div class="la-licenselevel la-dropshadow -overflowhidden"
    bind:this={component}
>
    <div 
        class="la-flow -textalignleft -letterspacing0 la-bckg-primary la-text-header clipped-bot-alt -padding0-tb -height3 -margin5-t -margin1-l" 
    >
        <span class="la-cmdline la-text-header -fadein">>//: </span>
        LL{system.level} - {actor.system.callsign}
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-prmy-header -fadein"></span>
    </div>
</div>
<div class="la-pilot__sidebar la-dropshadow -aligncontentcenter -positionrelative">
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
    </div>
    <div class="la-combine-h">
        <!-- Mech Image -->
        <img class="la-actor__img" 
            src={actorImg}
            alt={`modules/${moduleID}/assets/assets/nodata.png`}
            data-edit={"prototypeToken.texture.src"}
            data-uuid={actor.uuid}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.edit.image.tooltip"), TextLogHook.PilotHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
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
<div class="la-damage la-dropshadow -margin0-lr -margin2-t -margin0-b">
<!-- No KTB -->
{#if !system.bond}
    <div class="la-combine-h -gap2">
        <div class="la-visuals -flex5">
            <!-- HP, SHIELD (BAR), BURN (BAR) -->
            <StatusBar
                name={getLocalized("LA.hitpoint.short")}
                dataName={"system.hp.value"}
                currentValue={system.hp.value}
                maxValue={system.hp.max}
                currentValueSecondary={system.overshield.value}
                maxValueSecondary={system.hp.max}
                currentValueTertiary={system.bond ? undefined : system.burn}
                maxValueTertiary={system.bond ? undefined : system.hp.max}
                barStyle={["la-bckg-bar-health"]}
                barEditStyle={["la-prmy-bar-health"]}
                barStyleSecondary={["la-bckg-bar-shield", "-shield"]}
                barEditStyleSecondary={["la-prmy-bar-shield"]}
                barStyleTertiary={["la-bckg-bar-burn", "-burn"]}
                barEditStyleTertiary={["la-prmy-bar-burn"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingShield}
                editTertiary={editingBurn}
                
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.pilot.hitpoint.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
        </div>
        <!-- SHIELD (VALUE) -->
        <div class="la-combine-v -divider la-prmy-bar-shield -flex0 -width3ch -textaligncenter la-prmy-bar-shield -glow-prmy -margin0-r">
            <input class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                type={"number"}
                name={"system.overshield.value"}
                data-dtype={"Number"}
                value={system.overshield.value}
                onfocus={(event) => {event.currentTarget.select(); editingShield = true;}}
                onblur={() => {editingShield = false;}}
                onchange={(event) => handleRelativeDataInput(event, system.overshield.value)}
            >
            <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                data-tooltip={tooltipEnabled ? shieldTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.RIGHT}
            ><!--
            --->{getLocalized("LA.overshield.short")}<!--
        ---></span>
        </div>
        <!-- BURN (VALUE) -->
        <div class="la-combine-v -divider la-prmy-bar-burn -flex0 -width3ch -textaligncenter la-prmy-bar-burn -glow-prmy -margin1-r">
            <input class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                type={"number"}
                name={"system.burn"}
                data-dtype={"Number"}
                value={system.burn}
                onfocus={(event) => {event.currentTarget.select(); editingBurn = true;}}
                onblur={() => {editingBurn = false;}}
                onchange={(event) => handleRelativeDataInput(event, system.burn)}
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
<!-- KTB -->
{:else}
    <div class="la-combine-h -gap2 -alignend">
        <div class="la-visuals -flex5">
            <!-- HP, SHIELD (BAR) -->
            <StatusBar
                name={getLocalized("LA.hitpoint.short")}
                dataName={"system.hp.value"}
                currentValue={system.hp.value}
                maxValue={system.hp.max}
                currentValueSecondary={system.overshield.value}
                maxValueSecondary={system.hp.max}
                currentValueTertiary={system.bond ? undefined : system.burn}
                maxValueTertiary={system.bond ? undefined : system.hp.max}
                barStyle={["la-bckg-bar-health"]}
                barEditStyle={["la-prmy-bar-health"]}
                barStyleSecondary={["la-bckg-bar-shield", "-shield"]}
                barEditStyleSecondary={["la-prmy-bar-shield"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingShield}
                
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.pilot.hitpoint.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
        </div>
        <!-- SHIELD (VALUE) -->
        <div class="la-combine-v -divider la-prmy-bar-shield -flex0 -width3ch -textaligncenter la-prmy-bar-shield -glow-prmy -margin1-r">
            <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                data-tooltip={tooltipEnabled ? shieldTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.RIGHT}
            ><!--
            --->{getLocalized("LA.overshield.short")}<!--
        ---></span>
            <input class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrb -small -bordersoff"
                type={"number"}
                name={"system.overshield.value"}
                data-dtype={"Number"}
                value={system.overshield.value}
                onfocus={(event) => {event.currentTarget.select(); editingShield = true;}}
                onblur={() => {editingShield = false;}}
                onchange={(event) => handleRelativeDataInput(event, system.overshield.value)}
            >
        </div>
    </div>
    <div class="la-spacer -tiny"></div>
    <div class="la-combine-h -gap2">
        <div class="la-visuals -flex5">
            <div class="la-spacer -tiny"></div>
            <!-- STRESS, BURN (BAR) -->
            <StatusBar
                name={getLocalized("LA.stress.label")}
                dataName={"system.bond_state.stress.value"}
                currentValue={system.bond_state.stress.value}
                maxValue={system.bond_state.stress.max}
                currentValueSecondary={system.burn}
                maxValueSecondary={system.bond_state.stress.max}
                barStyle={["la-bckg-bar-heat"]}
                barEditStyle={["la-prmy-bar-heat"]}
                barStyleSecondary={["la-bckg-bar-burn", "-burn"]}
                barEditStyleSecondary={["la-prmy-bar-burn"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingBurn}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.pilot.stress.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
        </div>
        <!-- BURN (VALUE) -->
        <div class="la-combine-v -divider la-prmy-bar-burn -flex0 -width3ch -textaligncenter la-prmy-bar-burn -glow-prmy -margin1-r">
            <input class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                type={"number"}
                name={"system.burn"}
                data-dtype={"Number"}
                value={system.burn}
                onfocus={(event) => {event.currentTarget.select(); editingBurn = true;}}
                onblur={() => {editingBurn = false;}}
                onchange={(event) => handleRelativeDataInput(event, system.burn)}
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
{/if}
</div>
<div class="la-dropshadow la-combine-h -justifyevenly">
</div>
<!-- Mech Stats 2 -->
<div class="la-stats la-dropshadow la-combine-h -justifyevenly">
{#if showTechAttack}
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
{/if}
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
{#if showSensors}
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
{/if}
</div>
{#if itemTypes.skill.length}
<MacroDropBox
    uuid={actor.uuid}
    getExes={checkExecutables()}
    setExes={setSidebarExecutables}
    hintDropArea={true}
    allowDrop={advancedOptions}
    tooltipEnabled={tooltipEnabled}
    logType={TextLogHook.PilotHeader}
    logTypeReset={TextLogHook.PilotHeaderReset}
/>
{/if}
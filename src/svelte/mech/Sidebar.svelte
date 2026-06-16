<script lang="ts">
    import { onMount } from 'svelte';
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import {
        getCurrentOvercharge,
        getLocalized,
        handleEditToken,
        handleOverchargeDecrease,
        handleOverchargeIncrease,
        handleRelativeDataInput, logographicLanguage
    } from "@/scripts/helpers";
    import { getBrightness, getCSSDocumentTheme } from "@/scripts/theme";
    import { getAdvancedState } from '@/scripts/store/advanced';
    import { getThemeKey } from '@/scripts/store/theme';
    import { 
        getMechSheetTooltipEnabled, 
        getSidebarExecutables, 
        setSidebarExecutables, 
        getSidebarRatio 
    } from "@/scripts/mech/settings";
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from '@/enums/FlowClass';

    import StatusBar from "@/svelte/shared/StatusBar.svelte";
    import StatComboShort from "@/svelte/shared/StatComboShort.svelte";
    import CoreAvailability from "@/svelte/shared/input/CoreAvailability.svelte";
    import MacroDropBox from '@/svelte/shared/dragdrop/MacroDropBox.svelte';
    import ImageVideo from '@/svelte/shared/ImageVideo.svelte';
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { FLOW_BUTTON_DEFAULT } from '@/svelte/shared/button/FlowButton.svelte';

    const props = $props();
    const { 
        system,
        actor,
    }: MechSheetProps = $derived(props);
    let component: HTMLElement | null = $state(null);
    let editingBurn = $state(false);
    let editingShield = $state(false);

    const logographic = logographicLanguage();
    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = getExtraEffectsEnabled();
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const themeOverride = $derived(getBrightness(getThemeKey(actor.uuid)) === 'light' ? 'la-text-primary' : 'la-text-text');
    const sidebarExes = $derived(getSidebarExecutables(actor.uuid));
    const frame = $derived(system.loadout.frame?.value);
    const frameName = $derived(frame
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder"));
    const frameUUID = $derived(frame ? frame.uuid : "");
    const theme = $derived(getCSSDocumentTheme(actor.uuid));

    const sizeTip = $derived(TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `${getLocalized("LA.size.label")} ${system.size}`));
    const speedTip = $derived(TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `${getLocalized("LA.speed.label")} ${system.speed}`));
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
</script>

<!-- Frame Name -->
<div class="la-framename la-dropshadow -overflowhidden"
    bind:this={component}
>
    <div
        class="la-flow -textalignleft -letterspacing0 la-bckg-primary la-text-header clipped-bot-alt -padding0-tb -margin7-t -margin1-l -fontface-stylized"
        data-uuid="{frameUUID}"
    >
        <span class="la-cmdline la-text-header -fadein -fontface-neutral">>//:</span><!--
    --->{frameName}<!--
    ---><span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-prmy-header -fadein"></span>
    </div>
</div>
<div class="la-actor la-dropshadow -aligncontentcenter -positionrelative">
    <!-- Size, Speed, & Core Availability -->
    <div class="la-flexcol -positionabsolute -left0 -top0 -fontsize19">
    {#if system.size < 1}
        <i class="cci cci-size-half {themeOverride} la-outl-shadow"
            data-tooltip={tooltipEnabled ? sizeTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {theme}"
            data-tooltip-direction={TooltipDirection.RIGHT}></i>
    {:else}
        <i class="cci cci-size-{system.size} {themeOverride} la-outl-shadow"
            data-tooltip={tooltipEnabled ? sizeTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {theme}"
            data-tooltip-direction={TooltipDirection.RIGHT}></i>
    {/if}
        <div class="la-flexrow -fontsize9" 
            data-tooltip={tooltipEnabled ? speedTip : undefined}
            data-tooltip-class="clipped-bot la-tooltip {theme}"
            data-tooltip-direction={TooltipDirection.RIGHT}>
            <i class="mdi mdi-arrow-right-bold-hexagon-outline {themeOverride} la-outl-shadow"></i>
            <span class="{themeOverride} la-outl-shadow -bold">{system.speed}</span>
        </div>
        <CoreAvailability {system} 
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
        />
    </div>
    <ImageVideo
        actor={actor}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.edit.image.token.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
        logText={getLocalized("LA.edit.image.token.tooltip")}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
        onPointerClick={event => handleEditToken(event, actor)}
    />
</div>
<!-- Mech Stats 1 -->
<div class="la-stats la-dropshadow la-flexrow -justifyevenly -fontface-stylized">
    <StatComboShort
        icon={"cci cci-role-defender -alignselfcenter"}
        label={getLocalized("LA.armor.short")}
        value={system.armor}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.armor.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-evasion -alignselfcenter"}
        label={getLocalized("LA.evasion.short")}
        value={system.evasion}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.evasion.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-edef -alignselfcenter"}
        label={getLocalized("LA.edefense.short")}
        value={system.edef}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.edefense.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>

<div class="la-spacer -medium"></div>

<!-- Mech Bars -->
<div class="la-damage la-dropshadow -margin0-lr">
    <div class="la-flexrow -gap2 -fontface-stylized">
        <div class="la-visuals -flex5">
            <!-- HP, SHIELD (BAR) -->
            <StatusBar
                name={getLocalized("LA.hitpoint.short")}
                nameStyle={[logographic ? "-fontsizemedium" : ""]}
                dataName={"system.hp.value"}
                currentValue={system.hp.value}
                maxValue={system.hp.max}
                barStyle={["la-bckg-bar-health"]}
                barEditStyle={["la-prmy-bar-health"]}
                currentValueSecondary={system.overshield.value}
                maxValueSecondary={system.hp.max}
                barStyleSecondary={["la-bckg-bar-shield -shield"]}
                barEditStyleSecondary={["la-prmy-bar-shield"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingShield}
                
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
                tooltip={getLocalized("LA.hitpoint.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
            <div class="la-spacer -tiny"></div>
            <!-- STRUCTURE -->
            <StatusBar
                name={getLocalized("LA.structure.label")}
                nameStyle={[logographic ? "-fontsizemedium" : ""]}
                dataName={"system.structure.value"}
                currentValue={system.structure.value}
                maxValue={system.structure.max}
                barStyle={["la-bckg-bar-structure"]}
                barEditStyle={["la-prmy-bar-structure"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped-alt"}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
                tooltip={getLocalized("LA.structure.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
            />
        </div>
        <!-- SHIELD (VALUE) -->
        <div class="la-flexcol -divider la-prmy-bar-shield -flex0 -textaligncenter la-prmy-bar-shield -margin0-r
                {qualityMode ? '-glow-prmy' : ''}
                {logographic ? '-width4ch' : '-width3ch'}"
        >
            <input type={"number"}
                class="la-damage__input la-shadow -medium -inset la-text-text -width7 -heightfull -bordersround-lrt -small -bordersoff"
                name={"system.overshield.value"}
                data-dtype={"Number"}
                value={system.overshield.value}
                onfocus={(event) => {event.currentTarget.select(); editingShield = true;}}
                onblur={() => {editingShield = false;}}
                onchange={(event) => handleRelativeDataInput(event, system.overshield.value)}
            >
            <span
                class="la-damage__span -heightfull -lineheight3
                    {logographic ? '-fontsizemedium' : '-fontsizesmall'}"
                data-tooltip={tooltipEnabled ? shieldTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {theme}"
                data-tooltip-direction={TooltipDirection.RIGHT}
            ><!--
            --->{getLocalized("LA.overshield.short")}<!--
        ---></span>
        </div>
    </div>

    <div class="la-spacer -large"></div>

    <div class="la-flexrow -gap2 -fontface-stylized">
        <div class="la-visuals -flex5">
            <!-- HEAT, BURN (BAR) -->
            <StatusBar
                name={getLocalized("LA.heat.label")}
                nameStyle={[logographic ? "-fontsizemedium" : ""]}
                dataName={"system.heat.value"}
                currentValue={system.heat.value}
                maxValue={system.heat.max}
                barStyle={["la-bckg-bar-heat"]}
                barEditStyle={["la-prmy-bar-heat"]}
                currentValueSecondary={system.burn}
                maxValueSecondary={system.heat.max}
                barStyleSecondary={["la-bckg-bar-burn -burn"]}
                barEditStyleSecondary={["la-prmy-bar-burn"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped"}
                editSecondary={editingBurn}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
                tooltip={getLocalized("LA.heat.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
                />
            <div class="la-spacer -tiny"></div>
            <!-- STRESS -->
            <StatusBar
                name={getLocalized("LA.stress.label")}
                nameStyle={[logographic ? "-fontsizemedium" : ""]}
                dataName={"system.stress.value"}
                currentValue={system.stress.value}
                maxValue={system.stress.max}
                barStyle={["la-bckg-bar-stress"]}
                barEditStyle={["la-prmy-bar-stress"]}
                textStyle={["la-text-text"]}
                clipPath={"clipped-alt"}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
                tooltip={getLocalized("LA.stress.tooltip")}
                tooltipDirection={TooltipDirection.RIGHT}
                />
        </div>
        <!-- BURN (VALUE) -->
        <div class="la-flexcol -divider la-prmy-bar-burn -flex0 -textaligncenter la-prmy-bar-burn -margin0-r
                {qualityMode ? '-glow-prmy' : ''}
                {logographic ? '-width4ch' : '-width3ch'}"
        >
            <input type={"number"}
                class="la-damage__input la-shadow -medium -inset la-text-text -width7 -heightfull -bordersround-lrt -small -bordersoff"
                name={"system.burn"}
                data-dtype={"Number"}
                value={system.burn}
                onfocus={(event) => {event.currentTarget.select(); editingBurn = true;}}
                onblur={() => {editingBurn = false;}}
                onchange={(event) => handleRelativeDataInput(event, system.burn)}
            >
            <span class="la-damage__span -heightfull -lineheight3
                    {logographic ? '-fontsizemedium' : '-fontsizesmall'}"
                data-tooltip={tooltipEnabled ? burnTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {theme}"
                data-tooltip-direction={TooltipDirection.RIGHT}
            ><!--
            --->{getLocalized("LA.burn.short")}<!--
        ---></span>
        </div>
    </div>
</div>

<div class="la-spacer -small"></div>

<!-- Mech Stats 2 -->
<div class="la-stats la-dropshadow la-flexrow -justifyevenly -fontface-stylized">
    <StatComboShort
        icon={"cci cci-tech-full -alignselfcenter"}
        label={getLocalized("LA.tattack.short")}
        value={system.tech_attack}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.tattack.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-save -alignselfcenter"}
        label={getLocalized("LA.save.short")}
        value={system.save}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.save.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
    <StatComboShort
        icon={"cci cci-sensor -alignselfcenter"}
        label={getLocalized("LA.sensor.short")}
        value={system.sensor_range}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.sensor.tooltip")}
        tooltipDirection={TooltipDirection.RIGHT}
    />
</div>

<div class="la-spacer -small"></div>

<!-- Mech Stats 3 -->
<div class="la-stats la-dropshadow la-flexrow -justifyevenly -fontface-stylized">
    <div class="la-flexrow -alignselfcenter -positionrelative">
    {#snippet overchargeContentLeft()}
        <GlyphButton type="button"
            flowClass={FlowClass.None}
            style={["mdi mdi-chevron-left la-text-secondary la-prmy-primary -fontsize5 -alignselfcenter",
                qualityMode ? "-glow-prmy-hover" : ""]}
            tooltip={overchargeMinusTip}
            tooltipTheme={theme}
            tooltipDirection={TooltipDirection.UP}
            onClick={event => handleOverchargeDecrease(event, actor)}
        >
        </GlyphButton>
    {/snippet}
    {#snippet overchargeContentRight()}
        <GlyphButton type="button"
            flowClass={FlowClass.None}
            style={["mdi mdi-chevron-right la-text-secondary la-prmy-primary -fontsize5 -alignselfcenter",
                qualityMode ? "-glow-prmy-hover" : ""]}
            tooltip={overchargePlusTip}
            tooltipTheme={theme}
            tooltipDirection={TooltipDirection.UP}
            onClick={event => handleOverchargeIncrease(event, actor)}
        >
        </GlyphButton>
    {/snippet}
        <StatComboShort
            icon={"cci cci-overcharge -alignselfcenter -width5"}
            label={getLocalized("LA.overcharge.short")}
            value={getCurrentOvercharge(actor)}
            outerStyle={["la-text-text -fontsize7"]}
            innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltip={getLocalized("LA.overcharge.tooltip")}
            tooltipDirection={TooltipDirection.RIGHT}

            contentLeft={overchargeContentLeft}
            contentRight={overchargeContentRight}
        />
    </div>
    <StatComboShort
        icon={"cci cci-repair -alignselfcenter"}
        label={getLocalized("LA.repair.short")}
        value={system.repairs.value}
        outerStyle={["la-text-text -fontsize7"]}
        innerStyle={["-divider -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
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
    buttonStyle={[FLOW_BUTTON_DEFAULT, advancedOptions ? "-margin7-l" : "-margin2-l"]}
    tooltipEnabled={tooltipEnabled}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
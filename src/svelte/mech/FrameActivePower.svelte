<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getCSSDocumentTheme, getManufacturerColor } from "@/scripts/theme";
    import { slugify } from "@/scripts/lancer/util/lid";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import HeaderQuinary, { H4_BORDER_STYLE } from "@/svelte/actor/header/HeaderQuinary.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import { H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";

    const {
        actor,
        system,
    }: MechSheetProps = $props();
    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting

    const frame: any = system.loadout.frame!.value;
    const core: any = frame.system.core_system;
    const collID: string = `${actor.uuid}.${frame.id}.activePower`;
    const actionCollID: string = `${actor.uuid}.${frame.id}.activePower.action`;
    const name = core.active_actions.length ? core.active_actions[0].name : getLocalized("LA.activate.label");
    const activationClass = `activation-${slugify(core.activation, "-")}`;
    const activationTheme = system.core_energy
        ? `${ACTIVATION_COLOR_MAP[core.activation]}`
        : "la-bckg-repcap";
    const frameColorBckg = getManufacturerColor(frame.system.manufacturer, "bckg")
    const frameColorBrdr = system.core_energy
        ? getManufacturerColor(frame.system.manufacturer, "brdr")
        : "la-brdr-repcap";
    const tip = TooltipFactory.buildTooltip(
        `${core.active_effect}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[core.activation])}`, 
        getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation]));
</script>

<!-- Frame Active -->
{#if core.active_effect || core.active_actions.length || core.active_bonuses.length }
{#snippet headerQuinaryLeftOptions()}
<EffectButton
    iconStyle={[H2_ICON_SIZE, "cci", ACTIVATION_ICON_MAP[core.activation]]}
    iconBackgroundStyle={[H2_ICON_SIZE, "la-prmy-secondary", `${qualityMode ? `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}` : "la-text-scrollbar-secondary"}`]}
    
    flowClass={FlowClass.None}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    tooltipDirection={TooltipDirection.LEFT}
    tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation])}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}

    disabled={system.core_energy === 0}
/>
{/snippet}
{#snippet outerContent()}
<div class="la-combine-h -widthfull -margin0-t">
    <button type="button"
        class="la-corepower clipped la-text-header la-combine-h -padding0-tb -fontsize3 -lineheight5 -widthfull 
            {activationTheme} {system.core_energy ? "" : "la-dropshadow -disabled"} 
            activation-flow {activationClass}"
        data-uuid={frame.uuid}
        data-path={"system.core_system"}
        data-tooltip={tip}
        data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
        data-tooltip-direction={TooltipDirection.LEFT}
        aria-label={name}
        disabled={!system.core_energy}
    >
        <i class="la-corepower__i cci cci-activate la-dropshadow -flexthird -textalignleft -height5 -lineheight5 -fontsize13"></i>
        <span class="la-corepower__span {system.core_energy ? "la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover" : "la-dropshadow"} -upper -flexthird -textwrapnowrap">
            {name}
        </span>
        <div class="-flexthird">
        </div>
    </button>
</div>
{/snippet}
<HeaderQuinary
    text={core.name}
    headerStyle={[frameColorBckg, "-padding0-l"]}
    borderStyle={[H4_BORDER_STYLE, frameColorBrdr]}
    textStyle={["la-text-header", "la-prmy-header"]}

    collapseID={collID}

    renderOutsideCollapse={outerContent}
    contentLeft={headerQuinaryLeftOptions}
>
    <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
    <EffectBox
        name={getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation])}
        effect={core.active_effect}

        tooltipEnabled={tooltipEnabled}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
    <ActionBox
        uuid={frame.uuid}
        actions={core.active_actions}
        path={'system.core_system.active_actions'}

        collapseID={actionCollID}
        startCollapsed={false}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
    <DeployableBox
        source={actor}
        lidSource={core}
        uuid={frame.uuid}
        sheetUUID={actor.uuid}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
</HeaderQuinary>
{/if}
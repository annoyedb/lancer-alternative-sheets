<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getManufacturerColor } from "@/scripts/theme";
    import { slugify } from "@/scripts/lancer/util/lid";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
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
    
    let frame: any = system.loadout.frame!.value;
    let core: any = frame.system.core_system;
    let collID: string = `${actor.uuid}.${frame.id}.activePower`;
    let actionCollID: string = `${actor.uuid}.${frame.id}.activePower.action`;
    let name = core.active_actions.length ? core.active_actions[0].name : getLocalized("LA.activate.label");
    let activationClass = `activation-${slugify(core.activation, "-")}`;
    let activationTheme = system.core_energy
        ? `${ACTIVATION_COLOR_MAP[core.activation]}`
        : "la-bckg-repcap";
    let frameColorBckg = getManufacturerColor(frame.system.manufacturer, "bckg")
    let frameColorBrdr = system.core_energy
        ? getManufacturerColor(frame.system.manufacturer, "brdr")
        : "la-brdr-repcap";
    let tip = TooltipFactory.buildTooltip(
        `${core.active_effect}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[core.activation])}`, 
        getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation]).toUpperCase());
</script>

<!-- Frame Active -->
{#if core.active_effect || core.active_actions.length || core.active_bonuses.length }
{#snippet headerQuinaryLeftOptions()}
<EffectButton
    iconStyle={[H2_ICON_SIZE, "cci", ACTIVATION_ICON_MAP[core.activation]]}
    
    flowClass={FlowClass.None}
    disabled={true}
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
        data-tooltip-class={"clipped-bot la-tooltip"}
        data-tooltip-direction={TooltipDirection.LEFT}
        aria-label={name}
        disabled={!system.core_energy}
    >
        <i class="la-corepower__i cci cci-activate la-dropshadow -flexthird -textalignleft -height5 -lineheight5 -fontsize13"></i>
        <span class="la-corepower__span {system.core_energy ? "-glow-header -glow-primary-hover" : "la-dropshadow"} -upper -flexthird -textwrapnowrap">
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
    textStyle={["la-text-header", "la-anim-header"]}

    collapseID={collID}

    renderOutsideCollapse={outerContent}
    headerContentLeft={headerQuinaryLeftOptions}
>
    <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
    <EffectBox
        name={getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation])}
        effect={core.active_effect}
    />
    <ActionBox
        uuid={frame.uuid}
        actions={core.active_actions}
        path={'system.core_system.active_actions'}
        collapseID={actionCollID}
        startCollapsed={false}
    />
    <DeployableBox
        source={actor}
        lidSource={core}
        uuid={frame.uuid}
        sheetUUID={actor.uuid}
    />
</HeaderQuinary>
{/if}
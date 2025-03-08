<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getManufacturerColor } from "@/scripts/theme";
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";
    import { slugify } from "@/scripts/lancer/util/lid";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";

    const {
        actor,
        collapse,
        system,
    }: MechSheetProps = $props();
    
    let frame: any = system.loadout.frame!.value;
    let core: any = frame.system.core_system;
    let collID: string = `${actor.uuid}_${frame.id}_activepower`;
    let actionCollID: string = `${actor.uuid}_${frame.id}_activepower_action`;
    let name = core.active_actions.length ? core.active_actions[0].name : getLocalized("LA.activate.label");
    let activationClass = `activation-${slugify(core.activation, "-")}`;
    let activationTheme = system.core_energy
        ? ACTIVATION_COLOR_MAP[core.activation]
        : "la-bckg-repcap";
    let frameColorBckg = system.core_energy 
        ? getManufacturerColor(frame.system.manufacturer, "bckg")
        : "la-bckg-repcap";
    let frameColorBrdr = system.core_energy
        ? getManufacturerColor(frame.system.manufacturer, "brdr")
        : "la-brdr-repcap";
    let tip = TooltipFactory.buildTooltip(
        `${core.active_effect}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[core.activation])}`, 
        getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation]).toUpperCase());
</script>

<!-- Frame Active -->
<div class="la-effectbox -largeheader la-bckg-card la-brdr-repcap -widthfull -margin3-t -bordersround-ltb {frameColorBrdr}">
    <div class="la-actionheader la-combine-h {frameColorBckg} la-text-header clipped -padding0-lr
            collapse-trigger"
        data-la-collapse-id="{registerCollapse(collapse, collID, false)}">
        <i class="cci {ACTIVATION_ICON_MAP[core.activation]} -fontsize5 -lineheight5 -flexthird"></i>
        <span class="-fontsize2 -flexthird -textwrapnowrap -textaligncenter -lineheight5"><!--
        --->{core.active_name}<!--
    ---></span>
        <div class="-flexthird">
        </div>
    </div>
    <div class="la-combine-h -widthfull {system.core_energy ? "la-dropshadow" : ""}">
        <button type="button"
            class="la-corepower clipped la-text-header la-combine-h -padding0-tb -fontsize3 -lineheight5 -widthfull {activationTheme} {system.core_energy ? "" : "-disabled"}
                activation-flow {activationClass}"
            data-uuid="{frame.uuid}" 
            data-path="system.core_system"
            data-tooltip="{tip}"
            data-tooltip-class="clipped-bot la-tooltip"
            data-tooltip-direction="LEFT"
            aria-label="{name}"
            disabled={!system.core_energy}
        >
            <i class="la-corepower__i cci cci-activate la-dropshadow -flexthird -textalignleft -height5 -lineheight5 -fontsize13"></i>
            <span class="la-corepower__span la-dropshadow -upper -flexthird -textwrapnowrap"><!--
            --->{name}<!--
        ---></span>
            <div class="-flexthird">
            </div>
        </button>
    </div>
    <div class="
            collapse"
        data-la-collapse-id="{registerCollapse(collapse, collID, true)}">
        <div class="la-divider-h -margin0-tb la-bckg-primary"></div>
        <div class="la-combine-v -gap1">
            <EffectBox
                name={getLocalized(ACTIVATION_LOCALIZE_MAP[core.activation])}
                effect={core.active_effect}
            />
            <!-- Generated Content -->
            <ActionBox
                uuid={frame.uuid}
                actions={core.active_actions}
                path={'system.core_system.active_actions'}
                collapse={collapse}
                collapseID={actionCollID}
                startCollapsed={false}
            />
            <DeployableBox
                source={actor}
                lidSource={core}
                collapse={collapse}
            />
        </div>
    </div>
</div>
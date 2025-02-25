<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getManufacturerColor } from "@/scripts/theme";
    import { getLocalized } from "@/scripts/helpers";
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import EffectBox from "../actor/EffectBox.svelte";

    const {
        actor,
        collapse,
        system,
    }: MechSheetProps = $props();

    let frame: any = system.loadout.frame!.value;
    let core: any = frame.system.core_system;
    let frameColorBckg = getManufacturerColor(frame.system.manufacturer, "bckg")
    let frameColorBrdr = getManufacturerColor(frame.system.manufacturer, "brdr")
    let collID: string = `${actor.uuid}_${frame.id}_passivepower`;
    let actionCollID: string = `${actor.uuid}_${frame.id}_passivepower_action`;
    let tip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
</script>

{#if core.passive_effect !== "" || core.passive_actions.length || core.passive_bonuses.length}
<!-- Frame Passive -->
<div class="la-spacer -medium"></div>
<div class="la-effectbox la-bckg-card la-brdr-repcap -widthfull -descriptive -bordersround-ltb {frameColorBrdr}">
    <div class="la-actionheader la-combine-h {frameColorBckg} la-text-header clipped -padding0-lr
            collapse-trigger"
        data-la-collapse-id="{registerCollapse(collapse, collID, false)}">
        <i class="cci cci-corebonus -fontsize5 -lineheight5 -flexthird"></i>
        <span class="-fontsize2 -flexthird -textwrapnowrap -lineheight5 -textaligncenter">
            {core.passive_name}
        </span>
        <div class="la-options la-combine-h -flexthird -justifyend">
            <button type="button" 
                class="chat-flow-button -glow-header -glow-primary-hover -fontsize2 -padding1-r" 
                data-type={"passive"} 
                data-uuid="{frame.uuid}"
                data-tooltip={tip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"RIGHT"}
                aria-label={getLocalized("LA.chat.tooltip")}>
                <i class="mdi mdi-message"></i>
            </button>
        </div>
    </div>
    <div class="la-generated
            collapse collapsed"
        data-la-collapse-id="{registerCollapse(collapse, collID, true)}"
    >
    {#if core.passive_effect}
        <EffectBox
            name={getLocalized("LA.mech.core.passive.label")}
            effect={core.passive_effect}
        />
    {/if}
        <!-- Generated Content -->
        <ActionBox
            uuid={frame.uuid}
            actions={core.passive_actions}
            path={'system.core_system.passive_actions'}
            collapse={collapse}
            collapseID={actionCollID}
            startCollapsed={false}
        />
    </div>
</div>
{/if}
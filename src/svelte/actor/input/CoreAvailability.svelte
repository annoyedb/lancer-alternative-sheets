<!-- Cursed core power button from original sheet -->
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    
    const {
        system,
    }: any = $props();
    
    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.mech.core.available.tooltip"));
</script>

<input 
    name="system.core_energy" 
    class="core-power-toggle mdi mdi-battery-outline la-text-repcap -fontsize6" 
    type="checkbox" 
    data-dtype="Boolean"
    data-tooltip={tipEnabled ? tip : undefined}
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction="RIGHT"
    onpointerenter={ event => sendToLog(event, getLocalized("LA.mech.core.available.tooltip"), TextLogHook.MechHeader) }
    onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
    bind:checked={system.core_energy}
/>

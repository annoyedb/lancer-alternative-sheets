<!-- Cursed core power button from original sheet -->
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    
    const {
        system,
    }: any = $props();
    
    let tip = TooltipFactory.buildTooltip(getLocalized("LA.mech.core.available.tooltip"));
</script>

<input 
    name="system.core_energy" 
    class="core-power-toggle mdi mdi-battery-outline la-text-repcap -fontsize6" 
    type="checkbox" 
    data-dtype="Boolean"
    data-tooltip={tip}
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction="RIGHT"
    bind:checked={system.core_energy}
/>

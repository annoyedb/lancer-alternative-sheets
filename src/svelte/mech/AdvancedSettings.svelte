<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { advancedStates } from "@/scripts/advanced";

    const {
        actor
    }: MechSheetProps = $props();

    // This is initialized in the Header's onMount function
    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);
</script>

{#if advancedOptions}
<div class="la-combine-h -alignstart -heightfull">    
    <span class="la-bckg-primary la-text-header clipped-top -width5 -writingmode-v -fontsize1 -padding0-b -padding1-t">
        Edit Mounts
    </span>
    <div class="la-combine-v">
        <button type="button" 
            class="la-text-secondary -glow-primary-hover -fontsize2 -height1"
            aria-label="TEMP"
        >
            <i class="mdi mdi-plus-box -verticalaligntop"></i>
        </button>
        <button type="button" 
            class="la-text-secondary -glow-primary-hover -fontsize2 -height1"
            aria-label="TEMP"
        >
            <i class="mdi mdi-minus-box -verticalaligntop"></i>
        </button>
        <button type="button" 
            class="la-text-secondary -glow-primary-hover -fontsize2 -height1"
            aria-label="TEMP"
        >
            <i class="mdi mdi-list-box -verticalaligntop"></i>
        </button>
    </div>
</div>
{/if}
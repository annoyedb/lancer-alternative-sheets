<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { activeTab, advancedStates } from "@/scripts/advanced";
    import { getLocalized } from "@/scripts/helpers";

    const {
        actor
    }: MechSheetProps = $props();

    // This is initialized in the Header's onMount function
    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);
    let active = $derived($activeTab);
</script>

{#if advancedOptions}
{#if active === "loadout"}
<div class="la-combine-h -alignstart -heightfull">    
    <span class="la-bckg-primary la-text-header clipped-top -width5 -writingmode-v -fontsize1 -padding0-b -padding1-t">
        Edit Mounts
    </span>
    <div class="la-combine-v">
        <button type="button" 
            class="la-text-secondary -glow-primary-hover -fontsize2 -height1"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.add.tooltip"))}
            data-tooltip-direction={TooltipDirection.RIGHT}
            data-tooltip-class={"la-tooltip clipped-bot"}
            aria-label={getLocalized("LA.advanced.mount.add.tooltip")}
        >
            <i class="mdi mdi-plus-box -verticalaligntop"></i>
        </button>
        <button type="button" 
            class="la-text-secondary -glow-primary-hover -fontsize2 -height1"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.remove.tooltip"))}
            data-tooltip-direction={TooltipDirection.RIGHT}
            data-tooltip-class={"la-tooltip clipped-bot"}
            aria-label={getLocalized("LA.advanced.mount.remove.tooltip")}
        >
            <i class="mdi mdi-minus-box -verticalaligntop"></i>
        </button>
        <button type="button" 
            class="la-text-secondary -glow-primary-hover -fontsize2 -height1"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.edit.tooltip"))}
            data-tooltip-direction={TooltipDirection.RIGHT}
            data-tooltip-class={"la-tooltip clipped-bot"}
            aria-label={getLocalized("LA.advanced.mount.edit.tooltip")}
            onclick={(event) => TooltipFactory.activateLockedTooltip(event, "AAAAAAA", TooltipDirection.RIGHT)}
        >
            <i class="mdi mdi-list-box -verticalaligntop"></i>
        </button>
    </div>
</div>
{/if}
{/if}
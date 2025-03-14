<!-- (#2) This is separated because of the use of on:click -->
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getLocalized } from "@/scripts/helpers";
    import { SETTINGS_BUTTON_STYLE } from "@/svelte/mech/settings/AdvancedSettings.svelte";
    
    const addTip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.add.tooltip"));
    function addMount(event: MouseEvent)
    {
        event.stopPropagation();
        TooltipFactory.unrenderTooltips();
    }
</script>

<button type="button"
    class={`${SETTINGS_BUTTON_STYLE}
        gen-control`}
    data-path={"system.loadout.weapon_mounts"}
    data-action={"append"}
    data-action-value="(struct)wep_mount"
    data-tooltip={addTip}
    data-tooltip-direction={TooltipDirection.RIGHT}
    data-tooltip-class={"la-tooltip clipped-bot"}
    aria-label={getLocalized("LA.advanced.mount.add.tooltip")}
    on:click={event => addMount(event)}
>
    <i class="mdi mdi-plus-box -verticalaligntop"></i>
</button>
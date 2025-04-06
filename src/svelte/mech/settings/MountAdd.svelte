<!-- (#2) This is separated because of the use of on:click -->
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { SETTINGS_BUTTON_STYLE } from "@/svelte/mech/settings/AdvancedSettings.svelte";
    
    const tooltipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.add.tooltip"));
    function addMount(event: MouseEvent)
    {
        event.stopPropagation();
        TooltipFactory.unrenderTooltips();
    }
</script>

<button type="button"
    class="{SETTINGS_BUTTON_STYLE}
        gen-control"
    data-path={"system.loadout.weapon_mounts"}
    data-action={"append"}
    data-action-value="(struct)wep_mount"
    data-tooltip={tooltipEnabled ? tip : undefined}
    data-tooltip-direction={TooltipDirection.RIGHT}
    data-tooltip-class={"la-tooltip clipped-bot"}
    onpointerenter={ event => sendToLog(event, getLocalized("LA.advanced.mount.add.tooltip"), TextLogHook.MechHeader) }
    onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
    onclick={ event => addMount(event) }
    aria-label={getLocalized("LA.advanced.mount.add.tooltip")}
>
    <i class="mdi mdi-plus-box -verticalaligntop"></i>
</button>
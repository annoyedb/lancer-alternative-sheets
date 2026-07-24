<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getLocalized } from "@/scripts/helpers";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";
    import { getActorContext } from "@/scripts/context";
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    const {
        system,
        tooltipEnabled,
        tooltipClass,
        tooltipTheme,
    }: any = $props();
    const actorUuid = getActorContext()?.uuid;

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.mech.core.available.tooltip"));
    const qualityMode = getExtraEffectsEnabled();
</script>

<label
    class="mdi -fontsize8 -pointercursor
             {system.core_energy
             ? 'mdi-battery-high la-text-system' + (qualityMode
                ? ' -pulse-glow-prmy la-prmy-warning'
                : '')
             : 'mdi-battery-off-outline la-text-repcap'}"
    data-tooltip={tooltipEnabled ? tip : undefined}
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
    data-tooltip-direction={TooltipDirection.RIGHT}
    onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.mech.core.available.tooltip"), actorUuid!) }
    onpointerleave={ event => resetTextConsole(event, actorUuid!) }
>
    <input
        name="system.core_energy"
        type="checkbox"
        data-dtype="Boolean"
        style="display: none"
        bind:checked={system.core_energy}
    />
</label>
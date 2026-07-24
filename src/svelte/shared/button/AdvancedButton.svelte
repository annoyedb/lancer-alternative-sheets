<!-- TODO: refactor into GlyphButton -->
<script lang="ts">
    import { getAdvancedState, setAdvancedState } from "@/scripts/store/advanced";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";
    import { getActorContext } from "@/scripts/context";
    import { getLocalized } from "@/scripts/helpers";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";

    type AdvancedButtonProps = {
        uuid: string;
    }

    const {
        uuid,

        style,
        iconStyle,

        logText,
        logging,

        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipClass,
        tooltipTheme,
        tooltipDirection,
    }: AdvancedButtonProps & IconButtonProps & TextLogEventProps & TooltipProps = $props();
    const actorUuid = getActorContext()?.uuid;
    let advancedOptions = $derived(getAdvancedState(uuid));

    const tip = $derived(TooltipFactory.buildTooltip(tooltip || getLocalized("LA.advanced.tooltip"), tooltipHeader));
    const log = $derived(logText || getLocalized("LA.advanced.tooltip"));

    function toggleAdvancedOptions(event: MouseEvent)
    {
        event.stopPropagation();
        setAdvancedState(uuid, !advancedOptions);
    }
</script>
<script lang="ts" module>
    const _DEFAULT_BUTTON = "-fontsize5";
    const _DEFAULT_I = "-fontsize7 la-text-header";
</script>

{#if uuid}
<button type="button"
    class="{style?.join(' ') || _DEFAULT_BUTTON}"
    aria-label={getLocalized("LA.advanced.tooltip")}
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
    data-tooltip-direction={tooltipDirection || TooltipDirection.LEFT}
    onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
    onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
    onclick={(event) => toggleAdvancedOptions(event)}
>
    <i class="mdi {iconStyle?.join(' ') || _DEFAULT_I}
        {advancedOptions ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'}"
    ></i>
</button>
{/if}
<!-- TODO: refactor into GlyphButton -->
<script lang="ts">
    import type { Snippet } from "svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { FlowButtonProps } from "@/interfaces/actor/button/FlowButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        children,

        style,
        onClick,

        flowClass,
        disabled,
        
        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,

        logText,
        logType,
        logTypeReset,
    }: {children?: Snippet} & FlowButtonProps & ButtonProps & TooltipProps & TextLogEventProps = $props();

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.advanced.inventory.open.tooltip"), tooltipHeader);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.advanced.inventory.open.tooltip");
</script>

<div class="inventory -widthfull -heightfull">
    <button type="button"
        class="
            {style?.join(' ')}
            {flowClass}"
        data-tooltip={tooltipEnabled ? tip : undefined }
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.RIGHT}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        onclick={onClick}
        aria-label={tooltip}
        disabled={disabled}
    >
    {#if children}
        {@render children()}
    {/if}
    </button>
</div>
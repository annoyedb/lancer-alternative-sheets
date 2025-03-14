<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { FlowButtonProps } from "@/interfaces/actor/button/FlowButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { Snippet } from "svelte";

    const {
        children,

        style,
        onClick,

        flowClass,
        disabled,
        
        tooltip,
        tooltipHeader,
        tooltipDirection
    }: {children?: Snippet} & FlowButtonProps & ButtonProps & TooltipProps = $props();

    const tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : null;
</script>

<div class="inventory -widthfull -heightfull">
    <!-- (#2) -->
    <!-- svelte-ignore event_directive_deprecated -->
    <button type="button"
        class="
            {style?.join(' ')}
            {flowClass}"
        data-tooltip={tip}
        data-tooltip-class="clipped-bot la-tooltip"
        data-tooltip-direction={tooltipDirection || TooltipDirection.RIGHT}
        aria-label={tooltip}
        disabled={disabled}
        on:click={onClick}
    >
    {#if children}
        {@render children()}
    {/if}
    </button>
</div>
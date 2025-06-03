<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { EditMode } from "@/enums/EditMode";
    import type { PointerClickProps } from "@/interfaces/actor/events/PointerClickProps";
    import type { StatComboProps } from "@/interfaces/actor/StatComboProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        icon,
        label,
        value,
        valuePath,
        outerStyle,
        innerStyle,
        editable,

        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,

        onPointerClick,
    }: StatComboProps & TooltipProps & PointerClickProps = $props();
    const tip = tooltip ? TooltipFactory.buildTooltip(tooltip, tooltipHeader) : undefined;

    function handleSubtract(event: MouseEvent)
    {
        if (onPointerClick && valuePath)
            onPointerClick(event, value, valuePath, EditMode.Subtract);
    }

    function handleAddition(event: MouseEvent)
    {
        if (onPointerClick && valuePath)
            onPointerClick(event, value, valuePath, EditMode.Add);
    }
</script>

{#snippet renderEditable()}
<div class="-widthfull -positionrelative">
    <div class="la-combine-h {editable ? "" : "-displaynone"}"><!--
    ---><button type="button"
            class="la-bckg-secondary -width1
                clicker-minus-button input-update"
            data-tooltip={tooltipEnabled ? undefined : undefined}
            data-tooltip-class="clipped-bot la-tooltip {tooltipTheme}"
            data-tooltip-direction={"UP"}
            aria-label={getLocalized("LA.subtract.label")}
            onclick={event => handleSubtract(event)}
        >-</button><!--
    ---><input type="number"
            class="la-text-text -bold -width3ch -height1"
            name={valuePath}
            value={value}
            data-dtype={"Number"}
        /><!--
    ---><button type="button"
            class="la-bckg-secondary -width1
                clicker-plus-button input-update"
            data-tooltip={tooltipEnabled ? undefined : undefined}
            data-tooltip-class="clipped-bot la-tooltip {tooltipTheme}"
            data-tooltip-direction={"UP"}
            aria-label={getLocalized("LA.add.label")}
            onclick={event => handleAddition(event)}
        >+</button><!--
---></div>
    <span class="-widthfull {editable ? "-displaynone" : ""}">{value}</span>
</div>
{/snippet}

<div class="la-shortstat la-combine-h {outerStyle?.join(' ')}">
    <!-- the mdi shield is a bit larger than the cci icons -->
    <i class="{icon}"></i>
    <div class="la-combine-v {innerStyle?.join(' ')}"
        data-tooltip={tooltipEnabled && !editable ? tip : undefined}
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection ? tooltipDirection : "RIGHT" }
    >
    {#if valuePath != undefined && value != undefined && editable != undefined}
        {@render renderEditable()}
    {:else}
        <span class="-widthfull">{value}</span>
    {/if}
        <span class="">{label}</span>
    </div>
</div>
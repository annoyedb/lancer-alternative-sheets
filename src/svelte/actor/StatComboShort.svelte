<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { EditMode } from "@/enums/EditMode";
    import { FlowClass } from "@/enums/FlowClass";
    import type { ContentSidesProps } from "@/interfaces/actor/decoration/ContentSidesProps";
    import type { PointerClickProps } from "@/interfaces/actor/events/PointerClickProps";
    import type { StatComboProps } from "@/interfaces/actor/StatComboProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

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

        contentLeft,
        contentRight,
    }: StatComboProps & TooltipProps & PointerClickProps & ContentSidesProps = $props();
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
    <div class="la-combine-h {editable ? "" : "-displaynone"}">
        <GlyphButton
            style={["la-bckg-secondary -width1", "clicker-minus-button input-update"]}
            flowClass={FlowClass.None}
            tooltipEnabled={false}
            onClick={handleSubtract}
        >-</GlyphButton>
        <input type="number"
            class="la-text-text -bold -width3ch -height1"
            name={valuePath}
            value={value}
            data-dtype={"Number"}
            onfocus={event => event.currentTarget.select()}
        />
        <GlyphButton
            style={["la-bckg-secondary -width1", "clicker-plus-button input-update"]}
            flowClass={FlowClass.None}
            tooltipEnabled={false}
            onClick={handleAddition}
        >+</GlyphButton>
    </div>
    <span class="-widthfull {editable ? "-displaynone" : ""}">{value}</span>
</div>
{/snippet}

<div class="la-shortstat la-combine-h {outerStyle?.join(' ')}">
    <i class="{icon}"></i>
    {#if contentLeft}
        {@render contentLeft()}
    {/if}
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
    {#if contentRight}
        {@render contentRight()}
    {/if}
</div>
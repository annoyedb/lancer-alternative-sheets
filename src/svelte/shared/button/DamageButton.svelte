<!-- TODO: refactor into GlyphButton -->
<script lang="ts">
    import DamageArray from "@/svelte/shared/DamageArray.svelte";
    import RangeArray from "@/svelte/shared/RangeArray.svelte";

    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { WeaponProps } from "@/interfaces/actor/button/WeaponProps";
    import type { PointerHoverProps } from "@/interfaces/actor/events/PointerHoverProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";

    const {
        damage,
        range,

        style,
        iconStyle,
        iconBackgroundStyle,

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

        onPointerEnter,
        onPointerLeave,
    }: WeaponProps & IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps & PointerHoverProps = $props();
    
    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.rollDamage.tooltip"), tooltipHeader);
    const hasAllWeaponProperties = damage?.length && range?.length;
    const rollable = !disabled && (damage?.length > 0);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.rollDamage.tooltip");

    function handleOnPointerEnter(event: PointerEvent) 
    {
        if (onPointerEnter)
            onPointerEnter();

        if (logging)
            sendToLog(event, log, logType);
        else
            return undefined;
    }

    function handleOnPointerLeave(event: PointerEvent) 
    {
        if (onPointerLeave)
            onPointerLeave();

        if (logging)
            resetLog(event, logTypeReset);
        else
            return undefined;
    }
</script>
<script lang="ts" module>
    const _DEFAULT_I_BACKGROUND = `-fontsize11 la-text-scrollbar-secondary`;
</script>

<button type="button"
    class="
        la-properties la-flexcol -fontsize5 la-prmy-accent -justifycenter -positionrelative
        {hasAllWeaponProperties ? "-divider" : ""} 
        {style?.join(' ')}
        {flowClass || FlowClass.RollDamage}"
    data-tooltip={tooltipEnabled && rollable ? tip : undefined }
    data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ handleOnPointerEnter }
    onpointerleave={ handleOnPointerLeave }
    aria-label={tooltip || getLocalized("LA.flow.rollDamage.tooltip")}
    disabled={!rollable}
>
    <!-- Generated Range -->
{#if range}
    <RangeArray
        ranges={range}
        style={iconStyle}
    />
{/if}
    <!-- Generated Damage -->
{#if damage}
    <DamageArray
        damages={damage}
        style={(iconStyle || []).concat(disabled 
            ? "" 
            : "la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover")
        }
    />
{/if}
{#if !disabled && damage?.length}
    <i 
        class="fal fa-dice-d20 -positionabsolute 
            {iconBackgroundStyle?.join(' ') || _DEFAULT_I_BACKGROUND}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
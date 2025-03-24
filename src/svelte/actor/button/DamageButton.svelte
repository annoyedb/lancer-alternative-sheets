<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { WeaponProps } from "@/interfaces/actor/button/WeaponProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { resetLog, sendToLog } from "@/scripts/text-log";
    import DamageArray from "@/svelte/actor/DamageArray.svelte";
    import RangeArray from "@/svelte/actor/RangeArray.svelte";

    const {
        damage,
        range,

        style,
        iconStyle,
        iconBackgroundStyle,

        flowClass,
        disabled,

        tooltip,
        tooltipHeader,
        tooltipDirection,
        tooltipClass,
        
        logText,
        logType,
        logTypeReset,
    }: WeaponProps & IconButtonProps & ButtonProps & TooltipProps & TextLogEventProps = $props();
    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.rollDamage.tooltip"), tooltipHeader);
    const hasAllWeaponProperties = damage?.length && range?.length;
    const rollable = !disabled && (damage?.length > 0);
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.flow.rollDamage.tooltip");
</script>
<script lang="ts" module>
    const _ICON_BG_STYLE = `-positionabsolute -fontsize9 la-text-scrollbar-secondary`;
</script>

<button type="button"
    class="la-properties la-combine-v -fontsize3 la-anim-accent
        {hasAllWeaponProperties ? "-divider" : ""} 
        {style?.join(' ')}
        {flowClass || FlowClass.RollDamage}"
    data-tooltip={tipEnabled && rollable ? tip : undefined }
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
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
        style={[...iconStyle || [], disabled ? "" : "-glow-header -glow-primary-hover"]}
    />
{/if}
{#if !disabled && damage?.length}
    <i 
        class="fal fa-dice-d20 
            {iconBackgroundStyle?.join(' ') || _ICON_BG_STYLE}" 
        style="z-index: -1;"
    ></i>
{/if}
</button>
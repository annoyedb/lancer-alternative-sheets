<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HeaderTertiaryProps } from "@/interfaces/actor/HeaderTertiaryProps";
    import { getLocalized } from "@/scripts/helpers";
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";
    import DamageArray from "./DamageArray.svelte";
    import RangeArray from "./RangeArray.svelte";

    const {
        children,
        renderOutsideCollapse,

        title,
        subTitle,
        itemID,
        uuid,
        path,
        acceptTypes,

        headerStyle,
        headerFontStyle,
        subHeaderFontStyle,
        iconStyle,
        borderStyle,
        rootStyle,
        collapse,
        collapseID,
        startCollapsed,

        editOption,
        editStyle,
        editIconStyle,

        messageOption,
        messageStyle,
        messageIconStyle,

        spOption,
        spValue,
        spTextStyle,
        spIconStyle,

        weaponOption,
        weaponStyle,
        weaponDestroyed,
        weaponRange,
        weaponDamage,

        rollAttackOption,
        rollAttackStyle,
        rollAttackTooltipDirection,
    }: HeaderTertiaryProps = $props();
    
    let collapsing = collapse && collapseID;
    let collapsed = collapsing && startCollapsed ? "collapsed" : "";
    let extraOptions = editOption || messageOption || spOption || weaponOption ? true : false;
    let chatTip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
    let editTip = TooltipFactory.buildTooltip(getLocalized("LA.edit.tooltip"));
    let rollAttackTip = TooltipFactory.buildTooltip(getLocalized("LA.flow.rollAttack.tooltip"));
    let rollDamageTip = TooltipFactory.buildTooltip(getLocalized("LA.flow.rollDamage.tooltip"));
    const defaultHeaderStyle = "la-bckg-primary -padding0-tb -padding3-lr"
    const defaultRightOptionStyle = "-glow-header -glow-primary-hover -fontsize2"
</script>

<div class="la-collapsegroup -widthfull {rootStyle ? rootStyle.join(' ') : ""}
        ref set drop-settable mech_system"
    data-item-id={itemID}
    data-uuid={uuid}
    data-path={path}
    data-accept-types={acceptTypes}
    draggable="true"
    >
    <div class="la-summary la-combine-h la-dropshadow 
            -justifybetween -widthfull
            {headerStyle?.join(' ') || defaultHeaderStyle}
            {collapsing ? "collapse-trigger" : ""}"
        data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, false) : ""}">
        <!-- Icon, Name -->
        <div class="la-left la-combine-h">
        {#if rollAttackOption}
            <button type="button" 
                class="roll-attack la-text-header -fontsize9 -lineheight8"
                data-tooltip={rollAttackTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction={rollAttackTooltipDirection ?? "LEFT"}
                draggable="true"
                aria-label="{getLocalized("LA.flow.rollAttack.label")}"
                disabled={weaponDestroyed || false}
            >
                <i class="roll-attack__bckg fal fa-dice-d20 la-text-scrollbar-secondary"></i>
                <i class="roll-attack__icon cci cci-weapon -glow-header -glow-primary-hover {rollAttackStyle?.join(' ')}"></i>
            </button>
        {:else}
            <i class="la-icon {iconStyle?.join(' ') || "-fontsize9 -lineheight8"}"></i>
        {/if}
            <div class="la-summary-label la-combine-v la-anim-accent -alignleft -justifycenter -divider">
                <span class="la-top__span -widthfull {headerFontStyle?.join(' ') || "-fontsize3"}">{title}</span>
                <span class="la-bottom__span {subHeaderFontStyle?.join(' ') || "-fontsize0"}">{subTitle}</span>
            </div>
        </div>
        <!-- Options -->
        <div class="la-right la-combine-h">
        {#if extraOptions}
        {#if spOption && spValue}
            <div class="la-systempoints la-combine-h -aligncenter">
                <span class="{spTextStyle?.join(' ') || "-fontsize4"}">{spValue}</span>
                <i class="cci cci-system-point {spIconStyle?.join(' ') || "-fontsize4"}"></i>
            </div>
        {/if}
        {#if weaponOption}
            <button type="button"
                class="la-properties la-combine-v -fontsize3 la-anim-accent
                    {weaponDamage && weaponRange ? "-divider" : ""} {weaponStyle?.join(' ')}
                    compact-damage roll-damage"
                data-tooltip={rollDamageTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"
                disabled={weaponDestroyed || false}>
                <!-- Generated Range -->
                {#if weaponRange}
                <RangeArray
                    ranges={weaponRange}
                />
                {/if}
                <!-- Generated Damage -->
                {#if weaponDamage}
                <DamageArray
                    damages={weaponDamage}
                    style={["-glow-header"]}
                />
                {/if}
                <i class="fal fa-dice-d20 -positionabsolute -fontsize9 la-text-scrollbar-secondary" style="z-index: -1;"></i>
            </button>
        {/if}
            <div class="la-combine-v -margin3-lr">
            {#if messageOption}
                <button type="button"
                    class="{messageStyle?.join(' ') || defaultRightOptionStyle}
                        chat-flow-button"
                    data-uuid={uuid}
                    data-tooltip={chatTip}
                    data-tooltip-class={"clipped-bot la-tooltip"}
                    data-tooltip-direction={"RIGHT"}
                    aria-label="{getLocalized("LA.chat.tooltip")}">
                    <i class="mdi mdi-message {messageIconStyle?.join(' ')}"></i>
                </button>
            {/if}
            {#if editOption}
                <button type="button"
                    class="{editStyle?.join(' ') || defaultRightOptionStyle}
                        lancer-context-menu"
                    data-path={path}
                    data-tooltip={editTip}
                    data-tooltip-class={"clipped-bot la-tooltip"}
                    data-tooltip-direction={"RIGHT"}
                    aria-label="{getLocalized("LA.edit.label")}">
                    <i class="fas fa-ellipsis-v {editIconStyle?.join(' ')}"></i>
                </button>
            {/if}
            </div>
        {/if}
        </div>
    </div>
    {#if renderOutsideCollapse}
        {@render renderOutsideCollapse()}
    {/if}
    <div class="la-collapsegroup__wrapper
            {collapsing ? "collapse" : ""} {collapsed}"
        data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, true) : ""}"
    >
        <div class="la-collapsecontent la-dropshadow 
                -padding0-l -padding0-tb -bordersround-lb -widthfull -heightfull
                {borderStyle ? borderStyle.join(' ') : "la-brdr-primary"}"
        >
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
</div>
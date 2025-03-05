<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HeaderSecondaryProps } from "@/interfaces/actor/header/HeaderSecondaryProps";
    import { getLocalized } from "@/scripts/helpers";
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";

    const {
        children,
        renderOutsideCollapse,

        title,

        itemID,
        uuid,
        path,
        acceptTypes,
        
        headerStyle,
        headerFontStyle,
        headerIconStyle,
        borderStyle,
        rootStyle,
        collapse,
        collapseID,
        startCollapsed,

        spOption,
        spValue,
        spTextStyle,
        spIconStyle,

        deleteOption,
        deleteUUID,
        deleteOnClick,
        deleteStyle,

        messageOption,
        messageUUID,
        messageType,
        messageIndex,
        messageStyle,

        editOption,
        editStyle,
        editIconStyle,

        useEffectOption,
        useEffectStyle,
        useEffectTooltipDirection,
        useEffectTooltipHeader,
        useEffectTooltip,
        useEffectBackgroundStyle,
        useEffectClass,

        collapseAllOption,
    }: HeaderSecondaryProps = $props();
    
    let collapsing = collapse && collapseID;
    let collapsed = collapsing && startCollapsed ? "collapsed" : "";
    let extraOptions = deleteOption || messageOption || spOption || editOption ? true : false;
    let chatTip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
    let editTip = TooltipFactory.buildTooltip(getLocalized("LA.edit.tooltip"));
    let effectTip = TooltipFactory.buildTooltip(useEffectTooltip || getLocalized("LA.effect.tooltip"), useEffectTooltipHeader);
    let expandTip = TooltipFactory.buildTooltip(getLocalized("LA.collapseAll.tooltip"));

    const defaultHeaderStyle = "la-bckg-primary -padding0 -padding3-r";
    const defaultHeaderIconStyle = "-fontsize5 -lineheight3"
    const buttonDefaultStyle = "-glow-header -glow-primary-hover -fontsize2"

    // TODO: Refactor this into a reuseable function/component
    let expanding = $state(true);
    function collapseExpandAll(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
    {
        event.stopPropagation();

        const collapseGroup = event.currentTarget.closest('.la-collapsegroup');
        const triggers = collapseGroup?.querySelectorAll('[data-la-collapse-id]');
        if (triggers && triggers.length > 0) 
        {
            triggers.forEach((trigger, index) => {
                if (index <= 1) // Skip this header's pair
                    return;
                const id = trigger.getAttribute('data-la-collapse-id');
                if (id) 
                {
                    const pair = Array.from(triggers).find(t => t !== trigger && t.getAttribute('data-la-collapse-id') === id);
                    if (pair) 
                    {
                        if (expanding) 
                        {
                            pair.classList.remove('collapsed');
                            sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "opened");
                        } else 
                        {
                            pair.classList.add('collapsed');
                            sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "closed");
                        }
                    }
                }
            });
            expanding = !expanding;
        }
    }
</script>

<div class="la-collapsegroup -widthfull {rootStyle ? rootStyle.join(' ') : ""}
        {acceptTypes ? `ref set drop-settable ${acceptTypes}` : ""}"
    data-item-id={itemID}
    data-uuid={uuid}
    data-path={path}
    data-accept-types={acceptTypes}
    draggable="true"
>
    <div class="la-summary la-combine-h la-dropshadow 
                -justifybetween -widthfull -whitespacenowrap 
            {headerStyle?.join(' ') || defaultHeaderStyle}
            {collapsing ? "collapse-trigger" : ""}"
        data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, false) : ""}"
    >
        <!-- Icon, Name -->
        <div class="la-left la-combine-h -aligncenter -gap1 la-summary-label">
        {#if useEffectOption}
            <button type="button"
                class="{useEffectStyle?.join(' ')}
                    {useEffectClass || "effect-flow"}"
                data-path={path}
                data-tooltip={effectTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={useEffectTooltipDirection}
                aria-label={useEffectTooltip}>
                <i class="{headerIconStyle?.join(' ') || defaultHeaderIconStyle}"></i>
                <i class="fal fa-dice-d20 -positionabsolute -left0 {useEffectBackgroundStyle?.join(' ')}" style="z-index: -1;"></i>
            </button>
        {:else}
            <i class="la-icon {headerIconStyle?.join(' ') || defaultHeaderIconStyle} "></i>
        {/if}
            <span class="la-name__span {headerFontStyle?.join(' ') || "-fontsize2"}">{title}</span>
        </div>
    {#if extraOptions}
        <!-- Options -->
        <div class="la-right la-combine-h">
        {#if spOption && spValue}
            <div class="la-systempoints la-combine-h -aligncenter">
                <span class="{spTextStyle?.join(' ') || "-fontsize4"}">{spValue}</span>
                <i class="cci cci-system-point {spIconStyle?.join(' ') || "-fontsize4"}"></i>
            </div>
        {/if}
        {#if deleteOption && deleteUUID}
            <!-- (#3) onclick bug: https://github.com/sveltejs/svelte/issues/14704 -->
            <!-- svelte-ignore event_directive_deprecated -->
            <button type="button"
                class="la-delete {deleteStyle?.join(' ') || buttonDefaultStyle}" 
                data-uuid="{deleteUUID}"
                aria-label="{getLocalized("LA.delete.label")}"
                on:click={deleteOnClick ? (event) => deleteOnClick(event) : null}
            >
                <i class="fas fa-trash"></i>
            </button>
        {/if}
        {#if messageOption && messageUUID}
            <button type="button"
                class="{messageStyle?.join(' ') || buttonDefaultStyle}
                    chat-flow-button"
                data-uuid="{messageUUID}"
                data-tooltip={chatTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"UP"}
                data-type={messageType}
                data-index={messageIndex}
                data-rank={messageType === "rank" ? messageIndex : ""}
                aria-label="{getLocalized("LA.chat.tooltip")}">
                <i class="mdi mdi-message"></i>
            </button>
        {/if}
        {#if editOption}
            <button type="button"
                class="{editStyle?.join(' ') || buttonDefaultStyle}
                    lancer-context-menu"
                data-path={path}
                data-tooltip={editTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"UP"}
                aria-label="{getLocalized("LA.edit.label")}">
                <i class="fas fa-ellipsis-v {editIconStyle?.join(' ')}"></i>
            </button>
        {/if}
        {#if collapseAllOption}
            <!-- (#2) -->
            <!-- svelte-ignore event_directive_deprecated -->
            <button type="button"
                class="mdi {expanding ? "mdi-arrow-expand-all" : "mdi-arrow-collapse-all"} -glow-header -glow-primary-hover la-text-header -fontsize3 -lineheight3"
                data-tooltip={expandTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"UP"}
                aria-label={getLocalized("LA.collapseAll.tooltip")}
                on:click={(event) => collapseExpandAll(event)}
            >
            </button>
        {/if}
        </div>
    {/if}
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
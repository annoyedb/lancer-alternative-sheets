<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HeaderMainProps } from "@/interfaces/actor/header/HeaderMainProps";
    import { collapseStates, handleCollapseAllToggle, handleCollapseToggle, initializeCollapseStates } from "@/scripts/collapse";
    import { getLocalized } from "@/scripts/helpers";
    import { onMount } from "svelte";

    const {
        children,

        title,

        headerStyle,
        headerFontStyle,
        cursorStyle,
        borderStyle,
        rootStyle,

        collapseID,
        startCollapsed,
        extensionText,

        deleteOption,
        deleteStyle,
        deleteIconStyle,
        deleteUUID,
        deleteOnClick,

        messageOption,
        messageUUID,

        spOption,
        spCurrent,
        spMax,
        spTextStyle,
        spIconStyle,

        mountOption,
        mountNames,

        collapseAllOption,
    }: HeaderMainProps = $props();
    
    let isCollapsed = $derived.by(() => {
        if (collapseID && $collapseStates[collapseID])
            return $collapseStates[collapseID].collapsed;
        return false;
    });
    let isExpanding = $derived(!isCollapsed);

    const extraOptions = collapseAllOption || deleteOption || messageOption || spOption || mountOption ? true : false;
    const expandTip = TooltipFactory.buildTooltip(getLocalized("LA.collapseAll.tooltip"));
    const chatTip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
    const deleteTip = TooltipFactory.buildTooltip(getLocalized("LA.delete.tooltip"));
    const defaultHeaderStyle = "la-bckg-primary -padding0-tb -padding3-lr"
    const defaultHeaderFontStyle = "la-text-header"
    const defaultDeleteStyle = "-glow-header -glow-primary-hover -fontsize2"
    const defaulltSPStyle = "-fontsize5 -lineheight3 -width3"

    onMount(() => 
    {
        if (collapseID)
        {
            initializeCollapseStates(collapseID, startCollapsed);
        }
    });

    function toggleCollapse(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) 
    {
        if (collapseID)
            handleCollapseToggle(event, collapseID);
    }

    function toggleCollapseAll(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) 
    {
        if (collapseID)
            handleCollapseAllToggle(event, collapseID);
    }
</script>

<div class="la-collapsegroup -widthfull {rootStyle?.join(' ')}
        {collapseID ? "collapse-trigger" : ""}"
>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <!-- (#2) -->
    <!-- svelte-ignore event_directive_deprecated -->
    <h1 class="la-summary la-combine-h la-dropshadow 
            -justifybetween -widthfull -whitespacenowrap 
            {headerStyle?.join(' ') || defaultHeaderStyle}"
        on:click={(event) => toggleCollapse(event)}
    >
        <!-- Header Label -->
        <div class="la-summary-label {headerFontStyle?.join(' ') || defaultHeaderFontStyle}">
            <span class="la-terminal -fadein {headerFontStyle?.join(' ') || defaultHeaderFontStyle}">>//: </span><!--
        ---><span>{title} </span>
            <span class="la-extension -lower -fadein {headerFontStyle?.join(' ') || defaultHeaderFontStyle}"><!--
            --->{extensionText ? extensionText : `--${getLocalized("LA.scan.label")}`}<!--
        ---></span><!--
        ---><span class="la-cursor la-anim-header -fadein {cursorStyle ? cursorStyle.join(' ') : ""}"></span>
        </div>
        <!-- Header Options -->
    {#if extraOptions}
        <div class="la-combine-h -gap2">
        {#if spOption}
            <div class="la-combine-h -height2">
                <div class="{spTextStyle?.join(' ') || "-fontsize2"}">
                    {spCurrent} / {spMax}
                </div>
                <i class="cci cci-system-point {spIconStyle?.join(' ') || defaulltSPStyle}"></i>
            </div>
        {/if}
        {#if mountOption && mountNames && mountNames.length}
            <div class="la-combine-v la-text-header -gap0 -aligncenter -fontsize0 -height3 -lineheight0">
            {#each mountNames as mountName}
                <span class="-widthfull -textalignright">{mountName}</span>
            {/each}
            </div>
        {/if}
        {#if deleteOption && deleteUUID}
            <!-- (#2) onclick bug: https://github.com/sveltejs/svelte/issues/14704 -->
            <!-- svelte-ignore event_directive_deprecated -->
            <button type="button"
                class="la-delete {deleteStyle?.join(' ') || defaultDeleteStyle}" 
                data-uuid="{deleteUUID}"
                data-tooltip={deleteTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"UP"}
                aria-label="{getLocalized("LA.delete.tooltip")}"
                on:click={deleteOnClick ? (event) => deleteOnClick(event) : null}
            >
                <i class="fas fa-trash {deleteIconStyle?.join(' ')}"></i>
            </button>
        {/if}
        {#if messageOption && messageUUID}
            <button type="button"
                class="chat-flow-button -glow-header -glow-primary-hover -fontsize2"
                data-uuid="{messageUUID}"
                data-tooltip={chatTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"UP"}
                aria-label="{getLocalized("LA.chat.tooltip")}">
                <i class="mdi mdi-message"></i>
            </button>
        {/if}
        {#if collapseAllOption}
            <!-- (#2) -->
            <!-- svelte-ignore event_directive_deprecated -->
            <button type="button"
                class="mdi {isExpanding ? "mdi-arrow-collapse-all" : "mdi-arrow-expand-all" } -glow-header -glow-primary-hover la-text-header -fontsize3 -lineheight3"
                data-tooltip={expandTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"UP"}
                aria-label={getLocalized("LA.collapseAll.tooltip")}
                on:click={(event) => toggleCollapseAll(event)}
            >
            </button>
        {/if}
        </div>
    {/if}
    </h1>
    <div class="la-collapsegroup__wrapper
            {collapseID ? "collapse-wrapper" : ""} {isCollapsed ? "collapsed" : ""}"
        data-la-collapse-id={collapseID}
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
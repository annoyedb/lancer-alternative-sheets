<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HeaderMainProps } from "@/interfaces/actor/HeaderMainProps";
    import { getLocalized } from "@/scripts/helpers";
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";

    const {
        children,

        title,

        headerStyle,
        headerFontStyle,
        cursorStyle,
        borderStyle,
        rootStyle,
        collapse,
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
    }: HeaderMainProps = $props();
    
    let collapsing = collapse && collapseID;
    let collapsed = collapsing && startCollapsed ? "collapsed" : "";
    let extraOptions = deleteOption || messageOption || spOption ? true : false;
    let chatTip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));

    const defaultHeaderStyle = "la-bckg-primary -padding0-tb -padding3-lr"
    const defaultHeaderFontStyle = "la-text-header"
    const defaultDeleteStyle = "-glow-header -glow-primary-hover -fontsize2"
    const defaulltSPStyle = "-fontsize5 -lineheight3 -width3"
</script>

<div class="la-collapsegroup -widthfull {rootStyle ? rootStyle.join(' ') : ""}">
    <h1 class="la-summary la-combine-h la-dropshadow 
            -justifybetween -widthfull -whitespacenowrap 
            {headerStyle?.join(' ') || defaultHeaderStyle}
            {collapsing ? "collapse-trigger" : ""}"
        data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, false) : ""}">
        <div class="la-summary-label {headerFontStyle?.join(' ') || defaultHeaderFontStyle}">
            <span class="la-terminal -fadein {headerFontStyle?.join(' ') || defaultHeaderFontStyle}">>//: </span><!--
        ---><span>{title} </span>
            <span class="la-extension -lower -fadein {headerFontStyle?.join(' ') || defaultHeaderFontStyle}"><!--
            --->{extensionText ? extensionText : `--${getLocalized("LA.scan.label")}`}<!--
        ---></span><!--
        ---><span class="la-cursor la-anim-header -fadein {cursorStyle ? cursorStyle.join(' ') : ""}"></span>
        </div>
    {#if extraOptions}
        <div class="la-combine-h">
        {#if deleteOption && deleteUUID}
            <!-- onclick bug: https://github.com/sveltejs/svelte/issues/14704 -->
            <!-- svelte-ignore event_directive_deprecated -->
            <button type="button"
                class="la-delete {deleteStyle?.join(' ') || defaultDeleteStyle}" 
                data-uuid="{deleteUUID}"
                aria-label="{getLocalized("LA.delete.label")}"
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
                data-tooltip-direction={"RIGHT"}
                aria-label="{getLocalized("LA.chat.tooltip")}">
                <i class="mdi mdi-message"></i>
            </button>
        {/if}
        {#if spOption}
            <div class="la-combine-h -height2">
                <div class="{spTextStyle?.join(' ') || "-fontsize2"}">
                    {spCurrent} / {spMax}
                </div>
                <i class="cci cci-system-point {spIconStyle?.join(' ') || defaulltSPStyle}"></i>
            </div>
        {/if}
        </div>
    {/if}
    </h1>
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
<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { HeaderSecondaryProps } from "@/interfaces/actor/HeaderSecondaryProps";
    import { getLocalized } from "@/scripts/helpers";
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";

    const {
        children,

        title,
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
    }: HeaderSecondaryProps = $props();
    
    let collapsing = collapse && collapseID;
    let collapsed = collapsing && startCollapsed ? "collapsed" : "";
    let extraOptions = deleteOption || messageOption || spOption || editOption ? true : false;
    let chatTip = TooltipFactory.buildTooltip(getLocalized("LA.chat.tooltip"));
    let editTip = TooltipFactory.buildTooltip(getLocalized("LA.edit.tooltip"));

    const defaultHeaderStyle = "la-bckg-primary -padding0 -padding3-r";
    const defaultHeaderIconStyle = "-fontsize5 -lineheight3"
    const buttonDefaultStyle = "-glow-header -glow-primary-hover -fontsize2"
</script>

<div class="la-collapsegroup -widthfull {rootStyle ? rootStyle.join(' ') : ""}"
    data-uuid="{uuid}"
    data-path="{path}"
    data-accept-types="{acceptTypes}"
    draggable="true">
    <div class="la-summary la-combine-h la-dropshadow 
                -justifybetween -widthfull -whitespacenowrap 
            {headerStyle?.join(' ') || defaultHeaderStyle}
            {collapsing ? "collapse-trigger" : ""}"
        data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, false) : ""}">
        <!-- Icon, Name -->
        <div class="la-left la-summary-label">
            <i class="la-icon {headerIconStyle?.join(' ') || defaultHeaderIconStyle} "></i>
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
                data-tooltip-direction={"RIGHT"}
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
                data-tooltip-direction={"RIGHT"}
                aria-label="{getLocalized("LA.edit.label")}">
                <i class="fas fa-ellipsis-v {editIconStyle?.join(' ')}"></i>
            </button>
        {/if}
        </div>
    {/if}
    </div>
    <div class="la-details-wrapper la-dropshadow -padding0-l
            -widthfull -heightfull
            {borderStyle?.join(' ') || "la-brdr-primary"}
            {collapsing ? "collapse" : ""} {collapsed}"
        data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, true) : ""}">
        <!-- https://svelte.dev/docs/svelte/v5-migration-guide#Snippets-instead-of-slots -->
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>
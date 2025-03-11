<script lang="ts">
    import type { HeaderProps } from "@/interfaces/actor/header/HeaderProps";
    import type { HeaderSecondaryProps } from "@/interfaces/actor/header/HeaderSecondaryProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import { collapseStates, handleCollapseToggle, initializeCollapseStates } from "@/scripts/collapse";
    import { onMount } from "svelte";
    import { getLocalized } from "@/scripts/helpers";
    import TerminalText from "@/svelte/actor/TerminalText.svelte";

    const {
        children,
        rootStyle,
        itemID,
        uuid,
        path,
        acceptTypes,
        collapseID,
        startCollapsed,

        headerContentLeft,
        headerContentRight,
        renderOutsideCollapse,

        
        headerStyle,
        borderStyle,
        
        text,
        extensionText,
        textStyle,
    }: HeaderProps & HeaderSecondaryProps & TerminalTextProps = $props();
    
    let isCollapsed = $derived.by(() => {
        if (collapseID && $collapseStates[collapseID])
            return $collapseStates[collapseID].collapsed;
        return false;
    });
    
    const extraOptions =  headerContentRight ? true : false;
    
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

    function getExtensionText()
    {
        if (extensionText)
            return extensionText;
        if (collapseID)
            return isCollapsed
                ? `--${getLocalized("LA.expand.label")}`
                : `--${getLocalized("LA.collapse.label")}`;
        return undefined;
    }
</script>
<script lang="ts" module>
    export const H2_HEADER_STYLE = "clipped-bot-alt -padding0-l -padding3-r la-text-header la-anim-header";
    export const H2_ICON_SIZE = "-fontsize5";
    export const H2_TEXT_SIZE = "-fontsize2";
</script>


<div class="la-collapsegroup -widthfull {rootStyle ? rootStyle.join(' ') : ""}
        {acceptTypes ? `ref set drop-settable ${acceptTypes}` : ""}
        collapse-group"
    data-item-id={itemID}
    data-uuid={uuid}
    data-path={path}
    data-accept-types={acceptTypes}
    draggable="true"
>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <!-- (#2) onclick bug: https://github.com/sveltejs/svelte/issues/14704 -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div class="la-summary la-combine-h la-dropshadow 
            -justifybetween -widthfull -whitespacenowrap 
            {headerStyle?.join(' ') || H2_HEADER_STYLE}
            {collapseID ? "collapse-trigger" : ""}"
        on:click={(event) => toggleCollapse(event)}
    >
        <!-- Icon, Name -->
        <div class="la-left la-combine-h -justifystart -aligncenter -gap1 -widthfull -overflowhidden">
            {#if headerContentLeft}
                {@render headerContentLeft()}
            {/if}
            <TerminalText
                text={collapseID || !extensionText ? `${text} ` : text}
                textStyle={textStyle}
                extensionText={getExtensionText()}
                disableCmdline={true}
            />
            <!-- <span class="la-name__span {headerFontStyle?.join(' ') || "-fontsize2"}">{title}</span> -->
        </div>
    {#if extraOptions}
        <!-- Options -->
        <div class="la-right la-combine-h -aligncenter">
        {#if headerContentRight}
            {@render headerContentRight()}
        {/if}
        </div>
    {/if}
    </div>
    {#if renderOutsideCollapse}
        {@render renderOutsideCollapse()}
    {/if}
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
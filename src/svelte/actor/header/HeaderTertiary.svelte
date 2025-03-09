<script lang="ts">
    import type { HeaderProps } from "@/interfaces/actor/header/HeaderProps";
    import type { HeaderTertiaryProps } from "@/interfaces/actor/header/HeaderTertiaryProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import { getLocalized } from "@/scripts/helpers";
    import { collapseStates, handleCollapseToggle, initializeCollapseStates } from "@/scripts/collapse";
    import { onMount } from "svelte";
    import TerminalText from "../TerminalText.svelte";

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
        subText,

        headerStyle,
        headerFontStyle,
        subHeaderFontStyle,
        borderStyle,

        text,
        extensionText,
    }: HeaderProps & HeaderTertiaryProps & TerminalTextProps = $props();
    
    let isCollapsed = $derived.by(() => {
        if (collapseID && $collapseStates[collapseID])
            return $collapseStates[collapseID].collapsed;
        return false;
    });

    const extraOptions = headerContentRight ? true : false;
    const defaultHeaderStyle = "la-bckg-primary -padding0-tb -padding3-lr"
    
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
    export const HEADER_TERTIARY_ICON_BUTTON_STYLE: string = "-fontsize7";
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
            -justifybetween -widthfull
            {headerStyle?.join(' ') || defaultHeaderStyle}
            {collapseID ? "collapse-trigger" : ""}"
        on:click={(event) => toggleCollapse(event)}
    >
        <!-- Icon, Name -->
        <div class="la-left la-combine-h -aligncenter">
        {#if headerContentLeft}
            {@render headerContentLeft()}
        {/if}
            <div class="la-combine-v -alignstart -justifycenter -divider">
                <span class="la-top__span {headerFontStyle?.join(' ') || "-fontsize3"}">{text}</span>
                <TerminalText
                    text={collapseID || !extensionText ? `${subText} ` : subText}
                    textStyle={subHeaderFontStyle || ["-fontsize0"]}
                    extensionText={getExtensionText()}
                    disableCmdline={true}
                />
            </div>
        </div>
        <!-- Options -->
    {#if extraOptions}
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
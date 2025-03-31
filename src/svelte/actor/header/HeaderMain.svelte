<script lang="ts">
    import type { HeaderMainProps } from "@/interfaces/actor/header/HeaderMainProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import { getCollapseState, setCollapseState } from "@/scripts/store/collapse";
    import { getLocalized } from "@/scripts/helpers";
    import TerminalText from "@/svelte/actor/TerminalText.svelte";
    import type { HeaderProps } from "@/interfaces/actor/header/HeaderProps";
    import { onMount } from "svelte";

    const {
        children,
        rootStyle,
        itemID,
        uuid,
        path,
        acceptTypes,
        collapseID,
        startCollapsed,
        dontSaveCollapse,

        headerContent,

        headerStyle,
        borderStyle,

        text,
        textStyle,
        extensionText,
    }: HeaderProps & HeaderMainProps & TerminalTextProps = $props();
    
    let isCollapsed = $state(getCollapseState(collapseID) ?? startCollapsed ?? false);

    const extraOptions = headerContent ? true : false;

    // (#3) - Since collapsables may not always be collapsable, may want to reset their collapse state 
    // to the default, need to be persistent across rerenders, and still be able to read from derived()
    // we need to use a state with varying levels of fallbacks, and to properly set the store based on 
    // the 
    onMount(() => 
    {
        if (collapseID && (dontSaveCollapse ?? getCollapseState(collapseID) === undefined))
        {
            setCollapseState(collapseID, startCollapsed ?? false);
            isCollapsed = startCollapsed ?? false;
        }
    });

    function toggleCollapse(event: MouseEvent) 
    {
        event.stopPropagation();
        if (collapseID)
        {
            setCollapseState(collapseID, !isCollapsed);
            isCollapsed = !isCollapsed;
        }
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
    export const MAIN_HEADER_STYLE: string = "la-text-header la-anim-header clipped-top -padding0-tb -padding3-lr"
</script>

<div class="la-collapsegroup -widthfull {rootStyle?.join(' ')}
        {acceptTypes ? `ref set drop-settable ${acceptTypes}` : ""}
        collapse-group"
    data-item-id={itemID}
    data-uuid={uuid}
    data-path={path}
    data-accept-types={acceptTypes}
>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <!-- (#2) -->
    <!-- svelte-ignore event_directive_deprecated -->
    <h1 class="la-summary la-combine-h la-dropshadow 
            -justifybetween -widthfull -whitespacenowrap 
            {headerStyle?.join(' ') || MAIN_HEADER_STYLE}
            {collapseID ? "collapse-trigger" : ""}"
        on:click={(event) => toggleCollapse(event)}
    >
        <!-- Header Label -->
        <TerminalText
            text={collapseID || !extensionText ? `${text} ` : text}
            textStyle={textStyle}
            extensionText={getExtensionText()}
        />
        <!-- Header Options -->
    {#if extraOptions}
        <div class="la-combine-h -gap2 -aligncenter">
        {#if headerContent}
            {@render headerContent()}
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
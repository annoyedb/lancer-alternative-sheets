<!-- TODO: This is almost exclusively used for the ActionBox component. When this needs to be reused, (e.g. for Frame Power) refactor this -->
<script lang="ts">
    import type { HeaderProps } from "@/interfaces/actor/header/HeaderProps";
    import type { HeaderQuinaryProps } from "@/interfaces/actor/header/HeaderQuinaryProps";
    import type { TerminalTextProps } from "@/interfaces/actor/TerminalTextProps";
    import { getCollapseState, setCollapseState } from "@/scripts/store/collapse";
    import { getLocalized } from "@/scripts/helpers";
    import TerminalText from "@/svelte/actor/TerminalText.svelte";
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

        headerContentLeft,
        headerContentRight,
        renderOutsideCollapse,


        headerStyle,
        borderStyle,
        
        text,
        extensionText,
        textStyle,
    }: HeaderProps & HeaderQuinaryProps & TerminalTextProps = $props();
    
    let isCollapsed = $state(getCollapseState(collapseID) ?? startCollapsed ?? false);
    
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
    export const H4_ROOT_STYLE = " la-bckg-card ";
    export const H4_BORDER_STYLE = " la-brdr-repcap -bordersround-ltb -bordersround "
    export const H4_ICON_LEFT_STYLE = " -height3 -lineheight3 -fontsize5 "
</script>

<div class="la-effectbox -largeheader la-collapsegroup la-combine-v -widthfull 
        {rootStyle?.join(' ') || H4_ROOT_STYLE}
        {borderStyle?.join(' ') || H4_BORDER_STYLE}
        {acceptTypes ? `ref set drop-settable ${acceptTypes}` : ""}
        collapse-group"
    data-item-id={itemID}
    data-uuid={uuid}
    data-path={path}
    data-accept-types={acceptTypes}
    draggable="true"
>
    <!-- Action Box header -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <!-- (#2) -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div class="la-actionheader la-summary la-combine-h la-text-header clipped -aligncenter
            {headerStyle?.join(' ')}
            {collapseID ? "collapse-trigger" : ""}"
        data-la-collapse-id={collapseID}
        on:click={(event) => toggleCollapse(event)}
    >
        <div class="-flexthird -justifystart">
            {#if headerContentLeft}
                {@render headerContentLeft()}
            {/if}
        </div>
        <div class="-flexthird -justifycenter">
            <TerminalText
                text={text || getLocalized("LA.placeholder")}
                textStyle={textStyle}
                extensionText={getExtensionText()}
            />
        </div>
        <div class="la-combine-h -flexthird -justifyend -height3">
            {#if headerContentRight}
                {@render headerContentRight()}
            {/if}
        </div>
    </div>
    <!-- Display if collapsable -->
{#if renderOutsideCollapse}
    {@render renderOutsideCollapse()}
{/if}
    <div class="la-collapsegroup__wrapper -widthfull
            {collapseID ? "collapse-wrapper" : ""} {isCollapsed ? "collapsed" : ""}"
        data-la-collapse-id={collapseID}
    >
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>
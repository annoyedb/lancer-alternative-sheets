import type { Snippet } from "svelte";

/**
 * Properties for the Header component.
 */
export interface HeaderProps {
    /**
     * Optional children component or element.
     */
    children?: Snippet;

    /**
     * Foundry document id. Emitted as `data-item-id`, which Foundry's `_onSortItem`
     * uses to identify the drop target and its siblings when reordering by drag.
     */
    itemID?: string;

    /**
     * Universally unique identifier. Required for `ref set drop-settable` when `acceptTypes` is set.
     */
    uuid?: string;

    /**
     * Path to the resource. Required for `ref set drop-settable` when `acceptTypes` is set but when it does not have an initial UUID set.
     */
    path?: string;

    /**
     * Accepted types for the component. Expects a space-separated list of Lancer System `EntryType`s.
     */
    acceptTypes?: string;

    /**
     * Omit the `drop-settable` class, so drops bubble to the sheet root and Lancer re-sorts the
     * item instead of assigning it into the slot at `path`. For ordered lists, not for real slots.
     */
    dropDisabled?: boolean;

    /**
     * Identifier for the collapsible section.
     */
    collapseID?: string;

    /**
     * Determines if the section should start collapsed.
     */
    startCollapsed?: boolean;

    /**
     * Save collapse state to the SessionStorage API on rerender.
     */
    dontSaveCollapse?: boolean;

    /**
     * Array of styles to be applied to the root element.
     */
    rootStyle?: Array<string>;
}
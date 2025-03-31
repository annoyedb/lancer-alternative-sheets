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
     * Identifier for the item. Only used for NPC features and seems to typically expect an item's LID.
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
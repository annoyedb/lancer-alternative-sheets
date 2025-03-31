import { writable, fromStore } from "svelte/store";

const collapseStates = writable<{ 
    [key: string]: boolean
}>({});

export function getCollapseState(id?: string)
{
    if (!id)
        return false;
    return fromStore(collapseStates).current[id];
}

/**
 * Sets the collapse state for a given element by its ID.
 * Updates the internal collapse state and stores the state.
 *
 * @param id - The unique identifier of the element.
 * @param state - The collapse state to set. `true` for collapsed, `false` for expanded.
 */
export function setCollapseState(id: string, state: boolean)
{
    collapseStates.update(states =>
    {
        states[id] = state;
        return states;
    });
}
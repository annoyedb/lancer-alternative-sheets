import { CollapseState } from "@/enums/CollapseState";
import { writable, get } from "svelte/store";

export const collapseStates = writable<{ 
    [key: string]: {
        collapsed: boolean, 
    }
}>({});

/**
 * Initializes the collapse state for a given element by its ID.
 * The state is either retrieved from session storage or set to a default value.
 *
 * @param id - The unique identifier for the element whose collapse state is being initialized.
 * @param startCollapsed - Optional. The initial collapse state if no state is found in session storage. Defaults to `false`.
 */
export function initializeCollapseStates(id: string, startCollapsed: boolean = false)
{
    const storage = sessionStorage.getItem(`la-collapse-${id}`);
    const state = storage
        ? storage === CollapseState.Closed
        : startCollapsed;

    collapseStates.update(states =>
    {
        if (!states[id])
        {
            states[id] = { collapsed: state };
        } 
        else
        {
            states[id].collapsed = state;
        }
        return states;
    });
}

/**
 * Sets the collapse state for a given element by its ID.
 * Updates the internal collapse state and stores the state in session storage.
 *
 * @param id - The unique identifier of the element.
 * @param state - The collapse state to set. `true` for collapsed, `false` for expanded.
 */
export function setCollapseState(id: string, state: boolean)
{
    collapseStates.update(states =>
    {
        if (!states[id])
            states[id] = { collapsed: state };
        else
            states[id].collapsed = state;
        return states;
    });
    sessionStorage.setItem(`la-collapse-${id}`, state ? CollapseState.Closed : CollapseState.Opened);
}


/**
 * Handles the toggle action for collapsing or expanding an element.
 * 
 * @param event - The mouse event triggered by the user interaction. It includes the current target element.
 * @param id - The unique identifier for the element whose collapse state is being toggled.
 */
export function handleCollapseToggle(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, id: string)
{
    event.stopPropagation();
    const currentState = get(collapseStates)[id];
    setCollapseState(id, !currentState.collapsed);
}

/**
 * Handles the toggle action for collapsing or expanding all elements within a collapse group.
 * 
 * This function stops the propagation of the event, retrieves the current collapse state of the specified element,
 * and toggles the collapse state for all elements within the same collapse group.
 * 
 * @param event - The mouse event triggered by the toggle action. The event's current target must be an HTMLElement.
 * @param id - The identifier of the element whose collapse state is being toggled.
 * 
 * @remarks
 * The function requires the presence of a parent element with the class `collapse-trigger` to group collapsible elements.
 * Each collapsible element within this group should have a 'data-la-collapse-id' attribute to identify it.
 * 
 * The function will toggle the collapse state of all elements within the same `collapse-trigger` as the event's current target.
 */
export function handleCollapseAllToggle(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, id: string)
{
    event.stopPropagation();
    const collapse = get(collapseStates)[id].collapsed;
    const collapseGroup = event.currentTarget.closest('.collapse-trigger');
    if (collapseGroup)
    {
        const triggers = collapseGroup.querySelectorAll('[data-la-collapse-id]');
        triggers.forEach(trigger =>
        {
            const childId = trigger.getAttribute('data-la-collapse-id');
            if (childId)
            {
                setCollapseState(childId, !collapse);
            }
        });
        setCollapseState(id, !collapse);
    }
}

// -----
export function applyCollapseListeners(html: JQuery<HTMLElement>)
{
    html.find(".collapse-trigger").each((_index, element) =>
    {
        $(element).on("click", (event) =>
        {
            handleCollapse(event, html);
        });
    });
}

// Collapse handler using JQuery on the DOM so that it is compatible with PopOut! module
function handleCollapse(event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>, html: JQuery<HTMLElement>)
{
    event.stopPropagation();
    let id = $(event.currentTarget).attr("data-la-collapse-id");
    let collapse = html.find(`.collapse[data-la-collapse-id="${id}"]`);
    if (collapse.hasClass("collapsed"))
    {
        collapse.removeClass("collapsed");
        sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "opened");
    } else
    {
        collapse.addClass("collapsed");
        sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "closed");
    }
}

export function initializeCollapses(html: JQuery)
{
    let collapse_sections = html.find(".collapse");
    // Init according to session store.
    collapse_sections.each((_index, section) =>
    {
        let id = section.getAttribute("data-la-collapse-id");
        if (id)
        {
            let ssv = sessionStorage.getItem("lancer-alternative-collapse-" + id);
            if (ssv == "opened")
            {
                section.classList.remove("collapsed");
            } else if (ssv == "closed")
            {
                section.classList.add("collapsed");
            }
        }
    });
}
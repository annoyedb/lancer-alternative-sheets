import { CollapseState } from "@/enums/CollapseState";
import { writable, get } from "svelte/store";

export const collapseStates = writable<{ 
    [key: string]: {
        collapsed: boolean, 
    }
}>({});

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

export function handleCollapseToggle(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, id: string)
{
    console.log("Handling collapse toggle");
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

// TODO: move to data stores
// function handleCollapseExpandAll(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
// {
//     event.stopPropagation();

//     const collapseGroup = event.currentTarget.closest('.la-collapsegroup');
//     const triggers = collapseGroup?.querySelectorAll('[data-la-collapse-id]');
//     if (triggers && triggers.length > 0)
//     {
//         triggers.forEach((trigger, index) => {
//             if (index <= 1) // Skip this header's pair
//                 return;
//             const id = trigger.getAttribute('data-la-collapse-id');
//             if (id)
//             {
//                 const pair = Array.from(triggers).find(t => t !== trigger && t.getAttribute('data-la-collapse-id') === id);
//                 if (pair)
//                 {
//                     if (expanding)
//                     {
//                         pair.classList.remove('collapsed');
//                         sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "opened");
//                     } else
//                     {
//                         pair.classList.add('collapsed');
//                         sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "closed");
//                     }
//                 }
//             }
//         });
//         expanding = !expanding;
//     }
// }
import { get, writable } from "svelte/store";

export const advancedStates = writable<{
    [key: string]: {
        enabled: boolean,
    }
}>({});

export const activeTabs = writable<{
    [key: string]: {
        active: string,
    }
}>({});

export function initializeAdvancedStates(uuid: string, startEnabled: boolean = false)
{
    const storage = sessionStorage.getItem(`la-advanced-${uuid}`);
    const state = storage ? storage === "true" : startEnabled;

    advancedStates.update(states =>
    {
        if (!states[uuid])
        {
            states[uuid] = { enabled: state };
        } 
        else
        {
            states[uuid].enabled = state;
        }
        return states;
    });
}

export function setAdvancedState(uuid: string, enabled: boolean)
{
    advancedStates.update(states =>
    {
        if (!states[uuid])
            states[uuid] = { enabled };
        else
            states[uuid].enabled = enabled;
        return states;
    });
    sessionStorage.setItem(`la-advanced-${uuid}`, enabled.toString());
}

export function handleAdvancedToggle(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, uuid: string)
{
    event.stopPropagation();
    const currentState = get(advancedStates)[uuid];
    setAdvancedState(uuid, !currentState.enabled);
}

export function setActiveTab(uuid: string, tab: string)
{
    activeTabs.update(tabs => 
    {
        if (!tabs[uuid])
            tabs[uuid] = { active: tab };
        else
            tabs[uuid].active = tab;
        return tabs;
    });
}
import { get, writable } from "svelte/store";

export const advancedStates = writable<{
    [key: string]: {
        enabled: boolean,
    }
}>({});

export function initializeAdvancedStates(uuid: string, startEnabled: boolean = false)
{
    const state = startEnabled;

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
}

export function handleAdvancedToggle(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, uuid: string)
{
    event.stopPropagation();
    const currentState = get(advancedStates)[uuid];
    setAdvancedState(uuid, !currentState.enabled);
}
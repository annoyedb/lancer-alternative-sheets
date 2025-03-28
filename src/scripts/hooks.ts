import { writable } from 'svelte/store';

export const trackedHooks = writable<Record<string, number>>({});

export function trackHook(key: string, value: number)
{
    trackedHooks.update(hooks =>
    {
        hooks[key] = value;
        return hooks;
    });
}

export function unregisterTrackedHooks()
{
    trackedHooks.update(hooks =>
    {
        Object.keys(hooks).forEach(key =>
        {
            Hooks.off(key, hooks[key]);
        });
        return {};
    });
}
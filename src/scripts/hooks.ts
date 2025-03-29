import { writable } from 'svelte/store';

export const trackedHooks = writable<Record<number, string>>({});

export function trackHook(key: number, value: string)
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
        for (const [key, value] of Object.entries(hooks))
        {
            Hooks.off(value, Number(key));
        }
        return {};
    });
}
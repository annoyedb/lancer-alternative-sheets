import { getSheetStore, setSheetStore } from '@/scripts/store/store';

export function trackHook(uuid: string, key: number, value: string)
{
    const hooks = getSheetStore(uuid).trackedHooks;
    hooks[key] = value;
    setSheetStore(uuid, { trackedHooks: hooks });
}

export function unregisterTrackedHooks(uuid: string)
{
    const hooks = getSheetStore(uuid).trackedHooks;
    for (const [key, value] of Object.entries(hooks))
    {
        Hooks.off(value, Number(key));
    }
    setSheetStore(uuid, { trackedHooks: {} });
}
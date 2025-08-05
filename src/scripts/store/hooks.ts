import { SheetStore } from '@/scripts/store/module-store';

export function trackHook(uuid: string, key: number, value: string)
{
    const hooks = SheetStore.get(uuid).trackedHooks;
    hooks[key] = value;
    SheetStore.set(uuid, { trackedHooks: hooks });
}

export function unregisterTrackedHooks(uuid: string)
{
    const hooks = SheetStore.get(uuid).trackedHooks;
    for (const [key, value] of Object.entries(hooks))
    {
        Hooks.off(value, Number(key));
    }
    SheetStore.set(uuid, { trackedHooks: {} });
}
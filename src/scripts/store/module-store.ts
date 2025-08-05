import type { ActiveTab } from "@/enums/ActiveTab";
import type { ThemeKey } from "@/enums/ThemeKey";
import { fromStore, get, writable } from "svelte/store";

interface SheetStoreData
{
    advancedState: boolean;
    introPlayed: boolean;
    headerOffsetY: number;
    currentTheme: string | ThemeKey;
    activeTabs: { [key in ActiveTab]: string };
    trackedHooks: { [key: number]: string };
    tokenImageLock: boolean;
    selectedTokenImage: string; // (#12)
}

export class SheetStore
{
    static createDefaultData(): SheetStoreData
    {
        return {
            advancedState: false,
            introPlayed: false,
            headerOffsetY: 0,
            currentTheme: "",
            activeTabs: {} as { [key in ActiveTab]: string },
            trackedHooks: {} as { [key: number]: string },
            tokenImageLock: true,
            selectedTokenImage: "", // (#12)
        };
    }

    static store = writable<{ [key: string]: SheetStoreData }>({});

    static get(key: string): SheetStoreData
    {
        const store = get(SheetStore.store);
        if (!(key in store))
        {
            store[key] = SheetStore.createDefaultData();
        }
        return fromStore(SheetStore.store).current[key];
    }

    static set(key: string, value: Partial<SheetStoreData>): void
    {
        SheetStore.store.update(store =>
        {
            if (!store[key])
            {
                store[key] = SheetStore.createDefaultData();
            }
            store[key] = { ...store[key], ...value };
            return store;
        });
    }
}

interface PilotStoreData
{
    bondQNAMode: boolean;
    selectedMech: number;
}

export class PilotStore
{
    static createDefaultData(): PilotStoreData
    {
        return {
            bondQNAMode: false,
            selectedMech: 0,
        };
    }

    static store = writable<{ [key: string]: PilotStoreData }>({});

    static get(key: string): PilotStoreData
    {
        const store = get(PilotStore.store);
        if (!(key in store))
        {
            store[key] = PilotStore.createDefaultData();
        }
        return fromStore(PilotStore.store).current[key];
    }

    static set(key: string, value: Partial<PilotStoreData>): void
    {
        PilotStore.store.update(store =>
        {
            if (!store[key])
            {
                store[key] = PilotStore.createDefaultData();
            }
            store[key] = { ...store[key], ...value };
            return store;
        });
    }
}
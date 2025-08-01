import type { ActiveTab } from "@/enums/ActiveTab";
import { fromStore, get, writable } from "svelte/store";

interface SheetStoreData
{
    advancedState: boolean;
    introPlayed: boolean;
    headerOffsetY: number;
    currentTheme: string;
    activeTabs: { [key in ActiveTab]: string };
    trackedHooks: { [key: number]: string };
    selectedTokenImage: string; // (#12)
    // TODO: refactor to a pilot store
    bondQNAMode: boolean;
    selectedMech: number;
}

const sheetStore = writable<{ [key: string]: SheetStoreData }>({});
function createDefaultData(): SheetStoreData
{
    return {
        advancedState: false,
        introPlayed: false,
        headerOffsetY: 0,
        currentTheme: "",
        activeTabs: {} as { [key in ActiveTab]: string },
        trackedHooks: {} as { [key: number]: string },
        selectedTokenImage: "", // (#12)
        // TODO: refactor to a pilot store
        bondQNAMode: false,
        selectedMech: 0,
    };
}

export function getSheetStore(key: string)
{
    const store = get(sheetStore);
    if (!(key in store))
    {
        store[key] = createDefaultData();
    }
    return fromStore(sheetStore).current[key];
}

export function setSheetStore(key: string, value: Partial<SheetStoreData>)
{
    sheetStore.update(store =>
    {
        if (!store[key])
        {
            store[key] = createDefaultData();
        }
        store[key] = { ...store[key], ...value };
        return store;
    });
};
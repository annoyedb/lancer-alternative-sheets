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
}

const sheetStore = writable<{ [key: string]: SheetStoreData }>({});
const defaultData = {
    advancedState: false,
    introPlayed: false,
    headerOffsetY: 0,
    currentTheme: "",
    activeTabs: {} as { [key in ActiveTab]: string },
    trackedHooks: {} as { [key: number]: string },
};

export const getSheetStore = (key: string) =>
{
    const store = get(sheetStore);
    if (!(key in store))
    {
        store[key] = { ...defaultData };
        sheetStore.set(store);
    }
    return fromStore(sheetStore).current[key];
};

export const setSheetStore = (key: string, value: Partial<SheetStoreData>) =>
{
    sheetStore.update(store =>
    {
        if (!store[key])
        {
            store[key] = { ...defaultData };
        }
        store[key] = { ...store[key], ...value };
        return store;
    });
};

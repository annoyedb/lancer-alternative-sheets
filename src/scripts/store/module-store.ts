import type { ActiveTab } from "@/enums/ActiveTab";
import type { ThemeKey } from "@/enums/ThemeKey";
import { fromStore, get, writable } from "svelte/store";
import { 
    getPinnedTraits, 
    setPinnedTraits, 
    getPinnedSystems, 
    setPinnedSystems, 
    getPinnedTechs, 
    setPinnedTechs, 
    getPinnedReactions,
    setPinnedReactions,
} from '@/scripts/npc/settings';

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

/**
 * All string arrays store LIDs
 * 
 * These are stored as a stop-gap for asynchronous data sync between the server and client.
 * The stop-gap helps maintain reactivity within Svelte.
 */
interface NPCStoreData
{
    pinnedTraits: string[];
    pinnedSystems: string[];
    pinnedTechs: string[];
    pinnedReactions: string[];
}

export class NPCStore
{
    static createDefaultData(): NPCStoreData
    {
        return {
            pinnedTraits: [],
            pinnedSystems: [],
            pinnedTechs: [],
            pinnedReactions: [],
        };
    }

    static store = writable<{ [key: string]: NPCStoreData }>({});

    static get(key: string): NPCStoreData
    {
        const store = get(NPCStore.store);
        if (!(key in store))
        {
            store[key] = NPCStore.createDefaultData();
            store[key].pinnedTraits = getPinnedTraits(key);  // Persistent storage
            store[key].pinnedSystems = getPinnedSystems(key);  // Persistent storage
            store[key].pinnedTechs = getPinnedTechs(key);  // Persistent storage
            store[key].pinnedReactions = getPinnedReactions(key);  // Persistent storage
        }
        return fromStore(NPCStore.store).current[key];
    }

    static set(key: string, value: Partial<NPCStoreData>): void
    {
        NPCStore.store.update(store =>
        {
            if (!store[key])
            {
                store[key] = NPCStore.createDefaultData();
            }
            store[key] = { ...store[key], ...value };
            if (value.pinnedTraits !== undefined)
                setPinnedTraits(key, store[key].pinnedTraits); // Persistent storage
            if (value.pinnedSystems !== undefined)
                setPinnedSystems(key, store[key].pinnedSystems); // Persistent storage
            if (value.pinnedTechs !== undefined)
                setPinnedTechs(key, store[key].pinnedTechs); // Persistent storage
            if (value.pinnedReactions !== undefined)
                setPinnedReactions(key, store[key].pinnedReactions); // Persistent storage
            return store;
        });
    }
}
import type { ActiveTab } from "@/enums/ActiveTab";
import { SheetStore } from "./module-store";

export function getActiveTab(uuid: string, tab: ActiveTab): string
{
    return SheetStore.get(uuid).activeTabs[tab] ?? "";
}

export function setActiveTab(uuid: string, tab: ActiveTab, value: string)
{
    const tabs = SheetStore.get(uuid).activeTabs;
    tabs[tab] = value;
    SheetStore.set(uuid, { activeTabs: tabs });
}

export function getAdvancedState(uuid: string): boolean
{
    return SheetStore.get(uuid).advancedState;
}

export function setAdvancedState(uuid: string, enabled: boolean)
{
    SheetStore.set(uuid, { advancedState: enabled });
}

export function getSelectedTokenImage(uuid: string): string
{
    return SheetStore.get(uuid).selectedTokenImage ?? "";
}

export function setSelectedTokenImage(uuid: string, value: string)
{
    SheetStore.set(uuid, { selectedTokenImage: value });
}

export function getTokenImageLock(uuid: string): boolean
{
    return SheetStore.get(uuid).tokenImageLock ?? true;
}

export function setTokenImageLock(uuid: string, value: boolean)
{
    SheetStore.set(uuid, { tokenImageLock: value })
}
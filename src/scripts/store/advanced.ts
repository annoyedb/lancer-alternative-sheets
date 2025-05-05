import type { ActiveTab } from "@/enums/ActiveTab";
import { getSheetStore, setSheetStore } from "./module-store";

export function getActiveTab(uuid: string, tab: ActiveTab): string
{
    return getSheetStore(uuid).activeTabs[tab] ?? "";
}

export function setActiveTab(uuid: string, tab: ActiveTab, value: string)
{
    const tabs = getSheetStore(uuid).activeTabs;
    tabs[tab] = value;
    setSheetStore(uuid, { activeTabs: tabs });
}

export function getAdvancedState(uuid: string): boolean
{
    return getSheetStore(uuid).advancedState;
}

export function setAdvancedState(uuid: string, enabled: boolean)
{
    setSheetStore(uuid, { advancedState: enabled });
}
import { getSheetStore, setSheetStore } from "./store";

export function getBondQNAMode(uuid: string): boolean
{
    return getSheetStore(uuid).bondQNAMode;
}

export function setBondQNAMode(uuid: string, enabled: boolean)
{
    setSheetStore(uuid, { bondQNAMode: enabled });
}
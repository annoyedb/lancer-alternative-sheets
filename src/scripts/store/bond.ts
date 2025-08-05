import { PilotStore } from "./module-store";

export function getBondQNAMode(uuid: string): boolean
{
    return PilotStore.get(uuid).bondQNAMode;
}

export function setBondQNAMode(uuid: string, enabled: boolean)
{
    PilotStore.set(uuid, { bondQNAMode: enabled });
}
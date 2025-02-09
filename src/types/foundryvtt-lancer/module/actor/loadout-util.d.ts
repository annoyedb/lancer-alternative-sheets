import { LancerItem } from "../item/lancer-item";
import { SystemData } from "../system-template";
import { LancerActor } from "./lancer-actor";
/** Holds helper methods for loadout validation etc */
export declare class LoadoutHelper {
    private readonly actor;
    constructor(actor: LancerActor);
    private refresh;
    listLoadout(): Array<LancerItem>;
    fullRepair(): Promise<void>;
    /**
     * Find all limited systems and set them to their max/repaired/ideal state
     */
    restoreAllItems(): Promise<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/document.mjs").default<any, LancerActor>[]>;
    /**
     * Find all owned items and set them to be not destroyed
     */
    repairableItems(): Promise<any[]>;
    /**
     * Find all owned weapons and (generate the changes necessary to) reload them
     */
    reloadableItems(): any[];
    /**
     * Check our items for any that aren't equipped, and delete them
     */
    deleteUnequippedItems(): Promise<void>;
    /**
     * Check our loadout as applicable to cleanup any unresolved references
     */
    cleanupUnresolvedReferences(): Promise<void>;
    /**
     * Yields a simple error message on a misconfigured mount, or null if no issues detected.
     * @param mount Specific mount to validate
     */
    validateMount(mount: SystemData.Mech["loadout"]["weapon_mounts"][0]): string | null;
    /**
     * Reset the mounts to the default for the frame + core bonus configuration
     * Will automatically equip the frames integrated mount
     * @returns
     */
    resetMounts(): Promise<void>;
}

import type { LancerActor } from "../actor/lancer-actor";
import type { LancerItem } from "../item/lancer-item";
/**
 * Interface for the destructured options to fromLid and fromLidSync.
 */
interface FromLidOpts {
    /**
     * Where to look for the item
     * @default "all"
     */
    source: "all" | "world" | "compendium";
}
/**
 * Retrieve a list of documents by their Lancer IDs
 * @param lids   - The Lancer IDs to look up
 * @param source -  Where to look for the item
 */
export declare function fromLidMany(lids: string[], { source }?: Partial<FromLidOpts>): Promise<(LancerActor | LancerItem | undefined)[]>;
/**
 * Retrieve a Document by its Lancer ID
 * @param lid    - The Lancer ID to look up
 * @param source - Where to look for the item
 */
export declare function fromLid(lid: string, { source }?: Partial<FromLidOpts>): Promise<LancerActor | LancerItem | undefined>;
/**
 * Retrieve a Document by its Lancer ID synchronously. If the id
 * resolves to a compendium, returns that document's index instead. If
 * the index has not been regenerated to contain lids, only the world
 * collections will be searched.
 * @param lid    - The Lancer ID to look up
 * @param source - Where to look for the item
 */
export declare function fromLidSync(lid: string, { source }?: Partial<FromLidOpts>): LancerActor | LancerItem | {
    _id: string;
    img: string;
    name: string;
    pack: string;
    sort: number;
    type: string;
    system: {
        lid: string;
    };
} | undefined;
export {};

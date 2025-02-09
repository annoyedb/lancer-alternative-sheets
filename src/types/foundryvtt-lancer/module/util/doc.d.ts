import { LancerActor, LancerActorType, LancerDEPLOYABLE, LancerMECH, LancerNPC, LancerPILOT } from "../actor/lancer-actor";
import { EntryType } from "../enums";
import type { LancerBOND, LancerCORE_BONUS, LancerFRAME, LancerItem, LancerItemType, LancerLICENSE, LancerMECH_SYSTEM, LancerMECH_WEAPON, LancerNPC_CLASS, LancerNPC_FEATURE, LancerNPC_TEMPLATE, LancerORGANIZATION, LancerPILOT_ARMOR, LancerPILOT_GEAR, LancerPILOT_WEAPON, LancerRESERVE, LancerSKILL, LancerSTATUS, LancerTALENT, LancerWEAPON_MOD } from "../item/lancer-item";
export declare function resort_item(moverand: LancerItem, dest: LancerItem, sort_before?: boolean): Promise<LancerItem | undefined>;
export declare function find_license_for(item: LancerItem, in_actor?: LancerActor): Promise<LancerLICENSE | null>;
export declare function is_core_pack_name(name: string): boolean;
export declare function get_secondary_packs(doc_type: "Actor" | "Item"): any[];
/**
 * Retrieve the pack id that for an entrytype
 * @param et - The type of document to search for
 */
export declare function get_pack_id(et: EntryType): string;
export declare function get_pack(type: LancerItemType | LancerActorType): Promise<CompendiumCollection<CompendiumCollection.Metadata>>;
export declare function insinuate(items: Array<LancerItem>, to: LancerActor): Promise<Array<LancerItem>>;
/** Given an item, requests the import of all deployables referenced on that item, to be owned by the provided actor
 *
 * @param item The item to search for deployables
 * @param owner Who to associate the deployables with
 */
export declare function importDeployablesFor(item: LancerItem, owner: LancerActor): Promise<void>;
type DataTypeMap = {
    [key in EntryType]: object;
};
interface LancerDocMap extends DataTypeMap {
    [EntryType.CORE_BONUS]: LancerCORE_BONUS;
    [EntryType.DEPLOYABLE]: LancerDEPLOYABLE;
    [EntryType.FRAME]: LancerFRAME;
    [EntryType.LICENSE]: LancerLICENSE;
    [EntryType.MECH]: LancerMECH;
    [EntryType.MECH_SYSTEM]: LancerMECH_SYSTEM;
    [EntryType.MECH_WEAPON]: LancerMECH_WEAPON;
    [EntryType.NPC]: LancerNPC;
    [EntryType.NPC_CLASS]: LancerNPC_CLASS;
    [EntryType.NPC_FEATURE]: LancerNPC_FEATURE;
    [EntryType.NPC_TEMPLATE]: LancerNPC_TEMPLATE;
    [EntryType.ORGANIZATION]: LancerORGANIZATION;
    [EntryType.PILOT_ARMOR]: LancerPILOT_ARMOR;
    [EntryType.PILOT_GEAR]: LancerPILOT_GEAR;
    [EntryType.PILOT_WEAPON]: LancerPILOT_WEAPON;
    [EntryType.PILOT]: LancerPILOT;
    [EntryType.RESERVE]: LancerRESERVE;
    [EntryType.SKILL]: LancerSKILL;
    [EntryType.STATUS]: LancerSTATUS;
    [EntryType.TALENT]: LancerTALENT;
    [EntryType.BOND]: LancerBOND;
    [EntryType.WEAPON_MOD]: LancerWEAPON_MOD;
}
export type LancerDoc<T extends EntryType = EntryType> = T extends keyof LancerDocMap ? LancerDocMap[T] : never;
export {};

import { LancerActor } from "../actor/lancer-actor";
/**
 *
 * @param compendiumActor The document you want to import
 * @param forPilot Who the import is for
 */
export declare function requestImport(compendiumActor: LancerActor, forPilot: LancerActor): Promise<StoredDocument<LancerActor> | undefined>;
/** Brings an actor from compendium into the world.
 * If for a pilot, gives its name an appropriate prefix (Callsign) and putting it in that pilots folder
 * If for a mech, reroutes to the mechs pilot
 * If for an npc, just imports to same folder, nothing fancy
 *
 * @param compDeployable The actor (or actor UUID) to import
 * @param forActor The actor (or actor UUID) to associate the new deployable with
 */
export declare function fulfillImportActor(compDeployable: string | LancerActor, forActor: string | LancerActor): Promise<StoredDocument<LancerActor> | undefined>;
export declare function deployableName(baseName: string, owner: LancerActor | null): string;

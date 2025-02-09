import { LancerActor } from "./actor/lancer-actor";
import { LancerItem } from "./item/lancer-item";
import { LancerTokenDocument } from "./token";
/**
 * DataModels should internally handle any migrations across versions.
 * However, it can be helpful for efficiency to occasionally "write all" to world objects that are
 * consistently prepared.
 *
 * Call this when new versions happen, perhaps?
 */
export declare function commitDataModelMigrations(): Promise<void>;
/**
 * Some changes aren't neatly handleable via DataModels,
 * such as changes to prototype tokens or flags.
 * Instead handle these via migrateWorld.
 */
export declare function migrateWorld(): Promise<void>;
/**
 * Apply migration rules to all Entities within a single Compendium pack
 * @param pack
 */
export declare function migrateCompendium(pack: Compendium): Promise<void>;
/**
 * Migrate a single Actor document to the specified version.
 * Internally asynchronously migrates all items, as it is not generally possible to batch this operation
 * @param actor   The actor to update
 * @return The updateData to apply to the provided actor
 */
export declare function migrateActor(actor: LancerActor): Promise<object>;
/**
 * Migrate a single Item document to incorporate latest data model changes.
 * Currently does not need to be async, however, this will in the future allow us to migrate active effects if necessary
 * @param item The item to create an update payload for
 * @return The updateData to apply to the provided item
 */
export declare function migrateItem(item: LancerItem): Promise<object>;
/**
 * Migrate a single Scene document to incorporate changes to the data model of it's actor data overrides.
 * Doesn't actually update the scene, in most cases, just its embedded documents
 * @param scene  The Scene data to update
 */
export declare function migrateScene(scene: Scene): Promise<void>;
/**
 * Migrates a TokenDocument (not the actor! just the token!).
 * @param token The token document to create an update payload for
 * @return The updateData to apply to the provided item
 */
export declare function migrateTokenDocument(token: LancerTokenDocument): Promise<object>;
/**
 * Migrate pre 2.0 Compendium structure to the post-2.0 structure.
 * This operates on ALL compendiums that correspond to the old format and migrates them without confirmation
 */
export declare function migrateCompendiumStructure(): Promise<void>;

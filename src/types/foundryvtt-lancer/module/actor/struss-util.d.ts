import { StabOptions1, StabOptions2 } from "../enums";
import { LancerActor } from "./lancer-actor";
/**
 * Helper methods for structure, stress, overheating, etc.
 */
export declare class StrussHelper {
    private readonly actor;
    constructor(actor: LancerActor);
    /**
     * Stabilize this actor, given two choices that have already been made
     * @param o1  Choice 1, Cooling or Repairing
     * @param o2  Choice 2, Reloading, removing Burn, or clearing own or adjacent ally condition
     * @returns   Details to be printed to chat
     */
    stabilize(o1: StabOptions1, o2: StabOptions2): Promise<void>;
    /**
     * Returns the current overcharge roll/text. Only applicable for mechs.
     */
    getOverchargeRoll(): string | null;
}

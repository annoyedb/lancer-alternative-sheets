import type { LancerActor } from "../../actor/lancer-actor";
export declare function getTargets(): LancerActor[];
export declare function checkForHit(tech: boolean, roll: Roll, target: LancerActor): Promise<boolean>;
export declare function gridDist(token1: Token, token2: Token): number | undefined;

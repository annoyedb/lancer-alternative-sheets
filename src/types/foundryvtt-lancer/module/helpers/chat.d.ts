import type { HelperOptions } from "handlebars";
import { LancerFlowState } from "../flows/interfaces";
import { DamageData } from "../models/bits/damage";
import { RangeData } from "../models/bits/range";
export declare function miniProfile(profile: {
    range: RangeData[];
    damage?: DamageData[];
    attack?: number;
    accuracy?: number;
}, options: HelperOptions): string;
export declare function attackTarget(hit: LancerFlowState.HitResultWithRoll, options: HelperOptions): string;
export declare function damageTarget(target: LancerFlowState.DamageTargetResult, context: LancerFlowState.DamageRollData, options: HelperOptions): string;

import type HUDZone from "./SlidingHUDZone.svelte";
import type { AccDiffHudData } from "../acc_diff";
import type { StructStressData } from "../struct_stress/data";
import { DamageHudData } from "../damage";
export declare function attach(): Promise<HUDZone>;
export declare function openSlidingHud<T extends keyof HUDData>(key: T, data: HUDData[T]): Promise<HUDData[T]>;
export declare function isHudOpen(key: keyof HUDData): Promise<boolean>;
export declare function fade(dir?: "out" | "in"): Promise<void>;
type HUDData = {
    hase: AccDiffHudData;
    attack: AccDiffHudData;
    damage: DamageHudData;
    struct: StructStressData;
    stress: StructStressData;
};
export {};

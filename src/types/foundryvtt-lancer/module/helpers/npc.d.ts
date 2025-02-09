import type { HelperOptions } from "handlebars";
export declare const EffectIcons: {
    Generic: string;
    Basic: string;
    Charge: string;
    Deployable: string;
    AI: string;
    Protocol: string;
    Reaction: string;
    Tech: string;
    Drone: string;
    Bonus: string;
    Offensive: string;
    Profile: string;
};
/**
 * Handlebars helper for effect action type
 */
export declare function actionTypeSelector(a_type: string, data_target: string): string;
export declare function npcReactionView(path: string, options: HelperOptions): string;
export declare function npcSystemTraitView(path: string, options: HelperOptions): string;
export declare function npcTechView(path: string, options: HelperOptions): string;
export declare function npcWeaponView(path: string, options: HelperOptions): string;

import type { HelperOptions } from "handlebars";
import { LancerActor } from "../actor/lancer-actor";
import { LancerActiveEffect } from "../effects/lancer-active-effect";
/**
 * Handlebars helper for a single effect
 */
export declare function effect_view(actor: LancerActor, index: number, effect: LancerActiveEffect, options: HelperOptions): string;
/**
 * Handlebars helper for an entire smattering of effects
 */
export declare function effect_categories_view(actor: LancerActor, effects: ReturnType<typeof LancerActiveEffect["prepareActiveEffectCategories"]>, options: HelperOptions): string;

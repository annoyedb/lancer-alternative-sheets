import type { LancerCombat } from "../combat/lancer-combat";
/**
 * Hook to apply system specific customizations to the Combat Carousel UI
 * @param app  - The Combat Carousel ui form
 * @param html - The jquery data for the form
 */
export declare function handleRenderCombatCarousel(...[app, html]: Parameters<Hooks.RenderApplication<CombatCarousel>>): void;
declare class CombatCarousel extends Application {
    combat?: LancerCombat | null;
}
export {};

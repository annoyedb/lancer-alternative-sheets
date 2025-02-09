import type { LancerActor } from "../actor/lancer-actor";
import type { ActionTrackingData } from ".";
declare global {
    interface FlagConfig {
        User: {
            "action-manager": {
                pos: {
                    top: number;
                    left: number;
                };
            };
        };
    }
}
export declare class LancerActionManager extends Application {
    static DEF_LEFT: number;
    static DEF_TOP: number;
    static enabled: boolean;
    target: LancerActor | null;
    constructor(...args: any);
    init(): Promise<void>;
    /** @override */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        baseApplication: string | null;
        width: number;
        height: number;
        top: number;
        left: number;
        scale?: number | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        classes: string[];
        title: string;
        template: string;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDrop.Options, "permissions" | "callbacks">[];
        filters: Omit<SearchFilter.Options, "callback">[];
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        template: string;
        width: number;
        height: number;
        left: number;
        top: number;
        scale: number;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        title: string;
    }, never>>;
    /** @override */
    getData(_options?: {}): {
        position: Application.Position;
        name: string | null;
        actions: ActionTrackingData | null;
        clickable: boolean;
    };
    /**
     * Get proxy for ease of migration when we change over to MM data backing.
     * @returns actions map.
     */
    private getActions;
    reset(): Promise<void>;
    update(_force?: boolean): Promise<void>;
    updateConfig(): Promise<void>;
    private updateControlledToken;
    /**
     * Resets actions to their default state.
     */
    private resetActions;
    /** @override */
    activateListeners(html: JQuery): void;
    private loadUserPos;
    private loadTooltips;
    private dragElement;
    private canMod;
}

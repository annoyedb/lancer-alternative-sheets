import { LancerActor } from "../actor/lancer-actor";
export declare const DEBOUNCE_TIMEOUT = 500;
export declare class LancerHooks {
    static call(doc: LancerActor): void;
    static on(doc: LancerActor, callback: (arg: any) => any): LancerSubscription;
    static off(entityOrSub: LancerSubscription | LancerActor, callback?: number | ((arg: any) => any)): void;
}
/**
 * A helper class for easily handling LancerHook subscriptions.
 * Store this when it is returned from LancerHook.on() and use unsubscribe() to remove the hook.
 */
export declare class LancerSubscription {
    private name;
    private id;
    constructor(name: string, id: number);
    unsubscribe(): void;
}

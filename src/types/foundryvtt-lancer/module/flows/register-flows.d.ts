import type { Flow, Step } from "./flow";
export declare function registerFlows(): {
    flows: Map<string, {
        new (uuid: string | import("../actor/lancer-actor").LancerActor | import("../item/lancer-item").LancerItem, data?: any): Flow<any>;
        steps: string[];
        getStep(stepKey: string): Step<any, any> | Flow<any> | null;
        insertStepBefore(key: string, newKey: string): void;
        insertStepAfter(key: string, newKey: string): void;
        removeStep(key: string): void;
        deserialize(json: string): Flow<any>;
    }>;
    flowSteps: Map<string, Step<any, any> | Flow<any>>;
};

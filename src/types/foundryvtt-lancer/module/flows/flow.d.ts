import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
/**
 * A Step is a function which is used inside a Flow for a discrete action.
 * Steps are exepcted to modify the provided state object as appropriate for the
 * work they are doing, and often include prompting and processing user input.
 * @returns false if the flow should be aborted after this step.
 */
export type Step<T, U> = (state: FlowState<T>, options?: U) => Promise<boolean>;
/**
 * Encapsulates the current state of a Flow. `data` is a generic object with the data
 * relevant to the specific Flow type.
 */
export interface FlowState<T> {
    name: string;
    actor: LancerActor;
    item: LancerItem | null;
    currentStep: string;
    data?: T;
}
/**
 * A Flow is a game process composed of one or more Steps. Flows can be triggered
 * by either automation (e.g. structure/stress rolls) or by user interaction
 * (e.g. a weapon attack).
 *
 * Once a flow is triggered, it goes through its Steps in order, gathering
 * data and user input as needed, and generally ends with outputting a chat card.
 *
 * Some Flows' chat cards will contain buttons for rerolling (perform the same
 * Flow again, with data pre-loaded from the state of the Flow which generated
 * the chat card), or buttons which can trigger other flows (e.g. damage
 * application).
 */
export declare class Flow<StateData> {
    static steps: Array<string>;
    state: FlowState<StateData>;
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: StateData);
    /**
     * Retrieve a step function from the global registry in game.lancer.flowSteps.
     * @param stepKey The key of the step to retrieve
     * @returns The step with the given key, or null if no such step exists.
     */
    static getStep(stepKey: string): Step<any, any> | Flow<any> | null;
    /**
     * Retrieve a step function from the global registry in game.lancer.flowSteps.
     * Convenience access to the static method.
     * @param stepKey The key of the step to retrieve
     * @returns The step with the given key, or null if no such step exists.
     */
    getStep(stepKey: string): Step<any, any> | Flow<any> | null;
    /**
     * Insert a step into the step array, to be executed before an existing step
     * @param key Existing step key to insert newKey before
     * @param newKey New step key
     */
    static insertStepBefore(key: string, newKey: string): void;
    /**
     * Insert a step into the step array, to be executed after an existing step
     * @param key Existing step key to insert newKey after
     * @param newKey New step key
     */
    static insertStepAfter(key: string, newKey: string): void;
    /**
     * Remove the given step from the steps to execute
     * @param key Existing step key to delete
     */
    static removeStep(key: string): void;
    /**
     * Start the flow. Each step is awaited in the order they were inserted to the map.
     * @param data Initial data for the specific flow to populate its state.data.
     */
    begin(data?: StateData): Promise<boolean>;
    /**
     * Generate a JSON string representing this Flow instance.
     * This is a generic implementation, some Flows will reimplement as needed.
     * @returns JSON string representing this Flow instance.
     */
    serialize(): string;
    /**
     * Consume a serialized Flow state JSON to create a hydrated Flow instance
     * This is a generic implementation, some Flows will reimplement as needed.
     * @param json Serialized JSON string of the flow.
     * @returns A new Flow constructed from the JSON data.
     */
    static deserialize(json: string): Flow<any>;
}

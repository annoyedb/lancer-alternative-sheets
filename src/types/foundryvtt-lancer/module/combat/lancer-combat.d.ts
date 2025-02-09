/**
 * Overrides and extends the Combat class to use an activation model instead of
 * the standard ordered list of turns. {@link LancerCombat#activateCombatant}
 * is added to the interface.
 */
export declare class LancerCombat extends Combat {
    protected _sortCombatants(a: LancerCombatant, b: LancerCombatant): number;
    protected _preCreate(...[data, options, user]: Parameters<Combat["_preCreate"]>): Promise<void>;
    _manageTurnEvents(adjustedTurn: any): Promise<void>;
    /**
     * Set all combatants to their max activations
     */
    resetActivations(): Promise<LancerCombatant[]>;
    startCombat(): Promise<this | undefined>;
    nextRound(): Promise<this | undefined>;
    /**
     * Ends the current turn without starting a new one
     */
    nextTurn(): Promise<this | undefined>;
    previousRound(): Promise<this | undefined>;
    /**
     * End the current turn and refund the activation
     */
    previousTurn(): Promise<this | undefined>;
    resetAll(): Promise<this | undefined>;
    /**
     * Sets the active turn to the combatant passed by id or calls
     * {@link LancerCombat#requestActivation()} if the user does not have
     * permission to modify the combat
     */
    activateCombatant(id: string, override?: boolean): Promise<this | undefined>;
    /**
     * Sets the active turn back to 0 (no active unit) if the passed id
     * corresponds to the current turn and the user has ownership of the
     * combatant.
     */
    deactivateCombatant(id: string): Promise<this | undefined>;
    /**
     * Calls any Hooks registered for "LancerCombatRequestActivate".
     */
    protected requestActivation(id: string): Promise<this>;
}
export declare class LancerCombatant extends Combatant {
    /**
     * This just fixes a bug in foundry 0.8.x that prevents Combatants with no
     * associated token or actor from being modified, even by the GM
     */
    testUserPermission(...[user, permission, options]: Parameters<Combatant["testUserPermission"]>): boolean;
    prepareBaseData(): void;
    /**
     * The current activation data for the combatant.
     */
    get activations(): Activations;
    /**
     * The disposition for this combatant. In order, manually specified for this
     * combatant, token dispostion, token disposition for the associated actor,
     * -2.
     */
    get disposition(): number;
    /**
     * Adjusts the number of activations that a combatant can take
     * @param num - The number of maximum activations to add (can be negative)
     */
    addActivations(num: number): Promise<this | undefined>;
    /**
     * Adjusts the number of current activations that a combatant has
     * @param num - The number of current activations to add (can be negative)
     */
    modifyCurrentActivations(num: number): Promise<this | undefined>;
}
/**
 * Interface for the activations object
 */
interface Activations {
    max?: number;
    value?: number;
}
export {};

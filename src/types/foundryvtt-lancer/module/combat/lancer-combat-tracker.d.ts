/**
 * Overrides the display of the combat and turn order tab to add activation
 * buttons and either move or remove the initiative button
 */
export declare class LancerCombatTracker extends CombatTracker {
    static get defaultOptions(): CombatTracker.Options;
    scrollToTurn(): void;
    /**
     * Intercepts the data being sent to the combat tracker window and
     * optionally sorts the the turn data that gets displayed. This allows the
     * units that have already gone to be moved to the bottom without the risk of
     * updateCombat events being eaten.
     */
    getData(options?: Partial<CombatTracker.Options>): Promise<CombatTracker.Data>;
    activateListeners(html: JQuery<HTMLElement>): void;
    /**
     * Activate the selected combatant
     */
    protected _onActivateCombatant(event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): Promise<void>;
    protected _onAddActivation(li: JQuery<HTMLElement>): Promise<void>;
    protected _onRemoveActivation(li: JQuery<HTMLElement>): Promise<void>;
    protected _onUndoActivation(li: JQuery<HTMLElement>): Promise<void>;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
/**
 * Get the current appearance data from settings
 */
export declare function getTrackerAppearance(): NonNullable<CONFIG["LancerInitiative"]["def_appearance"]>;
export declare function setAppearance(val: Partial<Appearance>): void;
type Appearance = Partial<CONFIG["LancerInitiative"]["def_appearance"]>;
export {};

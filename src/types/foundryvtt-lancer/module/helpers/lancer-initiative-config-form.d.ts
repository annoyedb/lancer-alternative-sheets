export declare class LancerCombatTrackerConfig extends CombatTrackerConfig<FormApplication.Options, ClientSettings.Values["lancer.combatTrackerConfig"]> {
    static get defaultOptions(): FormApplication.Options;
    getData(options?: Partial<FormApplication.Options>): Promise<any>;
    activateListeners(html: JQuery<HTMLElement>): void;
    _updateObject(event: Event, formData: ClientSettings.Values["lancer.combatTrackerConfig"]): Promise<ClientSettings.Values["core.combatTrackerConfig"]>;
}

import type { AutomationOptions } from "../settings";
/**
 * Settings form for customizing the icon appearance of the icon used in the
 * tracker
 */
export declare class AutomationConfig extends FormApplication<FormApplication.Options, AutomationOptions> {
    constructor(object?: any, options?: {});
    /** @override */
    static get defaultOptions(): FormApplication.Options;
    /** @override */
    getData(): AutomationOptions;
    /** @override */
    activateListeners(html: JQuery<HTMLFormElement>): void;
    /** @override */
    _updateObject(_: Event, data: Record<string, unknown>): Promise<void>;
    /**
     * Sets all settings handled by the form to undefined in order to revert to
     * their default values.
     */
    resetSettings(): Promise<unknown>;
}

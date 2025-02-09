import { StatusIconConfigOptions } from "../settings";
/**
 * Settings form for customizing the icon appearance of the icon used in the
 * tracker
 */
export declare class StatusIconConfig extends FormApplication<FormApplication.Options, StatusIconConfigOptions> {
    /** @override */
    static get defaultOptions(): FormApplication.Options;
    /** @override */
    getData(): StatusIconConfigOptions;
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

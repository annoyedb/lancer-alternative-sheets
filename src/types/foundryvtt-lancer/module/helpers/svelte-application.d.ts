import type SvelteComponent from "*.svelte";
type SvelteAppOptions = Application.Options & {
    intro?: boolean;
};
export default class SvelteApp<DataModel> extends Application {
    #private;
    klass: typeof SvelteComponent;
    data: DataModel;
    component?: SvelteComponent;
    options: SvelteAppOptions;
    promise: Promise<DataModel>;
    constructor(App: typeof SvelteComponent, data: DataModel, options?: SvelteAppOptions);
    refreshPromise(): void;
    resolvePromise(): void;
    rejectPromise(): void;
    activateListeners(html: JQuery): void;
    close(): Promise<void>;
    _renderInner(_data: any): Promise<JQuery<HTMLElement>>;
}
export {};

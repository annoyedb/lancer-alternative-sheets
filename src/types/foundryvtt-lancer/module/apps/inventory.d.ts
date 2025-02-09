import type { LancerActor } from "../actor/lancer-actor";
interface FilledCategory {
    label: string;
    items: any[];
}
export interface InventoryDialogData {
    content: string;
    buttons: Record<string, Dialog.Button>;
    categories: FilledCategory[];
}
/**
 * A helper Dialog subclass for editing an actors inventories
 * @extends {Dialog}
 */
export declare class InventoryDialog extends Dialog {
    readonly actor: LancerActor;
    constructor(actor: LancerActor, dialogData: Dialog.Data, options?: Partial<Dialog.Options>);
    /** @override */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        width: number | undefined;
        classes: any[] | undefined;
        template: string | undefined;
        jQuery: boolean | undefined;
        baseApplication: string | null | undefined;
        height: number | "auto" | null | undefined;
        top: number | null | undefined;
        left: number | null | undefined;
        scale?: number | null | undefined;
        popOut: boolean | undefined;
        minimizable: boolean | undefined;
        resizable: boolean | undefined;
        id: string | undefined;
        title: string | undefined;
        scrollY: any[] | undefined;
        tabs: any[] | undefined;
        dragDrop: any[] | undefined;
        filters: any[] | undefined;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        width?: number | undefined;
        classes?: any[] | undefined;
        template?: string | undefined;
        jQuery?: boolean | undefined;
        baseApplication?: string | null | undefined;
        height?: number | "auto" | null | undefined;
        top?: number | null | undefined;
        left?: number | null | undefined;
        scale?: number | null | undefined;
        popOut?: boolean | undefined;
        minimizable?: boolean | undefined;
        resizable?: boolean | undefined;
        id?: string | undefined;
        title?: string | undefined;
        scrollY?: any[] | undefined;
        tabs?: any[] | undefined;
        dragDrop?: any[] | undefined;
        filters?: any[] | undefined;
    }, never>>;
    getData(): Promise<InventoryDialogData>;
    /** @inheritdoc */
    render(force: any, options?: {}): unknown;
    close(options?: FormApplication.CloseOptions): Promise<void>;
    populate_categories(actor: LancerActor): FilledCategory[];
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    static show_inventory(actor: LancerActor): Promise<void>;
}
export {};

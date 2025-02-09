import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
/**
 * A helper Dialog subclass for editing html descriptions, which will automatically fixup html written to it (so the user doesn't just nuke themselves)
 * @extends {Dialog}
 */
export declare class HTMLEditDialog extends FormApplication {
    target: LancerActor | LancerItem;
    text: string;
    text_path: string;
    resolve: () => any;
    constructor(target: LancerActor | LancerItem, text_path: string, options: any, resolve_func: () => any);
    /** @override */
    static get defaultOptions(): FormApplication.Options;
    /** @override
     * Expose our data
     */
    getData(): any;
    /** @override */
    _updateObject(_event: unknown, formData: {
        text: string;
    }): Promise<void>;
    /** @override
     * Want to resolve promise before closing
     */
    close(options: FormApplication.CloseOptions): any;
    /**
     * A helper constructor function which displays the text edit dialog and returns a Promise once it's
     * workflow has been resolved.
     * @return {Promise}
     */
    static edit_text(in_object: LancerActor | LancerItem, at_path: string): Promise<void>;
}

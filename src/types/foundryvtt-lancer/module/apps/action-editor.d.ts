import { ActionData } from "../models/bits/action";
import { TargetedEditForm } from "./targeted-form-editor";
/**
 * A helper Dialog subclass for editing an action
 * @extends {Dialog}
 */
export declare class ActionEditDialog extends TargetedEditForm<ActionData> {
    /** @override */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        width: number;
        height: "auto";
        classes: string[];
        submitOnChange: boolean;
        submitOnClose: boolean;
        closeOnSubmit: boolean;
        baseApplication: string | null;
        top: number | null;
        left: number | null;
        scale?: number | null | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        title: string;
        template: string;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDrop.Options, "permissions" | "callbacks">[];
        filters: Omit<SearchFilter.Options, "callback">[];
        editable: boolean;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        template: string;
        title: string;
        classes: string[];
        submitOnClose: boolean;
    }, never>>;
    getData(): any;
    /** @override */
    fixupForm(form_data: Record<string, string | number | boolean>): Record<string, string | number | boolean>;
}

import { TagData } from "../models/bits/tag";
import { TargetedEditForm } from "./targeted-form-editor";
/**
 * A helper FormApplication subclass for editing a tag
 * @extends {FormApplication}
 */
export declare class TagEditForm extends TargetedEditForm<TagData> {
    /** @override */
    static get defaultOptions(): {
        template: string;
        classes: string[];
        title: string;
        submitOnClose: boolean;
        width: number;
        height: "auto";
        submitOnChange: boolean;
        closeOnSubmit: boolean;
        baseApplication: string | null;
        top: number | null;
        left: number | null;
        scale?: number | null | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDrop.Options, "permissions" | "callbacks">[];
        filters: Omit<SearchFilter.Options, "callback">[];
        editable: boolean;
    };
    getData(): any;
}

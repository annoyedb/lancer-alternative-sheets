import type { HelperOptions } from "handlebars";
import { Tag } from "../models/bits/tag";
import { LancerItem } from "../item/lancer-item";
export declare function attachTagTooltips(html: JQuery): void;
export declare function handleTagEditButtons(html: JQuery, doc: LancerItem): void;
export declare function compactTag(tagPath: string, tag: Tag, editable?: boolean): string;
export declare function largeTag(tagPath: string, tag: Tag, editable?: boolean): string;
export declare function compactTagListHBS(tagArrayPath: string, options: HelperOptions): string;
export declare function largeTagListHBS(tagArrayPath: string, options: HelperOptions): string;
export declare function compactTagList(tags: Tag[], tagArrayPath: string, options?: {
    editable?: boolean;
}): string;
export declare function largeTagList(tags: Tag[], tagArrayPath: string, options?: {
    editable?: boolean;
}): string;
export declare function itemEditTags(path: string, header: string, options: HelperOptions): string;

import { EntryType } from "../enums";
import { LancerItemSheetData } from "../interfaces";
import { LancerItemSheet } from "./item-sheet";
import type { LancerItem } from "./lancer-item";
/**
 * Extend the generic Lancer item sheet
 * @extends {LancerItemSheet}
 */
export declare class LancerNPCClassSheet extends LancerItemSheet<EntryType.NPC_CLASS | EntryType.NPC_TEMPLATE> {
    /**
     * @override
     * Extend and override the default options used by the generic Lancer item sheet
     */
    static get defaultOptions(): ItemSheet.Options;
    base_feature_items: (LancerItem["data"] & {
        type: EntryType.NPC_FEATURE;
    })[];
    optional_feature_items: (LancerItem["data"] & {
        type: EntryType.NPC_FEATURE;
    })[];
    getData(): Promise<LancerItemSheetData<EntryType.NPC_CLASS | EntryType.NPC_TEMPLATE>>;
}

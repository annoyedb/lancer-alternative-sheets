import { PackedTagData, PackedTagTemplateData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface TagData {
    lid: string;
    val: string;
}
export interface TagTemplateData {
    lid: string;
    name: string;
    description: string;
    filter_ignore: boolean;
    hidden: boolean;
}
export declare class Tag implements Readonly<TagData> {
    lid: string;
    val: string;
    name: string;
    description: string;
    hidden: boolean;
    constructor(data: TagData);
    get num_val(): number | null;
    /**
     * Helper funciton to interpolate the correct value from tags with values matching
     * the pattern {number/number/number}
     * @param tag A tag with a value
     * @param tier The NPC tier to get the value for
     * @returns The string for the requested tier from the tag value
     */
    tierVal(tier: number): string;
    save(): TagData;
    copy(): Tag;
    get should_show(): boolean;
    get is_unique(): boolean;
    get is_ai(): boolean;
    get is_ap(): boolean;
    get is_limited(): boolean;
    get is_loading(): boolean;
    get is_recharge(): boolean;
    get is_indestructible(): boolean;
    get is_smart(): boolean;
    get is_seeking(): boolean;
    get is_overkill(): boolean;
    get is_accurate(): boolean;
    get is_inaccurate(): boolean;
    get is_reliable(): boolean;
    get is_selfheat(): boolean;
    get is_knockback(): boolean;
    get is_overshield(): boolean;
    get is_cascaderesistant(): boolean;
    get is_ordnance(): boolean;
    static MergeTags(...tag_arrays: Tag[][]): Tag[];
}
export declare class TagField extends fields.SchemaField {
    constructor(options?: {});
    /** @override */
    initialize(value: TagData, model: unknown): Tag;
    /** @override */
    _cast(value: any): any;
    migrateSource(sourceData: any, fieldData: any): any;
}
export declare function unpackTagTemplate(data: PackedTagTemplateData): TagTemplateData;
export declare function unpackTag(data: PackedTagData): TagData;
export {};

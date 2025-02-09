import { RangeType, RangeTypeChecklist } from "../../enums";
import { PackedRangeData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface RangeData {
    type: RangeType;
    val: number;
}
export declare class Range implements Required<RangeData> {
    type: RangeType;
    val: number;
    constructor(data: RangeData);
    save(): RangeData;
    copy(): Range;
    get formatted(): string;
    get icon(): string;
    get discord_emoji(): string;
    static DiscordEmojiFor(rt: RangeType): string;
    static IconFor(rt: RangeType): string;
    static MakeChecklist(ranges: RangeType[]): RangeTypeChecklist;
    static FlattenChecklist(ranges: RangeTypeChecklist): RangeType[];
    static CombineLists(base: Range[], additions: Range[]): Range[];
}
export declare class RangeField extends fields.SchemaField {
    constructor(options?: {});
    /** @override */
    initialize(value: RangeData, model: unknown): Range;
    migrateSource(sourceData: any, fieldData: any): any;
    /** @override */
    _cast(value: any): any;
}
export declare function unpackRange(data: PackedRangeData): RangeData;
export {};

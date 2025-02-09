import { DamageType, DamageTypeChecklist } from "../../enums";
import { PackedDamageData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface DamageData {
    type: DamageType;
    val: string;
}
export declare class Damage implements Readonly<DamageData> {
    type: DamageType;
    val: string;
    constructor(data: DamageData);
    save(): DamageData;
    copy(): Damage;
    get icon(): string;
    get text(): string;
    get discord_emoji(): string;
    get color(): string;
    static IconFor(dt: DamageType): string;
    static DiscordEmojiFor(dt: DamageType): string;
    static ColorFor(dt: DamageType): string;
    static MakeChecklist(damages: DamageType[]): DamageTypeChecklist;
    static FlattenChecklist(damages: DamageTypeChecklist): DamageType[];
    static CombineLists(base: Damage[], addition: Damage[]): Damage[];
}
export declare class DamageField extends fields.SchemaField {
    constructor(options?: {});
    /** @override */
    initialize(value: DamageData, model: unknown): Damage;
    migrateSource(sourceData: any, fieldData: any): any;
    /** @override */
    _cast(value: any): any;
}
export declare function unpackDamage(data: PackedDamageData): DamageData;
export {};

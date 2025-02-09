import { EntryType } from "../enums";
import { FullBoundedNum, SourceData } from "../source-template";
import { SystemTemplates } from "../system-template";
declare const fields: any;
export declare class LancerDataModel<T> extends foundry.abstract.DataModel<T> {
    /**
     * Create a full update payload, e.g. to preserve arrays
     * @param update_data the update data to apply
     */
    full_update_data(update_data: object): object;
    _pre_finalize_tasks: Array<() => any>;
    /**
     * Add a job to this model to be called pre-finalize
     */
    add_pre_finalize_task(task: () => any): void;
    /**
     * Call this in prepare data to finalize our jobs
     */
    finalize_tasks(): void;
    _initialize(...args: any): void;
}
/**
 * Merge data, except it handles arrays.
 *
 */
export declare function fancy_merge_data(full_source_data: any, update_data: any): any;
export declare class LIDField extends fields.StringField {
    /** @override */
    _cast(value: any): any;
    _validateType(value: any): any;
}
export declare class EmbeddedRefField extends fields.StringField {
    readonly document_type: "Item" | "ActiveEffect";
    allowed_types: EntryType[] | null;
    /**
     * @param {StringFieldOptions} options  Options which configure the behavior of the field
     */
    constructor(document_type: "Item" | "ActiveEffect", options?: {
        allowed_types?: EntryType[];
    } & Record<string, any>);
    /** @inheritdoc */
    static get _defaults(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        [x: string]: any;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        initial: null;
        blank: boolean;
        trim: boolean;
        nullable: boolean;
    }, never>>;
    /** @override */
    _cast(value: any): any;
    /** @inheritdoc */
    initialize(value: string | null, model: LancerDataModel<any>): null | SystemTemplates.ResolvedEmbeddedRef<any>;
}
export declare class SyncUUIDRefField extends fields.StringField {
    readonly document_type: "Actor" | "Item";
    allowed_types: string[] | null;
    /**
     * @param {StringFieldOptions} options  Options which configure the behavior of the field
     */
    constructor(document_type: "Actor" | "Item", options?: {
        allowed_types?: EntryType[];
    } & Record<string, any>);
    /** @inheritdoc */
    static get _defaults(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        [x: string]: any;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        initial: null;
        blank: boolean;
        trim: boolean;
        nullable: boolean;
    }, never>>;
    /** @override */
    _cast(value: any): any;
    /** @override */
    _validateType(value: any): any;
    /** @inheritdoc */
    initialize(value: string, model: any): null | SystemTemplates.ResolvedSyncUuidRef<any>;
}
export declare class FakeBoundedNumberField extends fields.NumberField {
    constructor(options?: object);
    /** @override */
    initialize(value: number, model: any): {
        min: any;
        max: any;
        value: number;
    };
    /** @override */
    _cast(value: any): any;
}
export declare class FullBoundedNumberField extends fields.SchemaField {
    defaultValue: number;
    defaultMax: number;
    constructor(options?: {
        min?: number;
        max?: number;
        initialValue?: number;
    });
    /** @override */
    initialize(value: FullBoundedNum, model: any): {
        min: number;
        max: number;
        value: number;
    };
    /** @override */
    _cast(value: FullBoundedNum): any;
}
export declare class ChecklistField extends fields.SchemaField {
    constructor(target_enum: Record<string, string>, options?: {});
}
export declare class DamageTypeChecklistField extends ChecklistField {
    constructor(options?: {});
}
export declare class RangeTypeChecklistField extends ChecklistField {
    constructor(options?: {});
}
export declare class WeaponTypeChecklistField extends ChecklistField {
    constructor(options?: {});
}
export declare class WeaponSizeChecklistField extends ChecklistField {
    constructor(options?: {});
}
export declare class SystemTypeChecklistField extends ChecklistField {
    constructor(options?: {});
}
/** A single tier of npc stats */
export declare class NpcStatBlockField extends fields.SchemaField {
    constructor(options: {
        nullable: boolean;
    });
}
export declare class ControlledLengthArrayField extends fields.ArrayField {
    constructor(element: any, options: any);
    /** @override */
    _cast(value: any): any;
}
export interface UnpackContext {
    createdDeployables: Array<{
        name: string;
        type: EntryType.DEPLOYABLE;
        system: DeepPartial<SourceData.Deployable>;
    }>;
}
export {};

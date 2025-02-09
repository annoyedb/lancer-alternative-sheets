import * as t from "io-ts";
import type { LancerActor } from "../../actor/lancer-actor";
import type { AccDiffHudPlugin, AccDiffHudPluginData, AccDiffHudPluginCodec } from "./plugin";
import { LancerItem } from "../../item/lancer-item";
import { LancerToken } from "../../token";
import { Tag } from "../../models/bits/tag";
export declare enum Cover {
    None = 0,
    Soft = 1,
    Hard = 2
}
export declare class AccDiffHudWeapon {
    #private;
    accurate: boolean;
    inaccurate: boolean;
    seeking: boolean;
    plugins: {
        [k: string]: AccDiffHudPluginData;
    };
    static pluginSchema: {
        [k: string]: AccDiffHudPluginCodec<any, any, any>;
    };
    static get schema(): {
        accurate: t.BooleanC;
        inaccurate: t.BooleanC;
        seeking: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        accurate: t.BooleanC;
        inaccurate: t.BooleanC;
        seeking: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    }>;
    static get codec(): t.Type<AccDiffHudWeapon, {
        accurate: boolean;
        inaccurate: boolean;
        seeking: boolean;
        plugins: {
            [x: string]: Codec<C, O, I>;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffHudWeapon.schemaCodec>);
    get raw(): {
        accurate: boolean;
        inaccurate: boolean;
        seeking: boolean;
        plugins: {
            [k: string]: AccDiffHudPluginData;
        };
    };
    get impaired(): ActiveEffect | null;
    total(cover: number): number;
    hydrate(d: AccDiffHudData): void;
}
export declare class AccDiffHudBase {
    #private;
    accuracy: number;
    difficulty: number;
    cover: Cover;
    plugins: {
        [k: string]: AccDiffHudPluginData;
    };
    static pluginSchema: {
        [k: string]: AccDiffHudPluginCodec<any, any, any>;
    };
    static get schema(): {
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    }>;
    static get codec(): t.Type<AccDiffHudBase, {
        accuracy: number;
        difficulty: number;
        cover: 0 | 1 | 2;
        plugins: {
            [x: string]: Codec<C, O, I>;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffHudBase.schemaCodec>);
    get raw(): {
        accuracy: number;
        difficulty: number;
        cover: Cover;
        plugins: {
            [k: string]: AccDiffHudPluginData;
        };
    };
    hydrate(d: AccDiffHudData): void;
    get total(): number;
}
export declare class AccDiffHudTarget {
    #private;
    target: LancerToken;
    accuracy: number;
    difficulty: number;
    cover: Cover;
    consumeLockOn: boolean;
    plugins: {
        [k: string]: any;
    };
    static pluginSchema: {
        [k: string]: AccDiffHudPluginCodec<any, any, any>;
    };
    static get schema(): {
        target_id: t.StringC;
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        consumeLockOn: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        target_id: t.StringC;
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        consumeLockOn: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    }>;
    static get codec(): t.Type<AccDiffHudTarget, {
        target_id: string;
        accuracy: number;
        difficulty: number;
        cover: 0 | 1 | 2;
        consumeLockOn: boolean;
        plugins: {
            [x: string]: Codec<C, O, I>;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffHudTarget.schemaCodec>);
    get raw(): {
        target_id: string;
        accuracy: number;
        difficulty: number;
        cover: Cover;
        consumeLockOn: boolean;
        plugins: {
            [k: string]: any;
        };
    };
    static fromParams(t: Token): AccDiffHudTarget;
    hydrate(d: AccDiffHudData): void;
    get usingLockOn(): null | boolean;
    get lockOnAvailable(): null | boolean;
    get total(): number;
}
export type AccDiffHudDataSerialized = t.OutputOf<typeof AccDiffHudData.schemaCodec>;
export declare class AccDiffHudData {
    title: string;
    weapon: AccDiffHudWeapon;
    base: AccDiffHudBase;
    targets: AccDiffHudTarget[];
    lancerItem?: LancerItem;
    lancerActor?: LancerActor;
    static get schema(): {
        title: t.StringC;
        weapon: t.Type<AccDiffHudWeapon, {
            accurate: boolean;
            inaccurate: boolean;
            seeking: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>;
        base: t.Type<AccDiffHudBase, {
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>;
        targets: t.ArrayC<t.Type<AccDiffHudTarget, {
            target_id: string;
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            consumeLockOn: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>>;
    };
    static get schemaCodec(): t.TypeC<{
        title: t.StringC;
        weapon: t.Type<AccDiffHudWeapon, {
            accurate: boolean;
            inaccurate: boolean;
            seeking: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>;
        base: t.Type<AccDiffHudBase, {
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>;
        targets: t.ArrayC<t.Type<AccDiffHudTarget, {
            target_id: string;
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            consumeLockOn: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>>;
    }>;
    static get codec(): t.Type<AccDiffHudData, {
        title: string;
        weapon: {
            accurate: boolean;
            inaccurate: boolean;
            seeking: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        };
        base: {
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        };
        targets: {
            target_id: string;
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            consumeLockOn: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }[];
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffHudData.schemaCodec>);
    hydrate(runtimeData?: LancerItem | LancerActor): void;
    replaceTargets(ts: Token[]): AccDiffHudData;
    get raw(): {
        title: string;
        weapon: AccDiffHudWeapon;
        base: AccDiffHudBase;
        targets: AccDiffHudTarget[];
    };
    static fromObject(obj: AccDiffHudDataSerialized, runtimeData?: LancerItem | LancerActor): AccDiffHudData;
    toObject(): t.OutputOf<typeof AccDiffHudData.codec>;
    static plugins: AccDiffHudPlugin<AccDiffHudPluginData>[];
    static targetedPlugins: AccDiffHudPlugin<AccDiffHudPluginData>[];
    static registerPlugin<D extends AccDiffHudPluginData, P extends AccDiffHudPlugin<D>>(plugin: P): void;
    static fromParams(runtimeData?: LancerItem | LancerActor, tags?: Tag[], title?: string, targets?: Token[], starting?: [number, number] | number): AccDiffHudData;
}

import * as t from "io-ts";
import { LancerActor } from "../../actor/lancer-actor";
import { DamageHudPlugin, DamageHudPluginCodec, DamageHudPluginData } from "./plugin";
import { LancerItem } from "../../item/lancer-item";
import { LancerToken } from "../../token";
import { Tag } from "../../models/bits/tag";
import { DamageData } from "../../models/bits/damage";
import { LancerFlowState } from "../../flows/interfaces";
export declare enum HitQuality {
    Miss = 0,
    Hit = 1,
    Crit = 2
}
export declare class DamageHudWeapon {
    #private;
    damage: DamageData[];
    bonusDamage: DamageData[];
    reliable: boolean;
    reliableValue: number;
    overkill: boolean;
    plugins: {
        [k: string]: DamageHudPluginData;
    };
    static pluginSchema: {
        [k: string]: DamageHudPluginCodec<any, any, any>;
    };
    static get schema(): {
        damage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        bonusDamage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        reliable: t.BooleanC;
        reliableValue: t.NumberC;
        overkill: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        damage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        bonusDamage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        reliable: t.BooleanC;
        reliableValue: t.NumberC;
        overkill: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    }>;
    static get codec(): t.Type<DamageHudWeapon, {
        damage: {
            type: string;
            val: string;
        }[];
        bonusDamage: {
            type: string;
            val: string;
        }[];
        reliable: boolean;
        reliableValue: number;
        overkill: boolean;
        plugins: {
            [x: string]: Codec<C, O, I>;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof DamageHudWeapon.schemaCodec>);
    get raw(): {
        damage: DamageData[];
        bonusDamage: DamageData[];
        reliable: boolean;
        reliableValue: number;
        overkill: boolean;
        plugins: {
            [k: string]: DamageHudPluginData;
        };
    };
    hydrate(d: DamageHudData): void;
    get total(): {
        damage: DamageData[];
        bonusDamage: DamageData[];
    };
    static parseReliableVal(tag: Tag, source?: LancerItem | LancerActor): number;
}
export declare class DamageHudBase {
    #private;
    ap: boolean;
    paracausal: boolean;
    halfDamage: boolean;
    damage: DamageData[];
    bonusDamage: DamageData[];
    plugins: {
        [k: string]: DamageHudPluginData;
    };
    static pluginSchema: {
        [k: string]: DamageHudPluginCodec<any, any, any>;
    };
    static get schema(): {
        ap: t.BooleanC;
        paracausal: t.BooleanC;
        halfDamage: t.BooleanC;
        damage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        bonusDamage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        ap: t.BooleanC;
        paracausal: t.BooleanC;
        halfDamage: t.BooleanC;
        damage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        bonusDamage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    }>;
    static get codec(): t.Type<DamageHudBase, {
        ap: boolean;
        paracausal: boolean;
        halfDamage: boolean;
        damage: {
            type: string;
            val: string;
        }[];
        bonusDamage: {
            type: string;
            val: string;
        }[];
        plugins: {
            [x: string]: Codec<C, O, I>;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof DamageHudBase.schemaCodec>);
    get raw(): {
        ap: boolean;
        paracausal: boolean;
        halfDamage: boolean;
        damage: DamageData[];
        bonusDamage: DamageData[];
        plugins: {
            [k: string]: DamageHudPluginData;
        };
    };
    hydrate(d: DamageHudData): void;
    get total(): {
        damage: DamageData[];
        bonusDamage: DamageData[];
    };
}
export declare class DamageHudTarget {
    #private;
    target: LancerToken;
    quality: HitQuality;
    ap: boolean;
    paracausal: boolean;
    halfDamage: boolean;
    bonusDamage: DamageData[];
    plugins: {
        [k: string]: any;
    };
    static pluginSchema: {
        [k: string]: DamageHudPluginCodec<any, any, any>;
    };
    static get schema(): {
        target_id: t.StringC;
        quality: t.NumberC;
        ap: t.BooleanC;
        paracausal: t.BooleanC;
        halfDamage: t.BooleanC;
        bonusDamage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        target_id: t.StringC;
        quality: t.NumberC;
        ap: t.BooleanC;
        paracausal: t.BooleanC;
        halfDamage: t.BooleanC;
        bonusDamage: t.ArrayC<t.TypeC<{
            type: t.StringC;
            val: t.StringC;
        }>>;
        plugins: t.TypeC<{
            [k: string]: Codec<C, O, I>;
        }>;
    }>;
    static get codec(): t.Type<DamageHudTarget, {
        target_id: string;
        quality: number;
        ap: boolean;
        paracausal: boolean;
        halfDamage: boolean;
        bonusDamage: {
            type: string;
            val: string;
        }[];
        plugins: {
            [x: string]: Codec<C, O, I>;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof DamageHudTarget.schemaCodec>);
    get raw(): {
        target_id: string;
        quality: HitQuality;
        ap: boolean;
        paracausal: boolean;
        halfDamage: boolean;
        bonusDamage: DamageData[];
        plugins: {
            [k: string]: any;
        };
    };
    static fromParams(t: Token, data?: {
        quality?: HitQuality;
        ap?: boolean;
        paracausal?: boolean;
        halfDamage?: boolean;
        bonusDamage?: DamageData[];
    }): DamageHudTarget;
    hydrate(d: DamageHudData): void;
    get total(): {
        damage: {
            damage: DamageData[];
            bonusDamage: DamageData[];
        };
        bonusDamage: DamageData[];
    };
}
declare class DamageHudHitResult {
    target: string;
    total: string;
    usedLockOn: boolean;
    hit: boolean;
    crit: boolean;
    static get schema(): {
        target: t.StringC;
        total: t.StringC;
        usedLockOn: t.BooleanC;
        hit: t.BooleanC;
        crit: t.BooleanC;
    };
    static get schemaCodec(): t.TypeC<{
        target: t.StringC;
        total: t.StringC;
        usedLockOn: t.BooleanC;
        hit: t.BooleanC;
        crit: t.BooleanC;
    }>;
    static get codec(): t.Type<DamageHudHitResult, {
        target: string;
        total: string;
        usedLockOn: boolean;
        hit: boolean;
        crit: boolean;
    }, unknown>;
    constructor(obj: t.TypeOf<typeof DamageHudHitResult.schemaCodec>);
    get raw(): {
        target: string;
        total: string;
        usedLockOn: boolean;
        hit: boolean;
        crit: boolean;
    };
}
export type DamageHudDataSerialized = t.OutputOf<typeof DamageHudData.schemaCodec>;
export declare class DamageHudData {
    title: string;
    weapon: DamageHudWeapon | undefined;
    base: DamageHudBase;
    hitResults: DamageHudHitResult[];
    targets: DamageHudTarget[];
    lancerItem?: LancerItem;
    lancerActor?: LancerActor;
    static get schema(): {
        title: t.StringC;
        weapon: t.UnionC<[t.Type<DamageHudWeapon, {
            damage: {
                type: string;
                val: string;
            }[];
            bonusDamage: {
                type: string;
                val: string;
            }[];
            reliable: boolean;
            reliableValue: number;
            overkill: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>, t.UndefinedC]>;
        base: t.Type<DamageHudBase, {
            ap: boolean;
            paracausal: boolean;
            halfDamage: boolean;
            damage: {
                type: string;
                val: string;
            }[];
            bonusDamage: {
                type: string;
                val: string;
            }[];
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>;
        hitResults: t.ArrayC<t.Type<DamageHudHitResult, {
            target: string;
            total: string;
            usedLockOn: boolean;
            hit: boolean;
            crit: boolean;
        }, unknown>>;
        targets: t.ArrayC<t.Type<DamageHudTarget, {
            target_id: string;
            quality: number;
            ap: boolean;
            paracausal: boolean;
            halfDamage: boolean;
            bonusDamage: {
                type: string;
                val: string;
            }[];
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>>;
    };
    static get schemaCodec(): t.TypeC<{
        title: t.StringC;
        weapon: t.UnionC<[t.Type<DamageHudWeapon, {
            damage: {
                type: string;
                val: string;
            }[];
            bonusDamage: {
                type: string;
                val: string;
            }[];
            reliable: boolean;
            reliableValue: number;
            overkill: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>, t.UndefinedC]>;
        base: t.Type<DamageHudBase, {
            ap: boolean;
            paracausal: boolean;
            halfDamage: boolean;
            damage: {
                type: string;
                val: string;
            }[];
            bonusDamage: {
                type: string;
                val: string;
            }[];
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>;
        hitResults: t.ArrayC<t.Type<DamageHudHitResult, {
            target: string;
            total: string;
            usedLockOn: boolean;
            hit: boolean;
            crit: boolean;
        }, unknown>>;
        targets: t.ArrayC<t.Type<DamageHudTarget, {
            target_id: string;
            quality: number;
            ap: boolean;
            paracausal: boolean;
            halfDamage: boolean;
            bonusDamage: {
                type: string;
                val: string;
            }[];
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }, unknown>>;
    }>;
    static get codec(): t.Type<DamageHudData, {
        title: string;
        weapon: {
            damage: {
                type: string;
                val: string;
            }[];
            bonusDamage: {
                type: string;
                val: string;
            }[];
            reliable: boolean;
            reliableValue: number;
            overkill: boolean;
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        } | undefined;
        base: {
            ap: boolean;
            paracausal: boolean;
            halfDamage: boolean;
            damage: {
                type: string;
                val: string;
            }[];
            bonusDamage: {
                type: string;
                val: string;
            }[];
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        };
        hitResults: {
            target: string;
            total: string;
            usedLockOn: boolean;
            hit: boolean;
            crit: boolean;
        }[];
        targets: {
            target_id: string;
            quality: number;
            ap: boolean;
            paracausal: boolean;
            halfDamage: boolean;
            bonusDamage: {
                type: string;
                val: string;
            }[];
            plugins: {
                [x: string]: Codec<C, O, I>;
            };
        }[];
    }, unknown>;
    constructor(obj: t.TypeOf<typeof DamageHudData.schemaCodec>);
    hydrate(runtimeData?: LancerItem | LancerActor): void;
    replaceTargets(ts: Token[]): DamageHudData;
    get raw(): {
        title: string;
        weapon: DamageHudWeapon | undefined;
        base: DamageHudBase;
        hitResults: DamageHudHitResult[];
        targets: DamageHudTarget[];
    };
    static fromObject(obj: DamageHudDataSerialized, runtimeData?: LancerItem | LancerActor): DamageHudData;
    toObject(): t.OutputOf<typeof DamageHudData.codec>;
    static plugins: DamageHudPlugin<DamageHudPluginData>[];
    static targetedPlugins: DamageHudPlugin<DamageHudPluginData>[];
    static registerPlugin<D extends DamageHudPluginData, P extends DamageHudPlugin<D>>(plugin: P): void;
    static getHitQuality(t: LancerToken, hitResults: DamageHudHitResult[]): HitQuality;
    getHitQuality(t: LancerToken): HitQuality;
    static fromParams(runtimeData?: LancerItem | LancerActor, data?: {
        tags?: Tag[];
        title?: string;
        targets?: LancerToken[];
        hitResults?: LancerFlowState.HitResult[];
        ap?: boolean;
        paracausal?: boolean;
        halfDamage?: boolean;
        starting?: {
            damage?: DamageData[];
            bonusDamage?: DamageData[];
        };
    }): DamageHudData;
}
export {};

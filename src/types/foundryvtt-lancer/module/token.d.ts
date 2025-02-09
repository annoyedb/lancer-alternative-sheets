declare global {
    interface DocumentClassConfig {
        Token: typeof LancerTokenDocument;
    }
    interface PlaceableObjectClassConfig {
        Token: typeof LancerToken;
    }
}
/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 * @extends {TokenDocument}
 */
export declare class LancerTokenDocument extends TokenDocument {
    static migrateData(source: any): any;
    _preCreate(...[data, options, user]: Parameters<TokenDocument["_preCreate"]>): Promise<void>;
    _onRelatedUpdate(update: any, options: any): void;
}
/**
 * Extend the base Token class to implement additional system-specific logic.
 * @extends {Token}
 */
export declare class LancerToken extends Token {
    constructor(document: LancerTokenDocument);
    /**
     * Cached occupied spaces
     */
    protected _spaces: {
        at: Point;
        spaces: Point[];
    };
    /**
     * Returns a Set of Points corresponding to the grid space center points that
     * the token occupies.
     */
    getOccupiedSpaces(): Point[];
}
export declare function extendTokenConfig(...[app, html, _data]: Parameters<Hooks.RenderApplication<TokenConfig>>): void;
export declare function un_derive_attr_key(key: string): string;
export declare function fix_modify_token_attribute(data: any): void;
declare global {
    interface FlagConfig {
        Token: {
            [game.system.id]?: {
                mm_size?: number | undefined;
            };
            "hex-size-support"?: {
                borderSize?: number;
                altSnapping?: boolean;
                evenSnap?: boolean;
                alwaysShowBorder?: boolean;
                alternateOrientation?: boolean;
                pivotx?: number;
                pivoty?: number;
            };
        };
    }
}

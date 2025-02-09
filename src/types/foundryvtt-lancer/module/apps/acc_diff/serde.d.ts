import * as t from "io-ts";
export declare function enclass<Raw, Klass extends {
    get raw(): Raw;
}, I, O>(codec: t.Type<Raw, O, I>, Constructor: new (bag: Raw) => Klass): t.Type<Klass, O, I>;
export declare function stateless<T>(name: string, predicate: t.Is<T>, synthesise: () => T): t.Type<T, null, unknown>;
export declare function encode<Raw, T>(t: T, codec: t.Type<T, Raw, any>): Raw;
export declare function decode<Raw, T>(r: Raw, codec: t.Type<T, Raw, any>): T;

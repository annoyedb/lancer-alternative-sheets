export declare const PENDING: unique symbol;
export declare class FetcherCache<K, V> {
    private readonly fetch_func;
    private readonly timeout;
    constructor(fetch_func: (arg: K) => Promise<V>, timeout?: number);
    protected cached_values: Map<K, Promise<V>>;
    protected cached_resolved_values: Map<K, V>;
    protected timeout_map: Map<K, number>;
    protected stroke_timer(key: K): void;
    peek(arg: K): V | null;
    fetch(key: K): Promise<V>;
    sync_fetch(key: K): V | typeof PENDING;
    has_resolved(arg: K): boolean;
    private cleanup;
    flush(arg: K): void;
    flush_all(): void;
}
/**
 * Specialized fetchercache that knows when a result is "bad", and will attempt to re-fetch it if ever that fetch fails.
 * The fetch function is provided with a second variable on retrys.
 */
export declare class RepentantFetcherCache<K, V> extends FetcherCache<K, V> {
    private readonly upgraded_fetch_func;
    private readonly miss_predicate;
    constructor(upgraded_fetch_func: (arg: K, retrying?: boolean) => Promise<V>, miss_predicate: (arg: V) => boolean, timeout?: number);
    fetch(key: K): Promise<V>;
}

/**
 * Watches for exact changes in its payload, detected by monitoring changes int its payload is stringified to JSON
 */
export declare class ChangeWatchHelper {
    prior_value: any;
    prior_string: string;
    curr_value: any;
    curr_string: string;
    isDirty: boolean;
    clean(): void;
    /**
     * Set the value, returning true (and marking self as "dirty") if its different from our initial value
     * Initial call will never mark dirty bit
     * @param to
     */
    setValue(to: any): boolean;
}
export declare function fixCCFormula(formula: string): string;
/**
 * Synchronously evaluates a roll in a version safe way
 * @param formula A dice formula
 * @param data Data to provide the dice formula, accessible via @
 * @returns The roll total
 */
export declare function rollEvalSync(formula: string, data: object): number;
export type TokenScrollTextOptions = {
    tokenId?: string;
    content?: string;
    style?: {
        anchor?: 0 | 1 | 2 | 3 | 4;
        direction?: 0 | 1 | 2 | 3 | 4;
        duration?: number;
        fontSize?: number;
        fill?: string | number | Array<string> | Array<number>;
        stroke?: number;
        strokeThickness?: number;
        jitter?: number;
    };
};
export declare function tokenScrollText({ tokenId, content, style }?: TokenScrollTextOptions, push?: boolean): Promise<void>;

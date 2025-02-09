import { FullBoundedNum } from "../../source-template";
import { PackedBondPowerData } from "../../util/unpacking/packed-types";
declare const fields: any;
export interface PowerData {
    name: string;
    description: string;
    unlocked: boolean;
    frequency: string | null;
    uses: FullBoundedNum | null;
    veteran: boolean;
    master: boolean;
    prerequisite: string | null;
}
export declare class PowerField extends fields.SchemaField {
    constructor(options?: {});
}
export declare function parsePowerUses(frequency: string | null | undefined): FullBoundedNum | null;
/**
 * Ensures that a power's "uses" field matches the frequency. If frequency is defined and uses is not, uses will be initialized.
 * If uses is already defined, its max will be set according to frequency.
 * @param power The power to work on
 * @returns The power with "uses" populated properly
 */
export declare function fixupPowerUses(power: PowerData): PowerData;
export declare function unpackPower(data: PackedBondPowerData): PowerData;
export {};

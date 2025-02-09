import type { HelperOptions } from "handlebars";
import { LancerMECH_SYSTEM } from "../item/lancer-item";
export declare function mechSystemViewHBS(system_path: string, helperOptions: HelperOptions, options?: {
    nonInteractive?: boolean;
}): string;
export declare function mechSystemView(doc: LancerMECH_SYSTEM, system_path: string | null, options?: {
    div?: boolean;
    nonInteractive?: boolean;
    vertical?: boolean;
}): string;
/** The loadout view for a mech
 * - Weapon mods
 * - .... system mods :)
 */
export declare function mechLoadout(options: HelperOptions): string;
export declare function pilotSlot(data_path: string, options: HelperOptions): string;
/**
 * Builds HTML for a frame reference. Either an empty ref to give a drop target, or a preview
 * with traits and core system.
 * @param frame_path  Path to the frame location
 * @param options      Standard helper options.
 * @return            HTML for the frame reference, typically for inclusion in a mech sheet.
 */
export declare function frameView(frame_path: string, core_energy: number, options: HelperOptions): string;

import type { LancerActor } from "../actor/lancer-actor";
import { PackedPilotData } from "../util/unpacking/packed-types";
type LegacyLancerActor = {
    name: string;
    data: {
        type: string;
        data?: {
            cc_ver?: string;
        };
    };
};
/**
 * LEGACY: Exports an actor into a compatible format for importing (faked C/C style).
 * @param actor actor to export to fake C/C data.
 * @param download whether to trigger an automatic download of the json file.
 * @returns the export in object form, or null if error occurred.
 */
export declare function handleActorExport(actor: LegacyLancerActor | LancerActor, download?: boolean): PackedPilotData | FakePackedNPC | null;
export declare function addExportButton(actor: LegacyLancerActor | LancerActor, html: JQuery): void;
type FakePackedNPC = {
    id: string;
    class: string;
    tier: number;
    name: string;
    labels: [];
    templates: string[];
    items: {
        itemID: string;
        tier: number;
        destroyed: false;
        charged: boolean;
        uses: number;
    }[];
    stats: object;
    currentStats: object;
    note: "";
    side: "Enemy";
    statuses: [];
    conditions: [];
    resistances: [];
    burn: number;
    overshield: number;
    destroyed: false;
    actions: number;
};
export declare function validForExport(actor: LegacyLancerActor | LancerActor): boolean;
export {};

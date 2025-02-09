import { PackedPilotData } from "../util/unpacking/packed-types";
import { LancerPILOT } from "./lancer-actor";
export declare function importCC(pilot: LancerPILOT, data: PackedPilotData, clearFirst?: boolean): Promise<void>;

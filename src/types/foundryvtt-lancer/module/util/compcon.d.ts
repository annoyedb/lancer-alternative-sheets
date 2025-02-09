import type { CachedCloudPilot } from "../interfaces";
import { PackedPilotData } from "./unpacking/packed-types";
export declare function cleanCloudOwnerID(str: string): string;
export declare function populatePilotCache(): Promise<CachedCloudPilot[]>;
export declare function pilotCache(): CachedCloudPilot[];
export declare function fetchPilotViaShareCode(sharecode: string): Promise<PackedPilotData>;
export declare function fetchPilotViaCache(cachedPilot: CachedCloudPilot): Promise<PackedPilotData>;
export declare function fetchPilot(cloudID: string, cloudOwnerID?: string): Promise<PackedPilotData>;

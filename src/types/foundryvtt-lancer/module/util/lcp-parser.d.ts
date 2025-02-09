/// <reference types="node" />
import { IContentPack } from "./unpacking/packed-types";
export declare const CORE_BREW_ID = "core";
export declare function parseContentPack(binString: Buffer | string): Promise<IContentPack>;
export declare function getBaseContentPack(): IContentPack;

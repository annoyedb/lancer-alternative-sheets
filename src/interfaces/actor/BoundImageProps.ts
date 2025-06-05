import type { Snippet } from "svelte";

export interface BoundImageProps
{
    children?: Snippet;
    image: string;
    uuid: string;
    // Note that an xyGetter is unnecessary
    xySetter?: (uuid: string, x: number, y: number) => void;
    yGetter?: (uuid: string) => number;
    ySetter?: (uuid: string, value: number) => void;
    xGetter?: (uuid: string) => number;
    xSetter?: (uuid: string, value: number) => void;
}
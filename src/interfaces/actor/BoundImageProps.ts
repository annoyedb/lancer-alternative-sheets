export interface BoundImageProps
{
    image: string;
    uuid: string;
    yGetter?: (uuid: string) => number;
    ySetter?: (uuid: string, value: number) => void;
}
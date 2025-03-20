export interface SidebarRatioSliderProps
{
    uuid: string;
    ratioGetter: (uuid: string) => number;
    ratioSetter: (uuid: string, value: number) => void;
}
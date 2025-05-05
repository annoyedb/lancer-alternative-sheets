export interface EffectBoxProps
{
    children?: any;

    name: string;
    effect?: string;
    hasFlow?: boolean;

    innerStyle?: Array<string>;
    outerStyle?: Array<string>;

    editOption?: boolean;
    editPath?: string;
}
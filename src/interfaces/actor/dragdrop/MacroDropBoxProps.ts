export interface MacroDropBoxProps
{
    uuid: string;
    getExes: Array<string>;
    setExes: (uuid: string, macros: Array<string>) => void;
    hintDropArea: boolean;
    allowDrop: boolean;
    iconStyle?: Array<string>;
    buttonStyle?: Array<string>;
}
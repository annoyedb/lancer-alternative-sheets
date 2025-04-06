export interface ThemeOverrideButtonProps
{
    uuid: string;
    setOverride: (uuid: string, value: string) => void;
    disabled?: boolean;
}
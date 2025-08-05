import { SheetStore } from '@/scripts/store/module-store';
import { ThemeKey } from '@/enums/ThemeKey';

export function getThemeKey(uuid: string): ThemeKey | string
{
    return SheetStore.get(uuid).currentTheme;
}

export function setThemeKey(uuid: string, theme: ThemeKey)
{
    SheetStore.set(uuid, { currentTheme: theme });
}
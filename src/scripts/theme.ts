import type { Document } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/module.mjs";

import "@/styles/boilerplate/override.scss";
import "@/styles/boilerplate/typography.scss";
import "@/styles/boilerplate/space.scss";
import "@/styles/boilerplate/misc.scss";
import "@/styles/boilerplate/display.scss";

import "@/styles/shared/flow.scss";
import "@/styles/shared/general.scss";
import "@/styles/shared/container.scss";
import "@/styles/shared/shape.scss";

import "@/styles/mech/body.scss";
import "@/styles/mech/header.scss";
import "@/styles/mech/sidebar.scss";
import "@/styles/mech/status.scss";
import "@/styles/mech/loadout.scss";
import "@/styles/mech/hase-display.scss";

import "@/styles/pilot/body.scss";
import "@/styles/pilot/header.scss";
import "@/styles/pilot/sidebar.scss";
import "@/styles/pilot/hase-display.scss";
import "@/styles/pilot/bond.scss"

import "@/styles/npc/header.scss";
import "@/styles/npc/body.scss";
import "@/styles/npc/hase-display.scss"

import "@/styles/color/_mixins.scss";
import "@/styles/color/la-colors.scss";
import "@/styles/color/open-color.scss";
import "@/styles/color/themes/common.scss";
import "@/styles/color/themes/gms.scss";
import "@/styles/color/themes/gmsdark.scss";
import "@/styles/color/themes/ipsn.scss";
import "@/styles/color/themes/ssc.scss";
import "@/styles/color/themes/galsim.scss";
import "@/styles/color/themes/msmc.scss";
import "@/styles/color/themes/ha.scss";
import "@/styles/color/themes/horus.scss";

import { ThemeKey } from "@/enums/ThemeKey";
import { slugify } from "@/scripts/lancer/util/lid";
import { getLocalized } from "@/scripts/helpers";
import { getSheetStore } from "@/scripts/store/module-store";

const THEME_MAP: Record<ThemeKey | string, string> = {
    [ThemeKey.GMS]: "la-gms",
    [ThemeKey.GMSDark]: "la-gmsdark",
    [ThemeKey.MSMC]: "la-msmc",
    [ThemeKey.GALSIM]: "la-galsim",
    [ThemeKey.HORUS]: "la-horus",
    [ThemeKey.HA]: "la-ha",
    [ThemeKey.SSC]: "la-ssc",
    [ThemeKey.IPSN]: "la-ipsn",
};

const LIGHT_MAP: Record<ThemeKey | string, "light" | "dark"> = {
    [ThemeKey.GMS]: "light",
    [ThemeKey.GMSDark]: "dark",
    [ThemeKey.MSMC]: "dark",
    [ThemeKey.GALSIM]: "dark",
    [ThemeKey.HORUS]: "dark",
    [ThemeKey.HA]: "dark",
    [ThemeKey.SSC]: "light",
    [ThemeKey.IPSN]: "light",
};

const THEME_LOCALIZE_MAP: Record<ThemeKey | string, string> = {
    [ThemeKey.GMS]: "LA.advanced.theme.gms.label",
    [ThemeKey.GMSDark]: "LA.advanced.theme.gmsDark.label",
    [ThemeKey.MSMC]: "LA.advanced.theme.msmc.label",
    [ThemeKey.GALSIM]: "LA.advanced.theme.galsim.label",
    [ThemeKey.HORUS]: "LA.advanced.theme.horus.label",
    [ThemeKey.HA]: "LA.advanced.theme.ha.label",
    [ThemeKey.SSC]: "LA.advanced.theme.ssc.label",
    [ThemeKey.IPSN]: "LA.advanced.theme.ipsn.label",
};

const THEME_LOCALIZE_HISTORY_MAP: Record<ThemeKey | string, string> = {
    [ThemeKey.GMS]: "LA.pilot.history.gms",
    [ThemeKey.GMSDark]: "LA.pilot.history.gms",
    [ThemeKey.MSMC]: "LA.pilot.history.msmc",
    [ThemeKey.GALSIM]: "LA.pilot.history.gms",
    [ThemeKey.HORUS]: "LA.pilot.history.horus",
    [ThemeKey.HA]: "LA.pilot.history.ha",
    [ThemeKey.SSC]: "LA.pilot.history.ssc",
    [ThemeKey.IPSN]: "LA.pilot.history.ipsn",
};

export function getDocumentTheme(uuid: string)
{
    const { currentTheme } = getSheetStore(uuid);
    console.log(currentTheme);
    return currentTheme ? THEME_MAP[currentTheme] : getSystemTheme();
}

export function getSystemTheme()
{
    const currentTheme = game.settings.get("lancer", "uiTheme") as string;
    return THEME_MAP[currentTheme];
}

export function getBrightness(theme?: ThemeKey | string): "light" | "dark"
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    return LIGHT_MAP[selectedTheme];
}

export function getThemeName(theme?: ThemeKey | string)
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    return getLocalized(THEME_LOCALIZE_MAP[selectedTheme]);
}

export function getThemeHistoryLabel(theme?: ThemeKey | string)
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    return getLocalized(THEME_LOCALIZE_HISTORY_MAP[selectedTheme]);
}

// Yes, this is basically just a theme picker for the sidebar
// No, it does not deal with the dark themes, because they apparently already have good contrasting colors
// Yes, this is biased
// No, I'm not sorry
//
// 'la-icon-swap' is a class used to identify items with classes that need to be checked 
// against the current LIGHT_MAP theme
// As of this moment this isn't really utilized due to a rewrite that happened a while back, but its kept here just in case someone else needs it? idk. The correct class is redetermined because we call a rerender on theme changes now
export function getSidebarImageTheme(type: "bckg" | "text" | "brdr", theme?: string)
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    const isLightTheme = LIGHT_MAP[selectedTheme] === "light";
    return `la-icon-swap ${isLightTheme ? `la-${type}-primary` : `la-${type}-text`}`;
}

export function getManufacturerColor(key: ThemeKey | string, type: "bckg" | "text" | "brdr" | "anim")
{
    let manufacturer = slugify(key, "-");

    if (!["gms", "ips-n", "ipsn", "ssc", "horus", "ha", "msmc", "galsim"].includes(manufacturer))
    {
        manufacturer = "primary";
    }

    if (manufacturer === "ips-n")
        manufacturer = "ipsn";
    if (manufacturer === "gmsdark")
        manufacturer = "gms";
    return `la-${type}-${manufacturer}`;
}

export function applyThemeTo(html: JQuery<HTMLElement>, theme?: ThemeKey | string)
{
    const selectedtheme = theme || game.settings.get("lancer", "uiTheme") as string;

    const themeClasses = Object.values(THEME_MAP);
    html.removeClass(themeClasses.join(' ')).addClass(THEME_MAP[selectedtheme]);
}

export function applyThemeToImages(html: JQuery<HTMLElement>)
{
    const currentTheme = game.settings.get("lancer", "uiTheme") as string;
    const isDarkTheme = LIGHT_MAP[currentTheme] === "dark";

    // Swap images
    html.find('img').each(function ()
    {
        const img = $(this);
        const src = img.attr('src');
        if (src && src.startsWith('systems/lancer/assets/icons'))
        {
            if (isDarkTheme && !src.includes('white'))
                img.attr('src', src.replace('systems/lancer/assets/icons', 'systems/lancer/assets/icons/white'));
            else if (!isDarkTheme && src.includes('white'))
                img.attr('src', src.replace('systems/lancer/assets/icons/white', 'systems/lancer/assets/icons'));
        }
    });
}

export function applyThemeToMarkedIcons(html: JQuery<HTMLElement>)
{
    const currentTheme = game.settings.get("lancer", "uiTheme") as string;
    const isDarkTheme = LIGHT_MAP[currentTheme] === "dark";

    // Swap classes marked by la-icon-swap
    html.find('.la-icon-swap').each(function ()
    {
        const element = $(this);
        const classes = element.attr('class')?.split(' ') || [];
        classes.forEach(cls =>
        {
            const isDarkClass = cls.startsWith('lancer-') && cls.endsWith('-dark');
            const isPrimaryClass = cls.startsWith('la-') && cls.endsWith('-primary');
            if (isDarkClass || isPrimaryClass)
            {
                const baseClass = cls.replace(/^(lancer-|la-)|(-dark|-primary)$/g, '');
                const newClass = isDarkTheme ? `lancer-${baseClass}-dark` : `la-${baseClass}-primary`;
                element.removeClass(cls).addClass(newClass);
            }
        });
    });
}
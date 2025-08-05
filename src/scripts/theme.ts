/**
 * Q: Why not put these in the Svelte components themselves?
 * A: Foundry (as of V12) has a lot of quirks when not using their prescribed workflow (e.g. not Svelte).
 *      So rather than fight the Foundry system at every turn, accomodate it where we can and use Svelte for things Foundry's tech stack does not support (e.g. reactivity).
 *      The second reason is that Svelte does a separate transpilation of CSS declared on its components, which minimizes CSS conflicts but comes with the caveat of 
 *      not being able to easily predict class names and such, which makes it harder for say example, we were to open the CSS to be available for use by other modules or systems.
 *      The third reason is that CSS it's easier to maintain and reuse CSS this way by virtue of being more easily managed by IDEs.
 */
import "@/styles/shared/_mixins.scss";
import "@/styles/shared/override.scss";
import "@/styles/shared/typography.scss";
import "@/styles/shared/space.scss";
import "@/styles/shared/misc.scss";
import "@/styles/shared/display.scss";
import "@/styles/shared/pointer.scss";
import "@/styles/shared/glow.scss";
import "@/styles/shared/flow.scss";
import "@/styles/shared/general.scss";
import "@/styles/shared/container.scss";
import "@/styles/shared/shape.scss";
import "@/styles/shared/background.scss";
import "@/styles/shared/shadow.scss";
import "@/styles/shared/component.scss";

import "@/styles/actor/responsive.scss"
import "@/styles/actor/header.scss"
import "@/styles/actor/body.scss";
import "@/styles/actor/sidebar.scss"

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

import "@/styles/deployable/header.scss";
import "@/styles/deployable/body.scss";

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

import { ThemeKey, ThemeValue } from "@/enums/ThemeKey";
import { slugify } from "@/scripts/lancer/util/lid";
import { getLocalized } from "@/scripts/helpers";
import { SheetStore } from "@/scripts/store/module-store";

const THEME_MAP: Record<ThemeKey | string, ThemeValue> = {
    [ThemeKey.GMS]: ThemeValue.GMS,
    [ThemeKey.GMSDark]: ThemeValue.GMSDark,
    [ThemeKey.MSMC]: ThemeValue.MSMC,
    [ThemeKey.GALSIM]: ThemeValue.GALSIM,
    [ThemeKey.HORUS]: ThemeValue.HORUS,
    [ThemeKey.HA]: ThemeValue.HA,
    [ThemeKey.SSC]: ThemeValue.SSC,
    [ThemeKey.IPSN]: ThemeValue.IPSN,
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

/**
 * Translates the keys stored by this module into their CSS class
 * @param key e.g. `gms` or `gmsDark`
 * @returns CSS class as a `ThemeValue` enum value (e.g. `la-gms` or `la-gmsdark`)
 */
export function convertToCSSTheme(key: ThemeKey | string): ThemeValue
{
    return THEME_MAP[key];
}

/**
 * Get a document's CSS theme
 * @param uuid document UUID
 * @returns CSS class as a `ThemeValue` enum value (e.g. `la-gms` or `la-gmsdark`)
 */
export function getCSSDocumentTheme(uuid: string): ThemeValue
{
    const { currentTheme } = SheetStore.get(uuid);
    return currentTheme ? THEME_MAP[currentTheme] : getCSSSystemTheme();
}

/**
 * Get the Lancer system's CSS theme
 * @returns CSS class as a `ThemeValue` enum value (e.g. `la-gms` or `la-gmsdark`)
 */
export function getCSSSystemTheme(): ThemeValue
{
    const currentTheme = game.settings.get("lancer", "uiTheme") as string;
    return THEME_MAP[currentTheme];
}

/**
 * Determine the theme as 'light' or 'dark'
 * @param theme 
 * @returns 
 */
export function getBrightness(theme?: ThemeKey | string): "light" | "dark"
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    return LIGHT_MAP[selectedTheme];
}

/**
 * Get the theme name localized to their title
 * @param theme 
 * @returns 
 */
export function getThemeName(theme?: ThemeKey | string)
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    return getLocalized(THEME_LOCALIZE_MAP[selectedTheme]);
}

/**
 * Get the localized flavor-text label (appears in pilot dossier) 
 * @param theme 
 * @returns 
 */
export function getThemeHistoryLabel(theme?: ThemeKey | string)
{
    const selectedTheme = theme || game.settings.get("lancer", "uiTheme") as string;
    return getLocalized(THEME_LOCALIZE_HISTORY_MAP[selectedTheme]);
}

export function getManufacturerColor(key: ThemeKey | string, type: "bckg" | "text" | "brdr" | "prmy")
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
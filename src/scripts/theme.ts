import "@/styles/_mixins.scss";

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

import "@/styles/pilot/loadout.scss";

import "@/styles/npc/header.scss";
import "@/styles/npc/body.scss";
import "@/styles/npc/hase-display.scss"

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
import { slugify } from "./lancer/util/lid";

const THEME_MAP: { [key: string]: string } = {
    "gms": "la-gms",
    "gmsDark": "la-gmsdark",
    "msmc": "la-msmc",
    "gal": "la-galsim",
    "horus": "la-horus",
    "ha": "la-ha",
    "ssc": "la-ssc",
    "ipsn": "la-ipsn",
};

const LIGHT_MAP: { [key: string]: "light" | "dark" } = {
    "gms": "light",
    "gmsDark": "dark",
    "msmc": "dark",
    "gal": "dark",
    "horus": "dark",
    "ha": "dark",
    "ssc": "light",
    "ipsn": "light",
};

export function getTheme()
{
    let currentTheme = game.settings.get("lancer", "uiTheme") as string;
    return THEME_MAP[currentTheme];
}

// Yes, this is basically just a theme picker for the sidebar
// No, it does not deal with the dark themes, because they apparently already have good contrasting colors
// Yes, this is biased
// No, I'm not sorry
export function getSidebarImageTheme(type: "bckg" | "text" | "brdr")
{
    let currentTheme = game.settings.get("lancer", "uiTheme") as string;
    if (LIGHT_MAP[currentTheme] === "light")
        return `la-${type}-primary`
    else
        return `lancer-${type}-dark`;
}

export function applyThemeTarget(html: JQuery<HTMLElement>)
{
    let currentTheme = game.settings.get("lancer", "uiTheme") as string;
    const themeClasses = Object.values(THEME_MAP);
    
    html.removeClass(themeClasses.join(' ')).addClass(THEME_MAP[currentTheme]);
}

export function applyTheme(_app: any, _html: JQuery<HTMLElement>, _context: any)
{
    let currentTheme = game.settings.get("lancer", "uiTheme") as string;
    const themeClasses = Object.values(THEME_MAP);
    $(document).find('*').each(function ()
    {
        const element = $(this);
        const currentThemeClass = themeClasses.find(themeClass => element.hasClass(themeClass));
        if (currentThemeClass)
        {
            element
                .removeClass(currentThemeClass)
                .addClass(THEME_MAP[currentTheme]);
        }
    });
}

export function getBrightness(): "light" | "dark"
{
    let currentTheme = game.settings.get("lancer", "uiTheme") as string;
    return LIGHT_MAP[currentTheme];
}

export function getManufacturerColor(key: string, type: "bckg" | "text" | "brdr")
{
    let manufacturer = slugify(key, "-");

    if (!["gms", "ips-n", "ssc", "horus", "ha"].includes(manufacturer))
    {
        manufacturer = "primary";
    }
    
    if (manufacturer === "ips-n")
        manufacturer = "ipsn";
    return `la-${type}-${manufacturer}`;
}
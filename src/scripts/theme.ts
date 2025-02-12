import "../styles/open-color.scss";
import "../styles/la-boilerplate.scss";
import "../styles/la-colors.scss";
import "../styles/la-shared.scss";
import "../styles/_mixins.scss";

import "../styles/mech/body.scss";
import "../styles/mech/header.scss";
import "../styles/mech/sidebar.scss";
import "../styles/mech/status.scss";
import "../styles/mech/loadout.scss";
import "../styles/pilot/loadout.scss";

import "../styles/themes/common.scss";
import "../styles/themes/gms.scss";
import "../styles/themes/gmsdark.scss";
import "../styles/themes/ipsn.scss";
import "../styles/themes/ssc.scss";
import "../styles/themes/galsim.scss";
import "../styles/themes/msmc.scss";
import "../styles/themes/ha.scss";
import "../styles/themes/horus.scss";
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

const LIGHT_MAP: { [key: string]: string } = {
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

export function getBrightness()
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
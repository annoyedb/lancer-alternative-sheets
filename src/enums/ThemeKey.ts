
/**
 * ThemeKey are direct reflections of the Lancer system's keys (e.g. `game.settings.get("lancer", "uiTheme")` will return one of these values)
 */
export enum ThemeKey
{
    /**
     * GMS - General Massive Systems (default theme)
     */
    GMS = "gms",

    /**
     * GMSDark - Dark variant of the GMS theme
     */
    GMSDark = "gmsDark",

    /**
     * MSMC - Mirrorsmoke Mercenary Company
     */
    MSMC = "msmc",

    /**
     * GALSIM - Forecast/Galactic Simulation
     */
    GALSIM = "gal",

    /**
     * HORUS - HORUS
     */
    HORUS = "horus",

    /**
     * HA - Harrison Armory
     */
    HA = "ha",

    /**
     * SSC - Smith-Shimano Corpro
     */
    SSC = "ssc",

    /**
     * IPSN - IPS-Northstar
     */
    IPSN = "ipsn",
}

/**
 * ThemeValue are the Lancer system's themes converted to the Alternative Sheets module CSS classes
 */
export enum ThemeValue
{
    
    /**
     * GMS - General Massive Systems (default theme)
     */
    GMS = "la-gms",

    /**
     * GMSDark - Dark variant of the GMS theme
     */
    GMSDark = "la-gmsdark",

    /**
     * MSMC - Mirrorsmoke Mercenary Company
     */
    MSMC = "la-msmc",

    /**
     * GALSIM - Forecast/Galactic Simulation
     */
    GALSIM = "la-gal",

    /**
     * HORUS - HORUS
     */
    HORUS = "la-horus",

    /**
     * HA - Harrison Armory
     */
    HA = "la-ha",

    /**
     * SSC - Smith-Shimano Corpro
     */
    SSC = "la-ssc",

    /**
     * IPSN - IPS-Northstar
     */
    IPSN = "la-ipsn",
}
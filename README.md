# Lancer Alternative Sheets
This is a module for [Foundry Virtual Tabletop](https://foundryvtt.com/) and the [unofficial Lancer game system](https://github.com/Eranziel/foundryvtt-lancer) to provide alternative 'play-focused' sheets for the tabletop game Lancer by Massif Press.

It is designed to be a player-facing sheet that provides most of the functionality carried over from the original sheet, providing an immersive and convenient way to interact with the Lancer system, a simple-to-understand responsive layout, and compatibility with the modules that handle event rerouting to other windows, such as the [PopOut! module](https://github.com/League-of-Foundry-Developers/fvtt-module-popout).

<details markdown="1">
  <summary>
    <h4>General Massive Systems (GMS)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/GMS.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>General Massive Systems Dark (GMS-Dark)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/GMS-Dark.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>IPS-Northstar (IPS-N)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/IPS-N.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>Smith-Shimano Corpro (SSC)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/SSC.png"/>
  </div>
</details>
<details>
  <summary>
    <h4>HORUS</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/HORUS.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>Harrison Armory (HA)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/HA.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>Mirrorsmoke Mercenary Company (MSMC)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/MSMC.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>Forecast/Galactic Sumulation (GALSIM)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/GALSIM.png"/>
  </div>
</details>
<details markdown="1">
  <summary>
    <h4>NPC Sheets (GMS)</h4>
  </summary>
  <div align="center">
    <img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/NPC.png"/>
  </div>
</details>

## Installation
This module can be installed:
* using the Foundry module installer
* through the latest manifest link - `https://github.com/annoyedb/lancer-alternative-sheets/releases/latest/download/module.json`
* downloaded and installed manually (from module.zip) found in the [Releases](https://github.com/annoyedb/lancer-alternative-sheets/releases) page

## Using the sheet
To use the sheet, you must select the "Sheet" configuration (to the left of "Close" in the image above) in the selected actor sheet and select "lancer.LASMechSheet" to override the default sheet or to act as the new default sheet.

At the moment, the sheet only provides *most* of the functionality *--not all of it--* so it is not recommended to set this sheet as the default.

## Development
This module currently uses Svelte 5 to render overtop of the Lancer system's current implementation of Application by mounting overtop of a Handlebars div. As such it does not extend from Application but from Lancer's ActorSheets, making it fully interchangeable between the Lancer included sheets.

### Building
This project uses [Vite](https://vite.dev/guide/) to build and package the module and makes use of it's HMR feature for development.

To set up hot-reloading, first build the module, then symlink the dist folder into your foundry data folder as `modules/lancer-alternative-sheets`. 
Make sure your Foundry Virtual Tabletop server is running and have the ['Hot-Reload Package Files' enabled](/docs/HotReload.png) in your Foundry settings, run `yarn serve` at the module development folder and your browser will automatically open to the Vite development server.

Now any changes to `.hbs` templates, `.json` localization files, and source code will automatically load into Foundry development server.

Some things to note: 
* [module manifests](/dist/module.json) may become 'stale' if adding anything new that is declared in them, in which case Foundry (and by extension the Vite server) needs to be returned to the Setup menu to reload the manifest.
* events newly assigned to Svelte components (e.g. on:click/onclick) will not be assigned until a manual refresh

Included is a (probably) outdated bunch of type definitions generated from [foundryvtt-lancer](https://github.com/Eranziel/foundryvtt-lancer), but aside from some globally defined constants I haven't found a way to get Vite to roll-up the definitions in a working build.

Contact me if you know how. :eye::lips::eye:

### Contributing
Contributions are welcome and issues can be posted [here](https://github.com/annoyedb/lancer-alternative-sheets/issues/) or tagging me (`annoying`) in the Lancer Discord (AKA Pilot NET).

Please take a look at the [change log](/CHANGELOG.md) and/or [issues page](https://github.com/annoyedb/lancer-alternative-sheets/issues/) to see currently the known issues first.

### Acknowledgements
* [League of Foundry Developers](https://github.com/League-of-Foundry-Developers/foundry-vtt-types) - Type definitions for Foundry
* [COMP/CON](https://github.com/massif-press/compcon) - [Color themes](./src/styles/themes/), design inspiration, and [some assets](./src/assets/)
* [foundryvtt-lancer](https://github.com/Eranziel/foundryvtt-lancer) - Original source reference for module development and module support
* Material Design Icons, Font Awesome - Some icons

## License
[GPL](/LICENSE.md)

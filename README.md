# Lancer Alternative Sheets
This is a module for [Foundry Virtual Tabletop](https://foundryvtt.com/) and the [unofficial Lancer game system](https://github.com/Eranziel/foundryvtt-lancer) to provide alternative player-directed sheets for the tabletop game Lancer by Massif Press.

<details markdown="1">
  <summary>Sheet/Theme Previews</summary>
  <details markdown="1">
    <summary>GMS</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/GMS.png?raw=true"/>
  </details>
  <details markdown="1">
    <summary>IPS-N</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/IPS-N.png?raw=true"/>
  </details>
  <details markdown="1">
    <summary>SSC</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/SSC.png?raw=true"/>
  </details>
  <details markdown="1">
    <summary>HORUS</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/HORUS.png?raw=true"/>
  </details>
  <details markdown="1">
    <summary>HA</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/HA.png"/>
  </details>
  <details markdown="1">
    <summary>MSMC</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/MSMC.png?raw=true"/>
  </details>
  <details markdown="1">
    <summary>GALSIM</summary>
    <img src="https://github.com/annoyedb/lancer-alternative-sheets/blob/master/docs/GALSIM.png?raw=true"/>
  </details>
</details>

## Building
This module uses [Vite](https://vite.dev/guide/) to build package the module.  To set up hot reloading, first build the module, then symlink the dist folder into you foundry data folder as `modules/lancer-alternative-sheets`.  Once the link is set up, run `yarn serve` with foundry running, and your browser will open to the vite dev server.  And changes to hbs files or language json files will be picked up and changes to the source files will automatically reload foundry.

Included is a (probably) outdated bunch of type definitions generated from [foundryvtt-lancer](https://github.com/Eranziel/foundryvtt-lancer), but aside from some globally defined constants I haven't found a way to get Vite to roll-up the definitions in a working build.

Contact me if you know how. :eye::lips::eye:

## Installation
This module can be installed using the Foundry module installer.

## Using the sheet
To use the sheet, you must select the "Sheet" configuration (to the left of "Close" in the images above) in the selected actor sheet and select "lancer.LASMechSheet" to override the default sheet or to act as the new default sheet.

At the moment, the sheet only provides most of the functionality --not all of it-- so it is not recommended to set this sheet as the default

## Contributing
Contributions are welcome and issues can be posted here or tagging me (`annoying`) in the Lancer Discord (AKA Pilot NET).

Please take a look at the [change log](/CHANGELOG.md) to see currently the known issues first.

## Acknowledgements
* [League of Foundry Developers](https://github.com/League-of-Foundry-Developers/foundry-vtt-types) - Type definitions for Foundry
* [COMP/CON](https://github.com/massif-press/compcon) - [Color themes](./src/styles/themes/), design inspiration, and [some assets](./src/assets/)
* [foundryvtt-lancer](https://github.com/Eranziel/foundryvtt-lancer) - Original source reference for module development and module support
* Material Design Icons, Font Awesome - Some icons

## License
[GPL](/LICENSE.md)

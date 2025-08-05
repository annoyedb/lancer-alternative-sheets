# Lancer Alternative Sheets
This is a module for [Foundry Virtual Tabletop](https://foundryvtt.com/) and the [unofficial Lancer game system](https://github.com/Eranziel/foundryvtt-lancer) to provide alternative 'play-focused' sheets for the tabletop game Lancer by Massif Press.

It is designed to be a player-facing sheet that provides all of the functionality carried over from the original sheet, providing an immersive and convenient way to interact with the Lancer system, and a simple-to-understand responsive layout.

While the main goal was to provide aesthetic alternative sheets to the Lancer system, there are many functional features included as well:

* per-sheet sheet configuration/customization
* reminders on ruling for statuses, stats, and some actions; useful for new players in particular
* view/remove applied status effects
* run/add/remove macros to the sheet
* 'action log' that filters the sheet actor's actions into their own log
* counter/clock display on talents, core bonuses, and frame traits
* more detailed send-to-chat for various Lancer items (such as weapons and NPC features)
* configure and display bond, token, and actor art separately (also supports animated token display in the sheets)

In addition to the above:
* player mech sheets display some useful pilot sheet items such as core bonuses and pilot talents.
* player mech sheets and pilot sheets feature a sidebar where useful stats are always easily accessed at a glance
* deployable sheets list all their available actions and activations

### Pilot Sheets
<img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/pilot-sheets.webp" style="display: block; margin-left: auto; margin-right: auto;"/>

### Mech Sheets
<img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/mech-sheets.webp" style="display: block; margin-left: auto; margin-right: auto;"/>

### NPC Sheets
<img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/npc-sheets.webp" style="display: block; margin-left: auto; margin-right: auto;"/>

### Deployable Sheets
<img src="https://raw.githubusercontent.com/annoyedb/lancer-alternative-sheets/refs/heads/master/docs/deployable-sheets.webp" style="display: block; margin-left: auto; margin-right: auto;"/>

## Installation
This module can be installed:
* using the Foundry module installer
* through the latest manifest link - `https://github.com/annoyedb/lancer-alternative-sheets/releases/latest/download/module.json`
* downloaded and installed manually (from module.zip) found in the [Releases](https://github.com/annoyedb/lancer-alternative-sheets/releases) page

This module is supported on Foundry V11 (Lancer 2.4.3 - 2.5.0) and Foundry V12 (Lancer 2.6.0 - 2.11.x). 

If you are on a supported version but the last-verified version does not match, it is because the last-verified version is whatever my campaign is currently using. :eyes:

## Using the sheet
To use the sheet, you must select the "Sheet" configuration (to the left of "Close" in the images above) in the selected actor sheet and select "Alternative `<Type>` Sheet" to override the default sheet or to act as the new default sheet.

The implemented sheets are as follows:
* Pilot sheets
* Mech sheets
* NPC sheets
* Deployable sheets

## Frequently Asked Questions
**Q: How do I roll a weapon/system?**
A: For rollable items, such as weapons or systems there's an icon with the background of a D20 in it, that glows slightly. You can press this to roll your weapon. If you have suggestions on how to make this more obvious so this question doesn't need to be asked, please make an inquiry in the [issues page](https://github.com/annoyedb/lancer-alternative-sheets/issues/) or directly to me on Discord!

**Q: How do I change my system theme?**
A: To change the global system theme, change the LANCER system theme by going to Game Settings -> Configure Settings -> LANCER -> UI Theme. This setting is per-client, but all sheets will reflect this setting by default.

**Q: How do I change the theme of a single sheet?**
A: To override or set a fixed theme per-sheet, you can activate the 'advanced toggle' in the sheet (in the sheet itself, typically near the top) and find a notebook symbol. This setting is synced across all clients.

**Q: How do I enable sensors or the tech attack stat on my sheet?**
A: Rules-as-written for Lancer, player pilots do not have tech attacks, and by extension have no use for either stat, excepting the 'Search' action, which states an explicit range of 5. If you wish to enable the display of these stats on the pilot sheets anyway and you are a GM, you can do so in the settings page of this module.

**Q: What is the difference between the image on the sidebar (side) and the image shown on the header (top)?**
A: Functionally, the image on the sidebar is the token (or prototype token) art and the image on the header is the actor art. In layman's the side image is what appears when you drag a token onto a scene or your 'play token' on Foundry and the top is the image that appears on the actor list or your 'main art' for your character (and is often used by modules such as [Carousel Combat Tracker](https://foundryvtt.com/packages/combat-tracker-dock) among many others to represent your character over the token)

**Q: Help something broke and I need to wipe the module's settings data!**
A: In the event that for some reason you need to completely reset this module's settings data there are some functions that I've written that can help with that
```
resetMechSheetLocalData(uuid?: string);
resetMechSheetData(uuid?: string);
resetNPCSheetData(uuid?: string);
resetPilotSheetLocalData(uuid?: string);
resetPilotSheetData(uuid?: string);
resetDeployableSheetData(uuid?: string);
```
You can open a browser's console to access these functions. For example, to reset pilot sheet data for the pilot (header img offsets, theme override, macros, and bond image source) with a UUID of `'Actor.WxLln2hSz8EtXcLc'` (it's often just "Actor." + "ID of your actor", accessible within Foundry's native UI) would be to use `resetPilotSheetData` so the command would be: `game.modules.get("lancer-alternative-sheets").api.settings.resetPilotSheetData('Actor.WxLln2hSz8EtXcLc')`. Not defining a UUID will clear all pilot data rather than a specific one. If this sounds too technical for you, I don't recommend you fiddling with these commands and instead contacting me on PilotNET.

## Development
This module uses Svelte 5 to render overtop of the Lancer system's current implementation of Application by mounting overtop of a Handlebars div. As such it does not extend from Application but from Lancer's ActorSheets, making it fully interchangeable between the Lancer included sheets, while allowing the reactive rendering and maintainability of using Svelte.

This module uses MessagePack to serialize settings data before it gets saved to the database.

### Building
This project uses [Vite](https://vite.dev/guide/) to build and package the module and makes use of it's HMR feature for development.

To set up hot-reloading, first build the module, then symlink the dist folder into your foundry data folder as `modules/lancer-alternative-sheets`. 
Make sure your Foundry Virtual Tabletop server is running and have the ['Hot-Reload Package Files' enabled](/docs/HotReload.png) in your Foundry settings, run `yarn serve` at the module development folder and your browser will automatically open to the Vite development server.

Now any changes to `.hbs` templates, `.json` localization files, and source code will automatically load into Foundry development server.

Some things to note: 
* [module manifests](/dist/module.json) may become 'stale' if adding anything new that is declared in them, in which case Foundry (and by extension the Vite server) needs to be returned to the Setup menu to reload the manifest.
* events newly assigned to Svelte components (e.g. on:click/onclick) may not be assigned until a manual refresh
* localization strings are cached, so require a refresh to display changes

Included is a (probably) outdated bunch of type definitions generated from [foundryvtt-lancer](https://github.com/Eranziel/foundryvtt-lancer), but aside from some globally defined constants I haven't found a way to get Vite to roll-up the definitions in a working build.

Contact me if you know how. :eye::lips::eye:

### Contributing
Contributions are welcome and issues can be posted [here](https://github.com/annoyedb/lancer-alternative-sheets/issues/) or tagging me (`annoying`) in the Lancer Discord (AKA Pilot NET).

Please take a look at the [change log](/CHANGELOG.md) and/or [issues page](https://github.com/annoyedb/lancer-alternative-sheets/issues/) to see currently the known issues first.

The sheet utilizes [Foundry's localization implementation](https://foundryvtt.com/article/localization/) to display text. If you wish to contribute to localization for a language and help accommodate for players of a non-English speaking community, I am always open to pull requests!

If you are looking to contribute to localization but do not have the technical experience to know where to start, please contact me on Pilot NET!

### Acknowledgements
* [League of Foundry Developers](https://github.com/League-of-Foundry-Developers/foundry-vtt-types) - Type definitions for Foundry
* [COMP/CON](https://github.com/massif-press/compcon) - [Color themes](./src/styles/themes/), design inspiration, and [some assets](./src/assets/)
* [foundryvtt-lancer](https://github.com/Eranziel/foundryvtt-lancer) - Original source reference for module development and module support
* Material Design Icons, Font Awesome - Some icons

## License
[GPL](/LICENSE.md)

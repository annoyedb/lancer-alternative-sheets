# 1.0.0 - Hello World!
This is the initial release of the Lancer Alternative Sheets module.

And my issues list is already bigger than my change list.
## Changes
* It exists now
* [PopOut!](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) (and likely some others, such as printing modules) are compatible with this sheet's version of collapsible headers
* All [COMP/CON](https://github.com/massif-press/compcon) themes are supported in this module. `foundryvtt-lancer`'s 'GMS Dark' theme is not currently supported
## Known Issues
* Deleting more than one ActiveEffect without rerendering the document throws an error. Cosmetic only but nonetheless annoying --if anyone knows a fix please let me know
* Changing themes while the sheet is open does not change fully change the sheet's theme without reopening it again. I need to hook into when Lancer changes its theme settings, so if anyone knows how to do this please let me know
* 'editable' actions, 'bonuses', and 'weapon profiles' are not styled and frame deployables (different from system deployables) are not implemented. Not sure if they're even fully implemented in the Lancer system or what they even are
* Some things that should have input boxes in the main content (e.g. the 'status' tab: overcharge, structure, and stress) but aren't there. There is an issue where when reading a number data type in the Lancer system and there is more than one of the same uuid, it will throw an value type error. I suspect its received an array, when it expected a single value, but I haven't looked at the code
* Activations (Full, Quick, etc) aren't mapped to use localized values. Neither are the names or descriptions of talents, weapons, mods, etc.
* No warnings yet if your loadout is illegal (e.g. two main weapons on a flex slot)
* Some Lancer classes, types, and functions are repackaged with this module (only used by these sheets though) and it feels wholely unnecessary. If anyone knows how to get references to the actual classes/methods/types/functions used in the Lancer module please let me know. I tried getting vite to export types from the foundryvtt-lancer codebase but it's giving me rollup issues unless they're all defined in the global namespace `and I'm not doing that by hand`
* It's called "sheets" but there's only one sheet :eyes: `so what? you wanna fight???`
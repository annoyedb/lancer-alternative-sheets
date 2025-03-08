# 1.1.2
## Changes
* #13 - Fixed paths on Frames leading to incorrect type defaulting to LancerActor type rather than LancerItem type for counters and tags when drilldownDocument is called. Thanks @Hexling4!
* Removed remnants of old styling references from deployables and frames on mech sheets. Mech sheets should now be fully homogeneous in stylings with one another

# 1.1.1
## Changes
* Added missing techs section for NPC sheets
* Added missing charge tag check
* Fixed loading tag check

# 1.1.0 - Little Big Changes
ᕕ( ᐛ )ᕗ New `minor` version, new sheet, `new me`

NPC sheets have been added. This minor version (1.1.x) will be the last minor version for v11. Patches will still be released fixing major bugs as they are found and minor bugs if I find the time. 

Major bugs are anything preventing use of a feature on a sheet. (e.g. the first three points of the Known Bugs section)
Minor bugs are anything has accessible and immediate work-arounds.

Disclaimer that I still have an active campaign on V11, so this is likely where this sheet will 'officially' be for a little bit

## Changes
* #10 - Added a collapse/expand-all button to the side of main headers in the loadout tab (each mount, systems, frame, etc) which toggle between the two states on all children of the header, as well as the active effects header in the status tab
* #11 - Added weapon names to the side of weapon mounts to account for cases where a Lancer may have 4 integrated mounts to better distinguish mounts from another `achieving peace through patience, understanding, and these four guns i found`
* Added Svelte framework to dependency requirements and reimplemented the mech sheet using Svelte. On the surface, it appears like the mech sheet hardly changed, and it should! If any `negative` discrepancies are found to existing features, let me know
* Added an NPC sheet designed to be as compact as possible. I hope it helps you GMs run those sitreps with 4 different grunts, the ultra, and the damageable McGuffin `and finally a sheet i'll actually use`
* Theme changes can now be (mostly) applied without having to reopen the sheets! (See known issues for more details)
* Tooltips have received a face-lift! And where applicable display the type of action (e.g. Full Action, Quick Action, etc) or some relevant Lancer-system keyword
* Added collapsibility to the status tab and individual actions --that's all of them now for mech sheets!
* Macro/flow buttons no longer overflow into new lines, giving a more consistent UX
* Fixed a critical error where Active Effects would never display since the value it was checking for did not exist from a patch added in 1.0.4 onwards `i am literally cascading`
* Indirectly fixed thrown error when deleting Active Effects from moving to Svelte; was likely because of a missed `event.stopPropogation()` or maybe it wasn't. `i don't know and it's not my problem anymore`
* Fixed an issue where the "Full Repair" button did nothing because of an incorrect flow type definition
* Fixed a bug where having a frame deployable would display all deployables owned by that actor, rather than just the deployables relevant to the frame `give me a scenario where Hydra isn't a pain in everyone's ass`
* Deployables are not items, so they can't be linked to preexisting flows (e.g. chat-activation-flow); deployable actions now reflect that and don't do anything (for now --though they do give a hover-over tooltip). But deployable icon can be dragged to the map to place it! A glow and tooltip has been added to assist in relaying this utility
* Custom counters added through the system's "Custom Counter" editable are now supported in the alternative sheets for mech weapon mods, and mech systems, frame cores, and frame traits, core bonuses, and pilot talents
* Added missing data path for Core Bonus hamburger button
* Compacted main collapsables more closely together
* Added hex background to roll-attacks/glow to HASE rolls for design consistency and hopefully suggest rollability right-away :eyes:
* Restyled Pilot Talents to be a little more distinguishable between talents and their respective ranks
* Moved core availability to the sidebar
* Added repair stocks and current overcharge to sidebar
* Minor changes to GALSIM and Harrison Armory themes from original COMP/CON imports. The intent is to keep the feel `but with less eye-searing pain`
* Accounted for nuances between styling on Chrome vs FireFox (this affects only HASE stats for Chrome users)

## Known Issues
* If you use the mech inventory system, you may find problems relinking your weapons/systems to your mech. In an effort to combat a rare bug, I purge the null references left behind by using the unlinking feature. If you have issues let me know
* Some paths aren't linked properly so they don't do anything in their flows (I would like for them to post anything to the chat window to indicate a player has 'used' it). The ones I'm searching for how to set their correct paths are: core bonuses (e.g. The Lesson of the Held Image's reaction action), deployable actions and special actions (e.g. Turret Drones)
* Leadership die counter *is* tracking properly, however the activation flow from the Lancer system does not call for a rerender on the mech sheet, so you must close and reopen the sheet to see the changes. If you know how to either: tell an item to rerender a sheet (changes to the talent rerenders the talent sheet and pilot sheet respectively, but not the mech sheet) OR force a rerender in a way that'll update the pilot items (I've made attempts at this but nothing) please let me know!
* Pressing enter on an NPC sheet's input box activates the on-click event for templates/classes. Genuinely have no idea, but Lancer/Foundry's input boxes in general seem kind of cursed
* Components that use selectors (used in all images that have black/white themes and for size/speed indicators) do not reflect theme color until a rerender (opening and closing the sheet). `it is what it is`
* Tooltips are currently width-restricted and minimally restyled, so there can be cases where the entire NPC Notes tooltip display won't fit

## 1.0.0 -> 1.1.0 Summary
* Added GMS Dark theme
* Finished implementing mech sheet features (deployables, talents, core bonuses, etc) to display all effects, bonuses, etc
* Externally loaded assets `stop randomly going to grab milk between patches and never coming back`
* Minor styling changes to consistency and usability

# 1.0.12
Last patch before refactoring over to Svelte (and then NPC sheets soon)
## Changes
* #6 - Added bonuses styling where applicable. Note that with Hydra's `why is it always Hydra` drone HP bonus, the Lancer system currently does not added the appropriate bonus to the system data (though this bonus is accounted for in the deployable themselves). Thanks @Eliemer!
* Added Core Bonuses to the mech sheet (flavor text omitted)
* Readded lost stylings from CSS refaactor introduced last release in generated blocks
* Minimum sheet width adjusted for certain elements
* Added GMS Dark theme

# 1.0.11 - MARGINal improvements
`ha ha get it`
Frame deployables are now implemented and many element margins have been redone or fixed

And yes I'm still testing CI `don't judge me` 

## Changes
* #5 - Added deployables array to frames with deployables linked
* #8 - Modified all loadout's hover over effects to accomodate GALSIM theme users `at the cost of everyone else`
* Modified margins between added bonuses and effects to be more consistent
* Fixed major issue where no talent actions would be returned `because a period was missing`
* Fixed issue where there was no element to display (e.g. tags) there would just be an empty void
* Frame actives and passives are now collapsible `you can thank Hydra for that`
## Known Issues
* ~~#6 - I'm still seeking more information about this particular topic if anyone more knowledgable with Lancer (both game and systems) would like to take a look~~

# 1.0.10
I swear I'm not padding my commit history

# 1.0.9
You guessed it

# 1.0.8
Still pushing releases to test CI
## Changes
* None for you, all for me

# 1.0.7
Mostly an excuse to test CI again
## Changes
* Added window header styling to be whatever the primary theme is determined by foundryvtt-lancer

# 1.0.6
## Changes
* Added missing profile styling
## Known issues
* ~~There is only one missing styling called 'bonuses'; if anyone encounters anything that looks odd (tiny text is the most prominent indicator) don't hesitate to notify me!~~
* ~~There is no 'frame deployable' styling; this is from frames such as the HORUS Hydra, but I can't get foundryvtt-lancer to generate the data I need to observe it. If anyone has success in generating this (or similar) frame's data, let me know~~

# 1.0.5
This is a manual release reverting changes from a recent PR due to CI issues and development pipeline issues hastily introduced

Sorry to everyone who updated within the past few hours

## Changes
* Imported all changes from 1.0.4

# 1.0.4
## Changes
* #2 - Added missing type definition for the button element in core activation, resulting in input events propagating to it unintentionally. Thanks, @sealtrowitz!
* Fixed 'active effects' type checking; Thanks, @BoltsJ!

# 1.0.3 - Don't Mind Me
Still experimenting with GitHub CI's on the main branch. `yup.`
## Changes
Fixes the CI not properly updating the module manifest, so it would appear as "0.0.0" or "0.5.0" instead of the proper version

# 1.0.0 - Hello World!
This is the initial release of the Lancer Alternative Sheets module.

And my issues list is already bigger than my change list.
## Changes
* It exists now
* [PopOut!](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) (and likely some others, such as printing modules) are compatible with this sheet's version of collapsible headers
* All [COMP/CON](https://github.com/massif-press/compcon) themes are supported in this module. `foundryvtt-lancer`'s 'GMS Dark' theme is not currently supported
## Known Issues
* ~~Deleting more than one ActiveEffect without rerendering the document throws an error. Cosmetic only but nonetheless annoying --if anyone knows a fix please let me know~~
* ~~Changing themes while the sheet is open does not change fully change the sheet's theme without reopening it again. I need to hook into when Lancer changes its theme settings, so if anyone knows how to do this please let me know~~
* ~~'editable' actions, 'bonuses', and 'weapon profiles' are not styled and frame deployables (different from system deployables) are not implemented. Not sure if they're even fully implemented in the Lancer system or what they even are~~
* Some things that should have input boxes in the main content (e.g. the 'status' tab: overcharge, structure, and stress) but aren't there. There is an issue where when reading a number data type in the Lancer system and there is more than one of the same uuid, it will throw an value type error. I suspect its received an array, when it expected a single value, but I haven't looked at the code
* ~~Activations (Full, Quick, etc) aren't mapped to use localized values.~~ Neither are the names or descriptions of talents, weapons, mods, etc.
* ~~No warnings yet if your loadout is illegal (e.g. two main weapons on a flex slot)~~
* Some Lancer classes, types, and functions are repackaged with this module (only used by these sheets though) and it feels wholely unnecessary. If anyone knows how to get references to the actual classes/methods/types/functions used in the Lancer module please let me know. I tried getting vite to export types from the foundryvtt-lancer codebase but it's giving me rollup issues unless they're all defined in the global namespace `and I'm not doing that by hand`
* ~~It's called "sheets" but there's only one sheet :eyes: `so what? you wanna fight???`~~

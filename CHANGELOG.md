# 1.1.5
This is a critical patch for those of you on version 1.1.3 or 1.1.4 of this module, fixing primarily permission errors but a few other egregious bugs

In light of this issue and the various changes I've had to make, I've accounted for potential data migration.
Unfortunately, I wasn't able to actually test it. Sorry if your sheet configurations have been reset/happy for you if it hasn't

Note that saving mech sheet theme, the header image offset, and macro list require an active Game Master or Assistant Game Master to be present, since saving world data (which those two things are scoped to do) in Foundry require it.

In laymans this update fixes the "permission error" notification and spamming on the sheets. Extend my condolences to your players.

On a side note, there are a lot of buttons that get popped up in the chat log, if a button doesn't work, it'll (likely) be logged now. Open up the console and let me know what it says (alternatively, it'll pop up if Verbose Logging is enabled) as well as the button/action in the chat log that isn't covered. Whats been added so far is just stuff I've noticed in my player's Action Logs, but they're LL1, so...

## Changes
* Action Log now displays most recent at the top of the list rather than the bottom, to avoid having to scroll unnecessarily
* Fixed players not being able to set world-level settings for their own sheets
* Fixed drag handler event bug serializing data much more often than it needed to on mech sheet headers
* Added Cascade, SecondaryStructure, and StatRoll to supported buttons in the Action Log
* Added SocketManager class to handle GM proxies
* Added Logger class for easier debugging
* Deprecated all uses of SessionStorage API

# 1.1.4 - Mech Sheet Ultra Pro Max
"Why is the header so big when the sidebar already shows the mech?" 

`first of all how dare you`

Well, `eventually dead` anonymous Lancer, because of an Action Log that has been planned since the inception of the mech sheet! Picture this:

Have you ever activated first in the round, fall asleep, and wake up to a `degenerate Hydra` Lancer yelling at you to make your reaction, only for you spend nine actual celestial cycles scrolling past seven integrated mount activations to find a reaction you set up twenty minutes ago? 

No? ... Well, now you have access to a localized Action Log to help you find what you did recently! As well as a few other things showcased here:

https://github.com/user-attachments/assets/a8d5bbcb-0f1e-45fb-aa41-e410b1949a71

That about wraps up the things I had planned for the mech sheet, barring any bug fixes

## Changes
* #15 - Fixed issue where input fields on NPC sheets would trigger the Template component's onclick event
* #24 - Added default width/height specifier for NPC sheets
* #25 - Fixed HASE stat display when users had root element sizes different from 16px. Or atleast I think I did, anyway
* #26 - Fixed NPC tags not appearing in their weapons
* #30 - Added overcharge increment/decrement buttons to the sidebar
* #31 - Fixed issue where editing a mount would delete the weapon(s) mounted
* Fixed bug where empty weapon slot did not have correct localized sub label and always showed 'any'
* Fixed bug where empty systems slot would always point to the first index
* Fixed bug where blinking cursor would not appear for H4 type header components
* Fixed a bug where system points would not be shown for weapon mounts such as Autopods
* Fixed issue where ActionBox effect buttons would be pushed off into the abyss when shrinking horizontally
* Removed "Grit" as a button from the sidebar --use the Grit hex instead
* Removed parts of the sheet that used the Lancer system's themes (namely, text) to support theme overrides
* Added a personalized Action Log to mech sheets, displaying rolls and actions done by that mech. There are configs in the settings sheet to display in the status tab of the main content area or the sidebar
* Added drag-drop functionality mech sheet sidebar buttons area. Simply drag and drop a macro over to add them to the list! Currently only Macro documents are supported, though that should cover most use cases `some of you have macros more complicated than many actual modules, i'm sure you'll make it work`
* Added sortability and deletion to the relevant drag-drop areas. Note that the drag drop handle must be used to sort buttons (shown when the 'advanced options' are toggled). If you aren't dragging with the handle, and it is draggable, it's equivalent to dragging a built-in Flow in the system's default sheet `just click the bars`. Flows such as Overcharge, Stabilize, Attack, Tech Attack, and Damage cannot be deleted, since removing them would remove them permanently
* Added a theme override button to player mech sheets. Note that tooltips (both Lancer System and this module's), which are rendered outside of the actual sheets do not take on the sheet's settings and instead use the system's theme
* Added a sidebar ratio adjustment to player mech sheets ranging from 25%-50%. Note that there is still a minimum width to the sidebar and that this setting is intentionally not synced across clients
* Added a section for this module's settings
* Added a header text log to the empty space in the header that can be toggled in this module's settings. It's mostly just flavor, but it's been an intentional design implementation since initial release
* Added context clues to the header text log
* Added display of Foundry version, Lancer version, and this module's version in the header text log for slight convenience
* Added an option to disable non-essential tooltips in this module's settings
* Added an indicator when system slots are vacant, similar to weapons, which can be interacted the same way
* Added a bunch of module per-client settings under module settings such as whether to display the header log, tooltips, etc
* Adjusted some themes for readability
* Adjusted some tooltip wording
* Minimized a potential bug regarding deployable images
## Known Issues
* Please note that only actions that are 'rollable actions' will be recorded in the Action Log. Items sent to chat (due to data inconsistency, I've set some systems do this as their default action rather than nothing at all) do not qualify to being recorded in the action log. When in doubt, know that all Action boxes will always be recorded, all weapon rolls we always be recorded, and all systems with 'effects' clearly listed will be sent to the action history

# 1.1.3
An advanced settings toggle has been added to the mech sheet? What does this entail? Here's a video instead! `because if a picture is worth a thousand words, use a video`

Otherwise this patch mainly concerns major refactors to primary Svelte components for a little better reuseability utilizing Snippets

## Changes
* #1 - Added adding/removing/editing mounts feature to the 'advanced' toggle
* #19 - Added a temporary fix for missing core bonuses, deployable actions, and deployable ActionBox such as Turret Attack from the Turret Drone to display at least rudimentary information `the most permanent solutions are the temporary ones`. This is an experimental thing, so let me know if there are any issues `i'm about to perform an unscheduled rapid disassembly of all Hydras if deployables don't stop haunting me`
* #20 - Added a way to access the mech sheet's inventory from the 'advanced' toggle
* #23 - As a result of some confusion over the current expand/collapse all button, expanding/collapsing all now affects the main header it is attached to --hopefully this will be more intuitive to everyone!
* Added the ability to adjust header image position to the 'advanced' toggle
* Collapsing headers should be a little more obvious now that the "extension" will state what it does when you hover over it --suggested by one of my players!
* Systems and frame actives and passives can now be directly sent to the chat via their icons
* Purely out of circumstantial chance, I've learned that some modules (e.g. Monk's Little Details) adds a border to the window header of these sheets through an oddly specific and largely inconsequential CSS rule, so I've overridden the addition with my own oddly specific CSS rule `I'M CASTIGATING AAAAAAAAAAA`
* ActionBox components now use EffectButton instead of FlowButton. Also there was a bug where '@html' was used in place of '@render' for the FlowButton component on the mech sheet's ActionBox component. This would cause a long string of text to appear instead of a button. While I don't think anything actually used this thing I added for myself, it's since been replaced by this new addition.
* Reactions on the NPC sheet use the Reaction icon now `oop`
* On the mech sheet, weapon mods, weapon profiles, loaded tags, limited tags, and some counters (only in Frame Power, Talent, and Core Power where relevant) are now above the collapse area, so will always be displayed for easy access 
* Minor adjustments to styling: adjusted header thickness and spacing between header and Core Power activation button
* Slightly changed the animation for collapses to feel a bit more responsive
* Reworded the tooltip for recharging NPC abilities for how it is actually rolled
* Overcharge tooltip now also states the overcharge stage
* Counter buttons now glow as everything else clickable does
* Flipped the vertically written text to a more readable method for romanized languages on supported browsers (the Electron app is not one of them). Anything unsupported will fallback onto the normal way
* There was a typo for superheavy bracing mounts, so it now displays the proper text when expanded
* Other usability styling changes

## Known Issues
* Buttons that create locked tooltips (such as NPC sheet's notes and mech sheet's advanced edits) don't display anything when used from modules that redirect event to external windows such as 'PopOut!'. Unfortunately this likely won't be fixed, as it is an issue (or partly adjacent) with Foundry's method of locked tooltips and I don't want to rollout a custom solution. As a result, I'll have to pull out deliberate mod support for these kinds of mods on the page :pensive: (this doesn't change the fact that I use it)

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
* ~~If you use the mech inventory system, you may find problems relinking your weapons/systems to your mech. In an effort to combat a rare bug, I purge the null references left behind by using the unlinking feature. If you have issues let me know~~
* ~~Some paths aren't linked properly so they don't do anything in their flows (I would like for them to post anything to the chat window to indicate a player has 'used' it). The ones I'm searching for how to set their correct paths are: core bonuses (e.g. The Lesson of the Held Image's reaction action), deployable actions and special actions (e.g. Turret Drones)~~
* Leadership die counter *is* tracking properly, however the activation flow from the Lancer system does not call for a rerender on the mech sheet, so you must close and reopen the sheet to see the changes. If you know how to either: tell an item to rerender a sheet (changes to the talent rerenders the talent sheet and pilot sheet respectively, but not the mech sheet) OR force a rerender in a way that'll update the pilot items (I've made attempts at this but nothing) please let me know!
* ~~Pressing enter on an NPC sheet's input box activates the on-click event for templates/classes. Genuinely have no idea, but Lancer/Foundry's input boxes in general seem kind of cursed~~
* ~~Components that use selectors (used in all images that have black/white themes and for size/speed indicators) do not reflect theme color until a rerender (opening and closing the sheet). `it is what it is`~~
* ~~Tooltips are currently width-restricted and minimally restyled, so there can be cases where the entire NPC Notes tooltip display won't fit~~

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

# 1.3.15
## Changes
* #54 - Added an edit option I forgot to turn on for deployables' 'effect' description. Thanks @hylandpad!
* Fixed a typo in frame traits that would prevent any counters from properly updating themselves, fixing frames such as the Gilgamesh

# 1.3.14
First of all: an apology for the mystery man bug that's been a plague for weeks now
Second of all: even more robust animated token support!

I've tried my best to clearly communicate the difference between actor images and token images, as well as instanced tokens and prototype tokens on the sheets.

## Changes
* Fixed the mystery-man/prototype token bug for the final time `i have no joke for this and am actually tweaking`
* Fixed a typo that would cause the tooltip for deployable's change theme tooltip to appear at the top-left of the screen
* Fixed a typo that would cause some deployable & pilot tooltips to ignore the 'enable tooltips' setting
* Added missing styling on pilot sheet's bond section. When 'dark' themes were selected for a sheet they would use the default text (which would be white/bright) and made it hard to see against the background. It should be legible regardless of theme now
* Added animated token support on sheets for deployables and NPCs but added restrictions in how token images are assigned to mitigate potential accidents
* Added individual actor image editing to deployables and NPC sheets now that strictly *tokens* are shown on sheets
* Added a 'link actor and token image' button (represented by a link) under the advanced toggle to force the actor/token synchronization on/off. This setting is enabled by default ('normal Lancer system behavior') on all sheets, unless your token and actor are different images to begin with. Please note that while this is enabled selecting a token image will be restricted to *image formats* only. Disabling this sync will allow you to select videos *or* images `if you didn't understand anything from this bullet and the phrase "animated tokens" means nothing to you, i don't need to know or my soul will leave my body in the same amount of pieces my heart will be shattered into`
* Added an indicator to mark the editing of an instanced NPC or deployable actor and restrictions on editing images from said instances
* Added select-all QoL when selecting input boxes in deployables
* Changed token image selector to only target prototype tokens for deployable and NPC sheets
* Removed requirement of toggling the 'advanced' button in order to edit the minor ideal option for easier access. Originally this was to lightly prevent players 'accidentally' changing it mid-session `but i'm not your mother, do what you want`

# 1.3.13
Animated token support!

## Changes
* #53 Added support for rendering video files on the mech sheet and pilot sheet's sidebar when the prototype token is a video. Thanks @MechaMaria64 for the reminder!
* Fixed incorrect path for alt paths used in exceptions where image paths are undefined. In most cases this just means it will default to the image used for GMS mechs such as the Everest, Sagarmantha, and Chomolungma `rather than the dreaded mystery-man and cci-mech`
* Added minimum height to sidebar token images, to prevent edge cases where the core power, speed, or size may spill into the stats of pilots and mech sheets
* Removed some testing code that made it to the build `oups`

# 1.3.12
Cleaning up the issues tracker!

## Changes
* #14 - Added inputs to allow changing struct, stress, and stress to mech sheets in Status -> Integrity and added auto highlight text quality-of-life (since these numbers are less than two digits 95% of the time) `unless you're based and cool like Lancaster`. Additionally I've added the overcharge inc/decrementors to the overcharge section
* #27 - Added improved 'Send to Chat' functionality for Mech weapons. Now it should display all relevant data to that weapon's active profile
* #28 - Added improved 'Send to Chat' functionality for NPC weapons. Now it should display all relevant effects of that weapon, such as effects, on hit, and triggers (just remember to be in the right chat mode so the players can see it)
* #52 - Changed NPC tech attacks to only prompt the tech attack flow if said NPC has an attack_bonus attribute defined to avoid unnecessary prompts for save-or-bust or other tech-attacks that do not make an explicit attack roll. Thanks @msprijatelj!
* Fixed the prototype token assignment fix in 1.3.11 for the bug introduced in 1.3.10 `'bug-fix_FINAL(prod)-closing[final]' served on a USB stick edition`
* Fixed improper padding on the D20 background used with Core Power and Core Passives on mech sheets
* Added readability highlights for frequent cases where an actor image with a white background is used on mech and pilot sheets `you monsters.`
* Added improvements to custom chat flows, notably used in: Deployable Actions, new NPC weapons, NPC reactions, and Mech weapons. These are the things that pop up when you press the 'send to chat' button without actually having to roll the weapon

# 1.3.11
## Changes
* #34 - Added relative data input to HP, heat, structure, stress, shields, and burn for all sheets. You can now type in "+4", "-2", etc and it will do the math for you. Naturally this means that setting these values to negative will require doing the math to set them there, but I will assume most people would not generally need negative values for these stats
* Fixed prototype token assignment introduced in 1.3.10. Big thank you to @BoltsJ!
* Added auto-highlighting for inputs

# 1.3.10
Separated actor and token artwork on mech sheets and pilot sheets!

Now you too can showcase all the hard work you and your fellow pilots put into your token art *and* character art!

## Changes
* #50 - Fixed an issue where mech sheet's Systems section did not have the correct acceptable types, causing odd bugs when trying to assign a system to mechs. Thanks @Jonoth777!
* Fixed missing tooltip stylings affecting glyph buttons
* Added a way to change actor artwork through a button on mech and pilot sheets
* Changed sidebar images to use/update token artwork instead of actor artwork as originally intended on mech sheets and pilot sheets

# 1.3.9
## Changes
* #49 - Added missing implementation for Lancer system's damage undo button. Thanks @tw-blob!

# 1.3.8
## Changes
* #48 - Fixed styling issue where gradient start did not account for y portrait shifts. Thanks @hylandpad!

# 1.3.7
## Changes
* #46 - Added missing text in zh-tw localization. Thank you @hazmole!
* #47 - Added missing implementation for consumable reserves. Thank you @sealtrowitz!

# 1.3.6
Three releases in one day `AKA i got a session today and im finding bugs aaaaaaaAAAAAAA`
## Changes
* Fixed styling issue where NPC HASE tooltips did not have a theme applied to them

# 1.3.5
## Changes
* Fixed unintended lockout for core powers on header button even if a core power is active.

# 1.3.4
## Changes
* Fixed unintended lockout for adding personal clocks when a player does not have a Bond

# 1.3.3
Boy, I sure love waking up to the sight of `fatal bugs` in the morning. `aaaaaaaaaaAAAAAAAAAAAAAAAA`

Now introducing the first localization of these sheets to this module! Big thank you to @hazmole for their [pull request](github.com/annoyedb/lancer-alternative-sheets/pull/45/commits/358faf1f26dc7dd8f5059c04834da85e1e136249) of the **Traditional Chinese** localization! If you prefer to play Lancer on Foundry in this language, check out their [localizations for Lancer using the Babele module](https://foundryvtt.com/packages/lancer-compendium-zhtw)!

As always, if you'd like to contribute to localization, please let me know!

## Changes
* #44 - Fixed critical typo made during refactors in 1.3.x that prevented loading, limited, etc items to appear on NPC sheets. Thank you @Jonoth777!
* #43 - Fixed issue where the method of defining the data path prevented the system from injecting the appropriate button event into the edit button for specifically pilot sheet armor. Thank you @msprijatelj!
* #42 - (Only available on Lancer v2.9.0) Added display for the new 'effect' variable in Pilot Weapons, Pilot Armor, and Pilot Gear. Thank you @msprijatelj!
* #45 - Added localization support for Traditional Chinese (zh-tw). Big thank you to @hazmole!
* Fixed missing localization paths for deployable sheet's settings `a little embarassing directly following the above, i must admit`

# 1.3.2
## Changes
* #41 - Fixed issue where having multiple successive socket calls would kill all but the last, affecting moving around the pilot sheet header image. Thank you @sealtrowitz!
* Fixed issue where in V12 flows added by this module would not show up in the Action Log. Because the new check is technically more broad in scope, it should catch *most* flows --even those not added by this module. Because the system does not discriminate chat message types, this is the best I can do for now. You can technically force a chat message to appear using a HTML injection into chat, but I imagine the scenario in this happening would either be deliberate or exceptionally rare for the common player (or GM for that matter)

# 1.3.1
## Changes
* Fixed styling issue where Chromium cannot interpret stringified SASS mixin names, causing certain animated elements to appear as solid white.
* Fixed styling issue where the scrollbar on pilot sheet's mech list were missing rules for Electron and browsers alike

# 1.3.0
With the addition of the deployables sheet, there will be no more sheets made for this module for the foreseeable future and any updates hereafter will be enhancements or bug fixes to the current sheets. Thank you to everyone who has helped contribute through bug reports, pull requests, and suggestions!

In addition, if you are fluent in language other than English and would be interested in helping me localize this module, please let me know! If you already know how localization works in the context of Foundry VTT modules, I'm always open to pull requests on the GitHub page --and thank you in advance!

## Changes
* #40 - Health, stress, etc can now be edited from clicking anywhere on their bar, rather than only the left side. Thank you @sealtrowitz!
* #39 - Swapped Hull and Agility hexes in HASE display for mechs and pilot sheets
* #38 - Added way to edit HASE stats via the 'advanced toggle' button in pilot sheets. Thank you @LostDeep!
* Added deployables sheet
* Fixed a critical bug where datastores were accidentally sharing the same object instance, leading to some unexpected behaviour between sheets
* Fixed an issue where weapons with a counter but lacking a loading, limited, or SP cost would not display the counter
* Fixed an issue where a mech without an assigned pilot would prevent the mech sheet from loading
* Fixed an issue where Active Effects referenced an old name changed from a recent refactor, preventing some functionality such as deletion `big oopsie`
* Fixed an issue where sheet rerenders would not preserve sidebar scroll Y
* Fixed an issue where Pilot Core Bonus and Pilot Talents would not respect their tooltip display settings on their respective sheets
* Fixed an issue where new entries added in the Action Log of sheets would require a rerender to use their buttons if the number of items in the log was greater than one
* Fixed styling issue where drop shadows would multiply with each collapsable, making some shadows much harsher than intended
* Fixed styling issue where text-overflowed names on mechs and pilots would not overflow into ellipsed text
* Fixed styling issue where when scrolled to the very bottom of the sidebar and toggling off advanced options, there would be a slight shift in the scrollbar Y position
* Changed stylization of vacant weapons/systems/etc 
* Changed stylization of tooltips (and by extension certain popouts like NPC notes, mount editing, and theme overrides), which also now reflect the current sheet's primary theme. Unless it's a tag or hamburger menu option from the original sheet, in which case they'll be changed in a later patch
* Changed sidebar image max-height to prioritize consistency across sheets 
* Changed counters on weapon mods to always be displayed for design consistency
* Changed CSS definitions to mitigate future potential conflicts (e.g. Anarchist Overlay) and added style classes to root documents
* Changed collapse ID of pilot & mech sheets to be mutually exclusive from each other to be in line with 'expected behavior'
* Changed hitbox of draggable handles for macros/flows in the sidebar
## Known Issues
* ~~Since apparently it has been added, certain flows (particularly those added by this module) do not show up in the Action Log in V12. This breaks intended interaction with items Deployable sheets in particular which only use the flows added by this module and various Systems, Gear, etc that use those flows as fallbacks when the system's are not available. This is not an issue in V11~~

# 1.2.2
## Changes
* #37 - Fixed missing per-profile actions, affecting weapons such as the Terashima Blade's Storm Stance

# 1.2.1
`wake up honey, new sheets just dropped`

https://github.com/user-attachments/assets/99cf532b-ff94-40e6-8e13-c84447e574ac

Now all that's left is deployables. 

Note that rules-as-written for Lancer, player pilots do not have tech attacks, and by extension have no use for either stat, excepting the 'Search' action, which states an explicit range of 5. 

However, if you wish to globally enable the display of tech attack or sensors stats on the pilot sheets anyway and you are a GM, you can do so in the settings page of this module. `or if you just dont want the save stat to get lonely idk`

## Changes
* #35 - Fixed (?) an issue where renaming using an actor's sheet would not update properly
* #18 - Fixed an issue where pilot talents and core bonuses would not update on the mech sheet (e.g. Leadership, Orator, etc)
* Fixed an issue in NPC sheets where the 'edit notes' button would fail to open when the advanced options toggle was not already on before a rerender
* Fixed visual bug where weapon mod 'added effects' actions had the wrong clip path
* Fixed minor issue where the sheet header's fake text log would block input for a section of the sheet header's image
* Fixed (?) a rare bug with sheets where input fields would trigger the most bizarre things, like applying damage, rolling, triggering stabilize, etc `like its haunted or something`. This bug is incredibly bizarre and very hard to pin down the exact cause. Please let me know if pressing 'enter' on any input fields continues to trigger random things and steps to recreate it, thanks
* Fixed a bug where items with multiple actions had those actions share the same collapse ID
* Fixed a minor style inconsistency with pilot talents in terms of how the edit button is spaced relative to its neighbors
* Fixed a bug where sheets would display nothing if active_mech for whatever reason was null
* Fixed visual bug where '--search' extension would not show up on correct hover over for pilots in mech sheets
* Added Pilot sheets
* Added a cheap '/r d20' flow for generic pilot skill rolls. This unfortunately does not show the +/- accuracy HUD that normally pops up with every roll as a design limitation. This added flow exists only so that rolls made with it can be tracked in the action log, where rolls normally made to chat do not. If anyone is more familiar with flows and know how to bring up that particular HUD, let me know! (or if you know how to initialize/expose AccDiffHudData)
* Added `against my better judgement` display of deployables, counters, and bonuses to pilot items. These just happen to exist in the system; I'm just providing the option to display them if you have them
* Added more context clues to buttons such as 'roll attack', 'roll damage', and 'use system' buttons for sheets. There are other context clues included for other lesser-used buttons as well
* Added more context clues to buttons such as 'roll attack', 'roll damage' by making their backgrounds literal strobelights `if my players ask me who to roll something again the next update i will be adding arrows pointing to it in rainbow strobelights`
* Added missing tooltip and header log tips to HASE stats
* Added subtle indicators for what each line in the mech header represents, identically to pilot sheets 
* Changed the pilot talent icon to something more thematically consistent to the talent rank icons
* Changed many theme colors to stop using ones directly taken from COMP/CON. The design language of these sheets just simply do not facilitate using many of those colors directly, and makes it difficult to balance from a readability standpoint, but I hope you all find the substitutes to be inoffensive and fitting to their individual organizations. The most affected themes are: 'GMS', 'GMS-Dark', 'HORUS'. Notably, 'HA' remains offensive to the eyes because it doesn't feel the same otherwise at this point
* Changed 'getData()' needing to get called twice in order to mount Svelte components to instead forward initial data call from the handlebars template instead

## 1.1.0 -> 1.2.1 Summary
* Added Pilot sheets
* Added an action log to display a history of certain actions taken by that token or actor
* Added a customizable macro list that can be dragged-and-dropped into when in advanced mode
* Added individually applicable themes and certain customization settings

# 1.1.8
Thanks to `stormtalus` on Discord for pointing these issues out.

## Changes
* Fixed error caused by 'drilldownDocument' in frame traits (this does not fix the issue where Gilgamesh's counters do not get updated)
* Added tags display to mech sheet systems `why did no one else tell me these were missing AAAAAAAAAAAAAAAAAAAAAAAAA`
* Expanded arbitrary restriction from the alternative sheets taken from the original sheet limiting the 'loaded' tag from only weapons to support NPC features that are not of a 'weapon' type (e.g. systems and traits). To reiterate, this does not change the underlying data structure nor does it change the base sheets. Neither am I planning on rewriting parts of the Lancer system for homebrew support in this module, it just happened that the data is all there to support it. So if you plan to make use of this, it is only available in the alternative sheet. You may consider this an experimental thing that may change without notice in any future iteration of the Lancer system.

# 1.1.7
This version implements the features created in 1.1.4 for mech sheets into NPC sheets and some changes to the layout for better sheet real-estate.

For convenience, the following settings have been designed to share between NPC tokens of the same actor:
 - macro lists
 - theme overrides
Unique per NPC token:
 - actions recorded in the log
 - stats and everything else from the original sheets

This way, even between scenes, and through however many extracted tokens, you only need to update one sheet and updating from a token will update the main sheet.
In case it wasn't clear, this does not change any behaviour in the original sheets, and only affects Lancer Alternative Sheet settings.

Barring bug fixes this wraps up NPC sheets for now.

## Changes
* Fixed accidental console log spamming from ActionLog following refactors in 1.1.5
* Fixed accidental changes to the way collapse/expand all button worked following refactors in 1.1.5 
* Fixed new messages not properly appearing with a correct name
* Fixed HASE stat display made in 1.1.4 from mech sheets into NPC sheets
* Fixed seemingly rare random scenario where sheet store would try to assign to a derived data store on initialization
* Fixed pilot talents message icon not sending anything to the mech sheet's header text log
* Added ability for Action Logs to update on deleted messages from their respective actors
* Added real-estate in the NPC sheets by moving 'Combat Utilities' and 'Active Effects' into the new tab 'Status', bringing it in-line to player mech sheets
* Added Log tab to NPC sheets and with it the Action Log from 1.1.4's mech sheets
* Added user-definable macro list to NPC sheets from 1.1.4's mech sheets
* Added theme override to NPC sheets from 1.1.4's mech sheets
* Added enable/disable tooltip setting for NPC sheets
* Added more obvious indicator for ability to add macros to the sidebar or NPC sheet
* Increased specificity override to combat some modules still overwriting alternative sheet header borders
* Removed 'Use' button from NPC features --use the button in the header instead

# 1.1.6
This patch fixes the overly generic Handlebars helper name I used to use for debugging back before the Svelte refactor, causing conflicts with other modules.

## Changes
* #32 - Fixes issue regarding Find the Culprit module (and potentially others)

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
* ~~Leadership die counter *is* tracking properly, however the activation flow from the Lancer system does not call for a rerender on the mech sheet, so you must close and reopen the sheet to see the changes. If you know how to either: tell an item to rerender a sheet (changes to the talent rerenders the talent sheet and pilot sheet respectively, but not the mech sheet) OR force a rerender in a way that'll update the pilot items (I've made attempts at this but nothing) please let me know!~~
* ~~Pressing enter on an NPC sheet's input box activates the on-click event for templates/classes. Genuinely have no idea, but Lancer/Foundry's input boxes in general seem kind of cursed~~
* ~~Components that use selectors (used in all images that have black/white themes and for size/speed indicators) do not reflect theme color until a rerender (opening and closing the sheet). `it is what it is`~~
* ~~Tooltips are currently width-restricted and minimally restyled, so there can be cases where the entire NPC Notes tooltip display won't fit~~

## 1.0.0 -> 1.1.0 Summary
* Added NPC Sheets
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

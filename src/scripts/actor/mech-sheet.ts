// TODO: abstract out these render functions once there's more than one sheet
// TODO: look into moving to svelte; or just something that lets you reuse 
// html components without too much back and forth between files
import { HelperOptions } from "handlebars";
import { TEMPLATE_PATHS } from "../loader";
import { getBrightness, getManufacturerColor } from '../theme';
import { resolveDotpath, resolveHelperDotpath } from '../lancer/helpers/common';
import { getLocalized, randomExtension } from "../helpers";
import { slugify } from "../lancer/util/lid";
import { renderActionArray, renderActionButton, renderTagsArray } from '../item';
import { ACTIVATION_COLOR_MAP, SYSTEM_ICON_MAP } from "../constants";
import { collapseID } from '../lancer/helpers/collapse';

export class LASMechSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: ["lancer", "sheet", "actor", "mech", "la-common", "la-header__override"],
            template: TEMPLATE_PATHS.mechSheet,
            width: 900,
            height: 800,
            tabs: [
                {
                    navSelector: ".la-tabs",
                    contentSelector: ".la-content",
                    initial: "loadout"
                },
            ],
            scrollY: [".LA_SCROLL_BODY", ".LA_SCROLL_SIDEBAR"],
        }
    }
}

const mountLocalizeMap: { [key: string]: string } = {
    "Main": "LA.mech.mount.main.label",
    "Heavy": "LA.mech.mount.heavy.label",
    "Aux/Aux": "LA.mech.mount.auxAux.label",
    "Aux": "LA.mech.mount.aux.label",
    "Main/Aux": "LA.mech.mount.mainAux.label",
    "Flex": "LA.mech.mount.flex.label",
    "Integrated": "LA.mech.mount.integrated.label",
    "Superheavy": "LA.mech.mount.superheavy.label",
    "Unknown": "LA.mech.mount.unknown.label",
}

const slotLocalizeMap: { [key: string]: string } = {
    "Auxiliary": "LA.mech.slot.aux.label",
    "Main": "LA.mech.slot.main.label",
    "Flex": "LA.mech.slot.flex.label",
    "Heavy": "LA.mech.slot.heavy.label",
    "Superheavy": "LA.mech.slot.superheavy.label",
    "Integrated": "LA.mech.slot.integrated.label",
}

const systemLocalizeMap: { [key: string]: string } = {
    "Deployable": "LA.mech.system.deployable.label",
    "Drone": "LA.mech.system.drone.label",
    "Mod": "LA.mech.system.mod.label",
    "System": "LA.mech.system.system.label",
    "Tech": "LA.mech.system.tech.label"
}

export function renderActiveEffects(actor: any, effects: any[], _options: HandlebarsHelpers): string
{
    if (effects.length === 0)
        return "";

    let theme = getBrightness();
    let renderArray: string[] = effects.map((effect: any, index: number) =>
    {
        if (!effect.isTemporary) return "";

        let icon = effect.icon
            ? (theme === "dark" ? effect.icon : effect.icon.replace('/white/', '/'))
            : (theme === "dark" ? "systems/lancer/assets/icons/white/difficulty.svg" : "systems/lancer/assets/icons/difficulty.svg");
        return `
<!-- Active Effect -->
<details class="la-details -fullwidth la-combine-v -effect">
    <summary class="la-details__summary clipped-bot-alt la-bckg-warning la-text-header-anti -fontsize1">
        <span class="la-terminal -fadein">>//: </span>${effect.name} <span class="la-extension -lower -fadein">--${getLocalized("LA.info.label")}</span><span class="la-cursor -fadein"></span>
        <button type="button"
            class="lancer-context-menu" 
            data-active-effect-index="${index}" data-uuid="${actor.uuid}">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <button type="button"
            class="la-delete" 
            data-active-effect-index="${index}" data-active-effect-id="${effect._id}" data-uuid="${actor.uuid}">
            <i class="fas fa-trash"></i>
        </button>
    </summary>
    <div class="la-effect la-combine-h">
        <span class="la-effect__span">
            <img class="la-dropshadow" src="${encodeURI(icon)}" alt="Effect Icon">
            <span class="-fontsize1">${effect.description}</span>
        </span>
    </div>
</details>
        `;
    }).filter(effect => effect !== "");

    return renderArray.join("");
}

// Mech Frame

function renderMechFrameEmpty(mech: any, options: HelperOptions)
{
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${mech.id}_frame_empty`;
    return `
<!-- Empty Frame -->
<h1 class="la-systemsheader la-subcontent la-combine-h la-bckg-frame la-text-header clipped-top -justify-between
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <div class="la-systemsheader-label -fontsize2">
        <span class="la-terminal la-text-header -fadein">>//: </span>
        ${getLocalized("LA.placeholder")} 
        <span class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
    </div>
    <div class="-fontsize2">
        <i class="mdi mdi-battery-off-outline -fontsize2"></i>
    </div>
</h1>
<div class="la-details-wrapper la-dropshadow -borderoff
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    <details class="la-details -fullwidth la-combine-v -empty">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2"></i>
                <span class="la-name__span -fontsize2 -strikethrough">${getLocalized("LA.mech.frame.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details-wrapper -borderoff">
            <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">${getLocalized("LA.mech.frame.empty.subLabel")}</span>
        </div>
    </details>
</div>
    `
}

export function renderMechFrame(loadoutPath: string, coreEnergy: number, options: HelperOptions)
{
    let loadout = resolveHelperDotpath(options, loadoutPath) as any;
    let mech = resolveHelperDotpath(options, "actor") as any;
    let frame = loadout.frame?.value;
    if (!frame)
        return renderMechFrameEmpty(mech, options);

    let traits = frame.system.traits.map((_trait: any, index: number) =>
        renderFrameTrait(`system.traits.${index}`, options)
    );

    let power = renderFramePower(`${loadoutPath}.frame.value`, coreEnergy, options);

    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${mech.id}_frame`;
    return `
<!-- Frame -->
<h1 class="la-systemsheader la-subcontent la-combine-h la-text-header clipped-top -justify-between ${getManufacturerColor(frame.system.manufacturer, "bckg")}
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <div class="la-systemsheader-label -fontsize2">
        <span class="la-terminal la-text-header -fadein">>//: </span>
        ${frame.system.manufacturer.toUpperCase()} ${frame.name.toUpperCase()} 
        <span class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
    </div>
</h1>
<div class="la-details-wrapper la-dropshadow ${getManufacturerColor(frame.system.manufacturer, "brdr")}
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    <div class="la-combine-h clipped-alt la-bckg-pilot la-text-header -padding0 -align-center">
        <span class="-fontsize1">${coreEnergy ? getLocalized("LA.mech.core.online.label") : getLocalized("LA.mech.core.offline.label")}</span>
        <div class="${coreEnergy ? "" : ""}">
            <input name="system.core_energy" class="core-power-toggle mdi mdi-battery-outline la-text-repcap -fontsize5" type="checkbox" data-dtype="Boolean" ${coreEnergy ? "checked" : ""}>
        </div>
    </div>
    <div class="la-spacer -medium">&nbsp</div>
    <div class="la-generated -fullwidth -gap1 la-combine-v">
        ${power}
        ${traits.join("")}
    </div>
</div>
    `
}

function renderFramePower(framePath: string, coreEnergy: number, options: HelperOptions)
{
    let frame = resolveHelperDotpath(options, framePath) as any;
    let tags = renderTagsArray(`${framePath}.core_system.tags`, options);

    let core = frame.system.core_system;

    let passive = renderFramePassive(framePath, options);
    let active = renderFrameActive(framePath, coreEnergy, options);

    // TODO: implement when supported
    // let deployables = "";
    // ...

    let theme = getManufacturerColor(frame.system.manufacturer, "bckg");
    return `
<!-- Frame Power -->
<div 
    class="la-details -fullwidth -frame">
    <summary class="la-details__summary la-combine-h clipped-bot-alt ${theme} la-text-header -fontsize2
            collapse-trigger"
        data-la-collapse-id="${frame.id}_core">
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-corebonus"></i>
            <span class="la-name__span -fontsize2">${core.name}</span>
        </div>
    </summary>
    <div class="la-details-wrapper -borderoff
            collapse collapsed"
        data-la-collapse-id="${frame.id}_core">
        ${active}
        ${passive}
        ${tags}
    </div>
</div>
    `;
}

function renderFramePassive(framePath: string, options: HelperOptions)
{
    let frame = resolveHelperDotpath(options, framePath) as any;
    let core = frame.system.core_system;
    if (core.passive_effect === "" && core.passive_actions.length === 0 && core.passive_bonuses.length === 0)
        return "";
    
    let theme = getManufacturerColor(frame.system.manufacturer, "bckg");

    let actions = "";
    if (core.passive_actions.length)
    {
        actions = renderActionArray(frame, "system.core_system.passive_actions");
    }

    let passiveText = ""
    if (core.passive_effect !== "")
    {
        passiveText = `
            <div class="la-effectbox la-combine-v -align-left">
                <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
                    ${getLocalized("LA.mech.core.passive.label")}
                </span>
                <div class="la-dropshadow -fullwidth">
                    <div class="-fontsize1">
                        ${core.passive_effect ?? ""}
                    </div>
                </div>
            </div>
        `;
    }

    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${frame.uuid}_passive`;
    return `
<!-- Frame Passive -->
<div class="la-spacer -medium"></div>
<div class="la-effectbox la-bckg-card -descriptive ${getManufacturerColor(frame.system.manufacturer, "brdr")}">
    <div class="la-actionheader la-combine-h ${theme} la-text-header clipped
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, collID, false)}">
        <i class="cci cci-corebonus -fontsize5"></i>
        <span class="-fontsize2">
            ${core.passive_name}
        </span>
        <div class="la-options la-combine-h">
            <button class="chat-flow-button -glow-header -glow-primary-hover -fontsize3" 
                data-type="passive" data-uuid="${frame.uuid}">
                <i class="mdi mdi-message"></i>
            </button>
        </div>
    </div>
    <div class="la-generated
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
        ${passiveText}
        <!-- Generated Content -->
        ${actions}
    </div>
</div>
    `;
}

function renderFrameActive(framePath: string, coreEnergy: number, options: HelperOptions)
{
    let frame = resolveHelperDotpath(options, framePath) as any;
    let core = frame.system.core_system;
    let activeName = core.active_actions.length ? core.active_actions[0].name : core.name;
    let theme = coreEnergy ? getManufacturerColor(frame.system.manufacturer, "bckg") : "la-bckg-repcap";
    let activation = `activation-${slugify(core.activation, "-")}`;
    let activationTheme = coreEnergy ? ACTIVATION_COLOR_MAP[core.activation] : "la-bckg-repcap";

    let actions = "";
    if (core.active_actions.length)
    {
        actions = renderActionArray(
            frame,
            `system.core_system.active_actions`,
            { hideChip: core.active_actions.length <= 1 } as any
        );
    }

    // let deployables = "";
    //...
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${frame.uuid}_active`;
    return `
<!-- Frame Active -->
<div class="la-spacer -medium"></div>
<div class="la-effectbox la-bckg-card -descriptive ${getManufacturerColor(frame.system.manufacturer, "brdr")}">
    <div class="la-actionheader la-combine-h ${theme} la-text-header clipped
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, collID, false)}">
        <i class="cci cci-corebonus -fontsize5"></i>
        <span class="-fontsize2">
            ${core.active_name}
        </span>
    </div>
    <div class="
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, collID, true)}">
        <div class="la-divider-h la-bckg-primary"></div>
        <div class="la-effectbox la-combine-v -align-left -descriptive">
            <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
                ${core.activation.toUpperCase()}
            </span>
            <div class="-fullwidth ${coreEnergy ? "la-dropshadow" : ""}">
                <button type="button"
                    class="la-corepower clipped la-text-header la-combine-h -fontsize4
                        activation-flow ${activation} ${activationTheme}"  ${coreEnergy ? "" : "disabled"}
                    data-uuid="${frame.uuid}" data-path="system.core_system">
                    <i class="la-corepower__i cci cci-corebonus la-dropshadow"></i>
                    <span class="la-corepower__span la-dropshadow">${activeName.toUpperCase()}</span>
                </button>
            </div>
            <div class="la-spacer -medium">&nbsp</div>
            <div class="-fontsize1">
                ${core.active_effect ?? ""}
            </div>
        </div>
        <!-- Generated Content -->
        ${actions}
    </div>
</div>
    `;
}

function renderFrameTrait(traitPath: string, options: HelperOptions)
{
    let frame = resolveHelperDotpath(options, "system.loadout.frame.value") as any;
    let trait = resolveDotpath(frame, traitPath, []) as any;
    let index = traitPath.split(".").pop();

    if (!trait)
        return "";

    let actions = "";
    if (trait.actions.length)
    {
        actions = renderActionArray(frame, `${traitPath}.actions`);
    }

    // TODO: implement when supported
    // let deployables = "";
    // if (trait.deployables.length)
    // {
    //     deployables = renderDeployableArray
    // }

    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${frame.uuid}_frame_trait_${index}`;
    return `
<!-- Frame Trait -->
<div class="la-details -fullwidth -frame">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-pilot la-text-header -fontsize2
            collapse-trigger"
        data-uuid="${frame.uuid}" 
        data-type="trait" 
        data-index="${index}"
        data-la-collapse-id="${collapseID(collapse, collID, false)}">
        <!-- Icon, Name -->
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-frame -fontsize3"></i>
            <span class="la-name__span -fontsize2">${trait.name}</span>
        </div>
        <!-- Options -->
        <div class="la-right la-combine-h">
            <span class="la-divider-v la-bckg-header">&nbsp;</span>
            <div class="la-options la-combine-h">
                <button type="button"
                    class="chat-flow-button -glow-header -glow-primary-hover -fontsize2">
                    <i class="mdi mdi-message"></i>
                </button>
            </div>
        </div>
    </summary>
    <div class="la-details-wrapper -borderoff
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, collID, true)}">
        <div class="la-generated -fullwidth -gap1 la-combine-v">
            <span class="la-details-wrapper__span la-effectbox la-bckg-card la-brdr-frame -fontsize1">
                <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
                    ${getLocalized("LA.mech.frame.trait.label")}
                </span>
                ${trait.description}
            </span>
            <!-- Generated Content -->
            ${actions}
            <!-- Generated Tags -->
        </div>
    </div>
</div>
    `;
}

// Weapons

function renderWeaponMountBracing(mech: any, mount: any, options: HelperOptions)
{
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${mech.id}_${mount.type}_empty`;
    // Bracing mounts don't need save-states between renders for collapsible
    return `
<!-- Empty Weapon Mount -->
<h1 class="la-subcontent la-bckg-primary la-text-header clipped-top -fontsize2
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <span class="la-terminal la-text-header -fadein">>//: </span>${getLocalized(mountLocalizeMap[mount.type])} <span
        class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span
        class="la-cursor la-anim-header -fadein"></span>
</h1>
<div class="la-details-wrapper la-dropshadow la-brdr-repcap
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    <details class="la-details -fullwidth la-combine-v -bracing">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2"></i>
                <span class="la-name__span -fontsize2 -strikethrough">${getLocalized("LA.mech.mount.locked.label")}</span>
            </div>
        </summary>
        <div class="la-details-wrapper -borderoff">
            <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">${getLocalized("LA.mech.mount.locked.subLabel")}</span>
        </div>
    </details>
</div>
    `
}

export function renderWeaponMounts(loadoutPath: string, options: HelperOptions)
{
    let mech = resolveHelperDotpath(options, "actor") as any;
    let loadout = resolveHelperDotpath(options, loadoutPath) as any;

    let renderArray: string[] = loadout.weapon_mounts.map((mount: { type: string, bracing: boolean, slots: any }, mountIndex: number) =>
    {
        if (mount.bracing)
        {
            return renderWeaponMountBracing(mech, mount, options);
        } else
        {
            let slots = mount.slots.map((slot: { size: string; }, slotIndex: any) =>
            {
                let weaponPath = `${loadoutPath}.weapon_mounts.${mountIndex}.slots.${slotIndex}.weapon.value`;
                let modPath = `${loadoutPath}.weapon_mounts.${mountIndex}.slots.${slotIndex}.mod.value`;
                return renderWeapon(weaponPath, modPath, slot.size, options);
            });

            // Flex: add an empty aux slot for flex mounts with 1 aux
            if (mount.type === "Flex" &&
                mount.slots.length === 1 &&
                mount.slots[0].weapon?.value?.system.size === "Auxiliary")
            {
                let weaponPath = `${loadoutPath}.weapon_mounts.${mountIndex}.slots.1.weapon.value`;
                let modPath = `${loadoutPath}.weapon_mounts.${mountIndex}.slots.1.mod.value`;
                slots.push(renderWeapon(weaponPath, modPath, "Auxiliary", options));
            }
            let err = mech.loadoutHelper.validateMount(mount) ?? "";

            // Flex: don't show the empty aux if a main is equipped
            if (!err && mount.type === "Flex")
            {
                if (mount.slots[0].weapon?.value?.system.size === "Main")
                    slots = [slots[0]];
            }

            let collapse = resolveHelperDotpath(options, "collapse") as any;
            let collID = `${mech.id}_${mount.type}`;
            return `
<!-- Weapon Mount -->
<h1 class="la-subcontent la-bckg-primary la-text-header clipped-top -fontsize2
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <span class="la-terminal la-text-header -fadein">>//: </span>${getLocalized(mountLocalizeMap[mount.type])} <span
        class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span
        class="la-cursor la-anim-header -fadein">
    </span>
</h1>
<div class="la-details-wrapper la-brdr-primary la-combine-v -gap1
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    ${slots.join("")}
</div>
            `;
        }
    });

    return renderArray.join("");
}

function renderWeaponEmpty(weaponPath: string, size: string, options: HelperOptions)
{
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let weapon = resolveHelperDotpath(options, weaponPath) as any;
    const slotSize = size === "Flex"
        ? `${getLocalized(slotLocalizeMap['Main'])} || ${getLocalized(slotLocalizeMap['Auxiliary'])}`
        : getLocalized(slotLocalizeMap[size]) || "any";
    // Basically identical to bracing
    return `
<!-- Empty Weapon -->
<div 
    class="la-details -fullwidth la-dropshadow -empty
        ref slot drop-settable mech_weapon"
    data-path="${weaponPath}"
    data-accept-types="mech_weapon">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -fontsize2
                collapse-trigger"
            data-la-collapse-id="${collapseID(collapse, weapon, false)}">
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-weapon"></i>
            <span class="la-name__span">${getLocalized("LA.mech.mount.empty.label")}</span>
        </div>
    </summary>
    <div class="la-details-wrapper -empty
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, weapon, true)}">
        <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">${slotSize}</span>
    </div>
</div>
    `;
}

function renderWeapon(
    weaponPath: string, modPath: string, size: string, options: HelperOptions)
{
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let weapon = resolveHelperDotpath(options, weaponPath) as any;
    if (!weapon)
    {
        return renderWeaponEmpty(weaponPath, size, options);
    }
    let destroyed = weapon.system.destroyed;

    // Weapon
    let weaponMod = renderWeaponMod(modPath, options);
    let destroyedText = "";
    if (destroyed)
    {
        destroyedText = `
            <span class="la-warn__span la-text-header la-bckg-repcap clipped horus--very--subtle la-locked -fontsize2">${getLocalized("LA.mech.slot.destroyed.subLabel")}</span>
        `;
    }

    // Profile (Weapon Charge Level)
    let profiles = "";
    if (weapon.system.profiles.length > 1)
    {
        let profileArray = weapon.system.profiles.map((profile: any, index: number) =>
        {
            return `
            <button type="button" 
                class="-glow-primary-hover -height5
                gen-control ${index === weapon.system.selected_profile_index ? "-glow-header la-bckg-secondary selected-profile -pointerdisable" : ""}"
                data-action="set" data-action-value="(int)${index}"
                data-path="${weaponPath}.system.selected_profile_index">
                <span class="-padding1-lr -fontsize1 ${index === weapon.system.selected_profile_index ? "-glow-header -bold" : ""}">${profile.name.toUpperCase()}</span>
            </button>
            `;
        });
        profiles = `
        <!-- Weapon Profile -->
<div class="la-limited la-combine-h la-text-header la-bckg-pilot clipped -flex1">
    ${profileArray.join("")}
</div>
        `;
    }

    // Effects
    let activeProfile = weapon.system.active_profile;
    let effect = activeProfile.effect ? renderEffectBox(getLocalized("LA.mech.mod.effect.label"), activeProfile.effect) : "";
    let onAttack = activeProfile.on_attack ? renderEffectBox(getLocalized("LA.effect.attack.label"), activeProfile.on_attack) : "";
    let onHit = activeProfile.on_hit ? renderEffectBox(getLocalized("LA.effect.hit.label"), activeProfile.on_hit) : "";
    let onCrit = activeProfile.on_crit ? renderEffectBox(getLocalized("LA.effect.crit.label"), activeProfile.on_crit) : "";

    // Range
    let range = renderRangeArray(activeProfile.all_range);

    // Damage
    let damage = renderDamageArray(activeProfile.all_damage);

    // Actions
    let actions = weapon.system.actions.length > 0 ? renderActionArray(weapon, "system.actions") : "";
    if (activeProfile.actions.length > 0)
    {
        actions += renderActionArray(weapon, `system.profiles.${weapon.system.selected_profile_index}.actions`)
    }

    // Loading
    let loading = "";
    if (weapon.system.all_tags.some((t: { is_loading: boolean; }) => t.is_loading))
    {
        loading = renderLoading(weapon, weaponPath);
    }

    let limited = "";
    if (weapon.isLimited())
    {
        limited = renderLimited(weapon, weaponPath);
    }

    let systemPoints = "";
    if (weapon.system.sp)
    {
        systemPoints = `
            <div class="la-loading la-hexarray la-combine-h clipped-alt la-bckg-pilot la-text-header -flex1 -fontsize5">
                <span class="la-hexarray__span -fontsize4">${weapon.system.sp}</span>
                <i class="cci cci-system-point"></i>
            </div>
        `;
    }

    let resources = "";
    if (limited || loading || systemPoints)
    {
        resources = `
            <div class="la-resource la-combine-h -fullwidth">
                ${loading}
                ${limited}
                ${systemPoints}
            </div>
        `;
    }

    let tagsPath = `${weaponPath}.system.profiles.${weapon.system.selected_profile_index}.all_tags`;
    let tags = renderTagsArray(tagsPath, options);

    let slot = destroyed
        ? getLocalized("LA.mech.slot.destroyed.label")
        : `${weapon.system.size.toUpperCase()} ${activeProfile.type.toUpperCase()}` || getLocalized("LA.placeholder");

    return `
<!-- Weapon -->
<div 
    class="la-details -fullwidth la-dropshadow -weapon
        ref set drop-settable mech_weapon item"
    data-uuid="${weapon.uuid}" 
    data-path="${weaponPath}" 
    data-accept-types="mech_weapon" draggable="true">
    <summary 
        class="la-details__summary la-combine-h clipped-bot-alt la-bckg-pilot la-text-header -fontsize2
                collapse-trigger"
            data-la-collapse-id="${collapseID(collapse, weapon, false)}">
        <!-- Roll Attack, Name, Type -->
        <div class="la-left la-combine-h">
            <button type="button" 
                class="roll-attack la-text-header -glow-header -glow-primary-hover -fontsize6" draggable="true" ${destroyed ? "disabled" : ""}
                data-tooltip="${getLocalized("LA.flow.rollAttack.tooltip")}">
                <i class="cci cci-weapon ${destroyed ? "la-text-repcap" : ""}"></i>
            </button>
            <!-- Name, Slot -->
            <div class="la-name la-combine-v"> 
                <span class="la-top__span -fontsize2 ${destroyed ? "la-text-repcap -strikethrough" : ""}">
                    ${weapon.name}
                </span>
                <span class="la-bottom__span ${destroyed ? "la-text-error horus--very--subtle" : ""}">
                    ${slot}
                </span>
            </div>
        </div>
        <!-- Roll Damage, Range, Damage, Options -->
        <div class="la-right la-combine-h">
            <button type="button" ${destroyed ? "disabled" : ""}
                class="la-properties la-combine-v -fontsize3 ${destroyed ? "la-text-repcap" : ""}
                    compact-damage roll-damage"
                data-tooltip="${getLocalized("LA.flow.rollDamage.tooltip")}">
                <!-- Generated Range -->
                ${range}
                <!-- Generated Damage -->
                ${damage}
            </button>
            <span class="la-divider-v la-bckg-header">&nbsp;</span>
            <!-- Options -->
            <div class="la-options la-combine-v">
                <button type="button"
                    class="chat-flow-button -glow-header -glow-primary-hover -fontsize2" draggable="true">
                    <i class="mdi mdi-message"></i>
                </button>
                <button type="button"
                    class="lancer-context-menu -glow-header -glow-primary-hover -fontsize2" data-path="${weaponPath}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    </summary>
    <div class="la-details-wrapper la-brdr-pilot ${destroyed ? "-destroyed" : ""} 
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, weapon, true)}">
        <div class="la-generated -fullwidth -gap1 la-combine-v">
            <!-- Generated Content -->
            ${destroyedText}
            ${profiles}
            ${resources}
            ${effect}
            ${onAttack}
            ${onHit}
            ${onCrit}
            ${actions}
            ${weaponMod}
        </div>
        <!-- Generated Tags -->
        ${tags}
    </div>
</div>
    `;
}

function renderWeaponModEmpty(modPath: string, options: HelperOptions)
{
    let mod = resolveHelperDotpath(options, modPath) as any;
    let collapse = resolveHelperDotpath(options, "collapse") as any;

    return `
<!-- Empty Weapon Mod -->
<div 
    class="la-details -fullwidth -mod
        ref slot drop-settable weapon_mod"
    data-path="${modPath}"
    data-accept-types="weapon_mod">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -fontsize2
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, mod, false)}">
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-weaponmod"></i>
            <span class="la-name__span -fontsize2">${getLocalized("LA.mech.mod.empty.label")}</span>
        </div>
    </summary>
    <div class="la-details-wrapper la-brdr-repcap
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, mod, true)}">
        <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">${getLocalized("LA.mech.mod.empty.subLabel")}</span>
    </div>
</div>
    `;
}

function renderWeaponMod(modPath: string, options: HelperOptions & { rollable?: boolean })
{
    let mod = resolveHelperDotpath(options, modPath) as any;
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    if (!mod)
    {
        return renderWeaponModEmpty(modPath, options);
    }

    // Limited, Effect Box, Bonuses, Tags
    let effect = mod.system.effect ? renderEffectBox(getLocalized("LA.mech.mod.effect.label"), mod.system.effect, { flow: true }) : "";
    let bonuses = mod.system.bonuses.length > 0 ? renderBonuses(`${modPath}.system.bonuses`, false, options) : "";
    let tags = mod.system.tags.length ? renderTagsArray(`${modPath}.system.tags`, options) : "";

    let limited = mod.system.tags.some((t: { is_limited: any; }) => t.is_limited) ? renderLimited(mod, modPath) : "";
    
    let resources = "";
    if (limited)
    {
        resources = `
            <div class="la-resource la-combine-h -fullwidth">
                ${limited}
            </div>
        `;
    }

    // Added Range
    let addedRange = "";
    if (mod.system.added_range.length)
    {
        let rangeArray = renderRangeArray(mod.system.added_range);
        addedRange = renderAddedRange(rangeArray, options);
    }

    // Added Damage
    let addedDamage = "";
    if (mod.system.added_damage.length)
    {
        let damageArray = renderDamageArray(mod.system.added_damage);
        addedDamage = renderAddedDamage(damageArray, options);
    }

    // Added Tags
    let addedTags = ""
    if (mod.system.added_tags.length)
    {
        let tagArray = renderTagsArray(`${modPath}.system.added_tags`, options);
        addedTags = renderAddedTags(tagArray, options);
    }

    let modifiers = "";
    if (addedDamage || addedRange || addedTags)
    {
        modifiers = `
            <div class="la-resource la-combine-h -fullwidth">
                ${addedRange}
                ${addedDamage}
                ${addedTags}
            </div>
        `
    }

    // Actions
    let actions = ""
    if (mod.system.actions.length)
    {
        actions = renderActionArray(mod, "system.actions");
    }

    return `
<!-- Weapon Mod -->
<div class="la-details -fullwidth -mod
    ref set drop-settable weapon_mod"
    data-uuid="${mod.uuid}"
    data-path="${modPath}"
    data-accept-types="weapon_mod" draggable="true">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-pilot la-text-header -fontsize2
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, mod, false)}">
        <!-- Icon, Name -->
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-weaponmod -fontsize3"></i>
            <span class="la-name__span -fontsize2">${mod.name}</span>
        </div>
        <!-- SP, Options -->
        <div class="la-right la-combine-h">
            <div class="la-systempoints la-combine-h">
                ${mod.system.sp}
                <i class="cci cci-system-point -fontsize3"></i>
            </div>
            <span class="la-divider-v la-bckg-header">&nbsp;</span>
            <div class="la-options la-combine-h">
                <button type="button"
                    class="lancer-context-menu -glow-header -glow-primary-hover -fontsize2" data-path="${modPath}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    </summary>
    <div class="la-details-wrapper -borderoff
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, mod, true)}">
        <div class="la-generated -fullwidth -gap1 la-combine-v">
            <!-- Generated Content -->
            ${resources}
            ${modifiers}
            ${effect}
            ${bonuses}
            ${actions}
        </div>
        <!-- Generated Tags -->
        ${tags}
    </div>
</div>
    `;
}

// Systems

export function renderSystemMountEmpty(loadout: string, options: HelperOptions)
{
    let mech = resolveHelperDotpath(options, loadout) as any;
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${mech.id}_system_empty`;
    return `
<!-- Empty Systems -->
<h1 class="la-systemsheader la-subcontent la-combine-h la-bckg-frame la-text-header clipped-top -justify-between
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <div class="la-systemsheader-label -fontsize2">
        <span class="la-terminal la-text-header -fadein">>//: </span>
        ${getLocalized("LA.placeholder")} 
        <span class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
    </div>
    <div class="-fontsize2">
        <i class="mdi mdi-battery-off-outline -fontsize2"></i>
    </div>
</h1>
<div class="la-details-wrapper la-dropshadow -borderoff
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    <details class="la-details -fullwidth la-combine-v -empty">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2"></i>
                <span class="la-name__span -fontsize2 -strikethrough">${getLocalized("LA.mech.system.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details-wrapper -borderoff">
            <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">${getLocalized("LA.mech.system.empty.subLabel")}</span>
        </div>
    </details>
</div>
    `;
}

export function renderSystemMounts(loadoutPath: string, options: HelperOptions)
{
    let loadout = resolveHelperDotpath(options, loadoutPath) as any;
    if (!loadout.systems.length)
        return renderSystemMountEmpty(loadoutPath, options);

    let slots = loadout.systems.map((_system: any, index: number) => 
    {
        let systemPath = `${loadoutPath}.systems.${index}.value`;
        return renderSystem(systemPath, options);
    });

    let mech = resolveHelperDotpath(options, "actor") as any;
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let collID = `${mech.id}_system`;
    // Systems header needs a special class to check for hover state
    return `
<!-- Systems -->
<h1 class="la-systemsheader la-subcontent la-combine-h la-bckg-system la-text-header clipped-top -justify-between
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <div class="la-systemsheader-label -fontsize2">
        <span class="la-terminal la-text-header -fadein">>//: </span>
        ${getLocalized("LA.mech.system.label")} 
        <span class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
    </div>
    <div class="-fontsize2">
        <span>${loadout.sp.value} / ${loadout.sp.max}</span>
        <i class="cci cci-system-point -fontsize3"></i>
    </div>
</h1>
<div class="la-details-wrapper la-brdr-system
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    ${slots.join("")}
</div>
    `
}

function renderSystem(systemPath: string, options: HelperOptions & { nonInteractive?: boolean })
{
    let sys = resolveHelperDotpath(options, systemPath) as any;
    if (!sys)
        return;
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let icon = SYSTEM_ICON_MAP[sys.system.type] || "cci-system";

    let effect = ""
    if (sys.system.effect)
    {
        effect = renderEffectBox(getLocalized("LA.mech.system.effect.label"), sys.system.effect, { flow: !options?.nonInteractive || false });
    }

    let actions = ""
    if (sys.system.actions.length)
    {
        actions = renderActionArray(sys, "system.actions", options as any);
    }

    let deployables = ""
    if (sys.system.deployables.length && sys.actor)
    {
        deployables = renderDeployableArray(sys, options);
    }

    let limited = ""
    if (sys.isLimited())
    {
        limited = renderLimited(sys, systemPath, options);
    }

    let resources = ""
    if (limited)
    {
        resources = `
            <div class="la-resource la-combine-h -fullwidth">
                ${limited}
            </div>
        `;
    }

    let tags = renderTagsArray(`${systemPath}.system.tags`, options);

    let destroyed = sys.system.destroyed;
    let destroyedText = "";
    if (destroyed)
    {
        destroyedText = `
            <span class="la-warn__span la-text-header la-bckg-repcap clipped horus--very--subtle la-locked -fontsize2">${getLocalized("LA.mech.system.destroyed.subLabel")}</span>
        `;
    }

    let slot = destroyed
        ? getLocalized("LA.mech.system.destroyed.label")
        : getLocalized(systemLocalizeMap[sys.system.type]) || getLocalized("LA.mech.system.system.label");
    return `
<!-- System -->
<div class="la-details -fullwidth la-dropshadow -system 
    ref set drop-settable mech_system"
    data-item-id="${sys.uuid}"
    data-uuid="${sys.uuid}"
    data-path="${systemPath}"
    data-accept-types="mech_system" draggable="true">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-pilot la-text-header -fontsize2
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, sys, false)}">
        <!-- Icon, Name -->
        <div class="la-left la-combine-h">
            <i class="la-icon cci ${icon} -fontsize6 ${destroyed ? "la-text-repcap" : ""}"></i>
            <!-- Name, Type -->
            <div class="la-name la-combine-v"> 
                <span class="la-top__span -fontsize2 ${destroyed ? "la-text-repcap -strikethrough" : ""}">
                    ${sys.name}
                </span>
                <span class="la-bottom__span ${destroyed ? "la-text-error horus--very--subtle" : ""}">
                    ${slot}
                </span>
            </div>
        </div>
        <!-- SP, Options -->
        <div class="la-right la-combine-h">
            <div class="la-systempoints la-combine-h ${destroyed ? "la-text-repcap" : ""}">
                <span class="-fontsize4">${sys.system.sp}</span>
                <i class="cci cci-system-point -fontsize4"></i>
            </div>
            <span class="la-divider-v la-bckg-header">&nbsp;</span>
            <!-- Options -->
            <div class="la-options la-combine-v">
                <button type="button"
                    class="chat-flow-button -glow-header -glow-primary-hover -fontsize2" draggable="true">
                    <i class="mdi mdi-message"></i>
                </button>
                <button type="button"
                    class="lancer-context-menu -glow-header -glow-primary-hover -fontsize2" data-path="${systemPath}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    </summary>
    <div class="la-details-wrapper -borderoff
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, sys, true)}">
        <div class="la-generated -fullwidth -gap1 la-combine-v">
            <!-- Generated Content -->
            ${destroyedText}
            ${resources}
            ${effect}
            ${actions}
            ${deployables}
        </div>
        <!-- Generated Tags -->
        ${tags}
    </div>
</div>
    `;
}

// General

function renderAddedDamage(damageArray: string, options: HelperOptions & { rollable?: boolean })
{
    let classes = options.hash["classes"] || "";

    if (options.rollable)
    {
        return `
<!-- Added Damage Rollable -->
<div class="la-effectbox la-bckg-card la-combine-h -allround">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
        ${getLocalized("LA.mech.mod.damage.label")}
    </span>
    <button class="la-combine-h roll-damage ${classes}"
        data-tooltip="${getLocalized("LA.flow.rollDamage.tooltip")}">
        ${damageArray}
    </button>
</div>
        `;
    }

    return `
<!-- Added Damage -->
<div class="la-effectbox la-bckg-card la-combine-h -allround">
    <div class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">${getLocalized("LA.mech.mod.damage.label")}</div>
    <div class="la-combine-h -fontsize3 ${classes}">${damageArray}</div>
</div>
    `;
}

function renderDamageArray(array: any[])
{
    let renderArray = array.map((d: any) => `
        <span class="la-number__span">${d.val}</span>
        <i class="cci ${d.icon} -glow-${d.type.toLowerCase()}"></i>
    `);

    return `
        <!-- Damage Array -->
        <span class="la-damage la-combine-h la-">
            ${renderArray.join("")}
        </span>
    `;
}

function renderAddedRange(rangeArray: string, options: HelperOptions)
{
    let classes = options.hash["classes"] || "";
    return `
<!-- Added Range -->
<div class="la-effectbox la-bckg-card la-combine-h -allround">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">${getLocalized("LA.mech.mod.range.label")}</span>
    <div class="la-combine-h -fontsize3 ${classes}">${rangeArray}</div>
</div>
    `;
}

function renderRangeArray(array: any[])
{
    let renderArray = array.map((r: any) => `
        <span class="la-number__span">${r.val}</span>
        <i class="cci ${r.icon}"></i>
    `);

    return `
        <!-- Range Array -->
        <span class="la-range la-combine-h">
            ${renderArray.join("")}
        </span>
    `;
}

function renderEffectBox(title: string, text: string, options?: { add_classes?: string; flow?: boolean })
{
    if (!text) return "";

    let flowButton = "";
    if (options?.flow)
    {
        flowButton = `
    <button type="button"
        class="la-flow la-button la-bckg-secondary la-text-header clipped-bot effect-flow">
        <span class="la-terminal -fadein">>//: </span>${getLocalized("LA.use.label")}<span class="la-extension -lower -fadein">${randomExtension()}</span><span class="la-cursor -fadein"></span>
    </button>
        `;
    }

    return `
<!-- Effect Box -->
<div class="la-effectbox la-bckg-card -fontsize1 -descriptive ${options?.add_classes || ""}">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">${title}</span>
    ${flowButton}
    <span class="la-description">${text}</span>
</div>
    `;
}

function renderBonuses(bonusPath: string, edit: boolean, options: HelperOptions)
{
    let bonuses = resolveHelperDotpath(options, bonusPath) as any[];

    let renderArray: string[] = [];
    renderArray = bonuses.map((bonus: any, index: number) => `
        <div class="${edit ? "editable" : ""}" data-path="${bonusPath}.${index}">
            ${renderEffectBox(bonus.lid, bonus.val)}
        </div>
    `);

    return `
<!-- LA: I have not been restyled -->
<div class="card bonus-list">
    <div class="lancer-header lancer-bonus">
    <span class="left">${getLocalized("LA.bonuses")}</span>
    ${edit ? `<a class="gen-control fas fa-plus" data-action="append" data-path="${bonusPath}" data-action-value="(struct)bonus"></a>` : ""}
    </div>
    ${renderArray.join("\n")}
</div>
<!-- /LA: I have not been restyled -->
    `;
}

function renderAddedTags(tagList: string, _options: HelperOptions)
{
    return `
<!-- Added Tags -->
<div class="la-effectbox la-bckg-card la-combine-h -allround">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
        ${getLocalized("LA.mech.mod.tags.label")}
    </span>
    ${tagList}
</div>
    `;
}

function renderLoading(item: any, path: string, options?: { nonInteractive?: boolean })
{
    if (!(
        item.type === "mech_weapon" ||
        item.type === "pilot_weapon" ||
        (item.type === "npc_feature" && item.system.type === "Weapon")
    ))
        return "";

    let loaded = item.system.loaded;
    let nonInteractive = options?.nonInteractive ? "non-interactive" : "";
    let hexes = renderHexArray(loaded ? 1 : 0, 1, path, "loaded-hex");

    return `
<!-- Loading -->
<div class="la-loading la-hexarray la-combine-h clipped-alt la-bckg-pilot la-text-header -flex1 ${nonInteractive}">
    <span class="la-hexarray__span -fontsize1">${getLocalized("LA.loading.label")}</span> ${hexes.join("")}
</div>
    `;
}

function renderLimited(item: any, path: string, options?: { nonInteractive?: boolean })
{
    let uses = item.system.uses;
    let nonInteractive = options?.nonInteractive ? "non-interactive" : "";
    let hexes = renderHexArray(uses.value, uses.max, path, "uses-hex");

    return `
<!-- Limited -->
<div class="la-limited la-hexarray la-combine-h clipped-alt la-bckg-pilot la-text-header -flex1 ${nonInteractive}">
    <span class="la-hexarray__span -fontsize1">${getLocalized("LA.limited.label")}</span> ${hexes.join("")}
</div>
    `;
}

function renderHexArray(curr: number, max: number, path: string, classes?: string)
{
    return [...Array(max)].map((_ele, index) =>
    {
        const available = index + 1 <= curr;
        return `
<!-- Hex Array -->
<button class="la-hexarray__button -glow-header -glow-primary-hover -fontsize5">
    <i class="${classes ?? ""} mdi ${available ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"}" data-available="${available}" 
        data-path="${path}">
    </i>
</button>
        `;
    });
}

/*
TODO: refactor when foundryvtt-lancer is updated to support frame trait and frame core deployables

Need LIDs (to get the path to the actual item entry) and the item itself (to build a linkable ref to the actor when clicking on the deployable name)

For systems, actors are got from the global actor list and filtered down and taking their LIDs;
everything else is currently unsupported
*/
function renderDeployableArray(item: any, options: HelperOptions)
{
    if (item.actor.is_deployable() || item.actor.isToken)
        return "";

    let foundDeployables = game.actors!.filter(a => !!(a.is_deployable() && a.system.owner?.value == item.actor))
    let deployables: string[] = foundDeployables.map(deployable =>
    {
        if (!item.system.deployables || item.system.deployables.includes(deployable.system.lid))
        {
            let lid = deployable.system.lid;
            if (deployable)
            {
                return renderDeployable(deployable, { item: item, path: `deployables.${lid}` }, options);
            } else
            {
                return `<span>Unresolved deployable LID "${lid}". Re-import + set yourself as its owner</span>`;
            }
        }
        return '';
    }).filter(Boolean);

    return deployables.join("");
}

function renderDeployable(deployable: StoredDocument<any>, source: { item: any, path: string } | null, options: HelperOptions &
{ nonInteractive?: boolean, vertical?: boolean })
{

    let theme = getBrightness();
    let img = deployable.img
        ? (theme === "dark" ? deployable.img.replace('/icons/', '/icons/white/') : deployable.img)
        : (theme === "dark" ? "systems/lancer/assets/icons/white/generic_item.svg" : "systems/lancer/assets/icons/generic_item.svg");

    let standardActions = [
        { label: "ACTIVATE", action: deployable.system.activation },
        { label: "DEACTIVATE", action: deployable.system.deactivation },
        { label: "RECALL", action: deployable.system.recall },
        { label: "REDEPLOY", action: deployable.system.redeploy },
    ].filter(a => !!a.action);
    let buttons = standardActions.map(a =>
        renderActionButton(
            a.action,
            { label: a.label, uuid: deployable.uuid, path: source?.path },
            options as any
        )
    );
    let buttonDisplay = buttons.length > 1
        ? `
        <div class="la-effectbox-buttons la-combine-h -justify-between">
            <div class="la-combine-v -align-left">${buttons.join("")}</div>
            <img class="-height10 click-open" src="${img}"/>
        </div>
        <div class="la-spacer -medium">&nbsp</div>
        `
        : buttons.join("");

    let actions = "";
    if (deployable.system.actions.length)
    {
        actions = deployable.system.actions.map((_action: any, _index: number) =>
            renderActionArray(
                deployable,
                `system.actions`,
                { full: true, nonInteractive: options?.nonInteractive } as any
            )
        );
    }

    return `
<!-- Deployable -->
<div class="la-effectbox la-bckg-card -descriptive
    ref set"
    data-uuid="${deployable.uuid}">
    <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0
        click-open">
        ${deployable.name ? deployable.name.toUpperCase() : ""}
    </span>
    <div class="la-generated -gap1 la-combine-v">
        <div class="-fontsize1">
            ${buttonDisplay}
            ${deployable.system.detail}
        </div>
        <!-- Generated Content -->
        ${actions}
    </div>
</div>
    `;
}

export function deleteActiveEffect(_app: any, html: JQuery<HTMLElement>, context: any)
{
    html.on('click', '.la-delete', function (event)
    {
        if (!context.owner)
        {
            console.error("Lancer Alternative Sheets: User is not the owner of this actor.");
            return;
        }

        let id = $(event.currentTarget).data('active-effect-id');
        try
        {
            // TODO: Removing active effect while sheet is up throws an error. No idea how to fix it.
            // Need to see if listening for the applyActiveEffect and removing elements fixes it?
            // When render is set to false, does not throw error
            context.actor.deleteEmbeddedDocuments("ActiveEffect", [id], { diff: true, render: true, type: 'ActiveEffect' });
        } catch (error)
        {
            console.error("Lancer Alternative Sheets: Failed to delete active effect.", id, context);
        }
    });
}
export const ACTIVATION_LOCALIZE_MAP: { [key: string]: string } = {
    "Full"      : "LA.action.full.label",
    "Quick"     : "LA.action.quick.label",
    "Reaction"  : "LA.action.reaction.label",
    "Protocol"  : "LA.action.protocol.label",
    "Free"      : "LA.action.free.label",
    "Full Tech" : "LA.action.fullTech.label",
    "Quick Tech": "LA.action.quickTech.label",
    "Invade"    : "LA.action.invade.label",
}

export const ACTIVATION_TOOLTIP_LOCALIZE_MAP: { [key: string]: string } = {
    "Full"      : "LA.action.full.tooltip",
    "Quick"     : "LA.action.quick.tooltip",
    "Reaction"  : "LA.action.reaction.tooltip",
    "Protocol"  : "LA.action.protocol.tooltip",
    "Free"      : "LA.action.free.tooltip",
    "Full Tech" : "LA.action.fullTech.tooltip",
    "Quick Tech": "LA.action.quickTech.tooltip",
    "Invade"    : "LA.action.invade.tooltip",
}

export const ACTIVATION_ICON_MAP: { [key: string]: string } = {
    "Full"      : "cci-activation-full",
    "Quick"     : "cci-activation-quick",
    "Reaction"  : "cci-reaction",
    "Protocol"  : "cci-protocol",
    "Free"      : "cci-free-action",
    "Full Tech" : "cci-tech-full",
    "Quick Tech": "cci-tech-quick",
    "Invade"    : "cci-tech-quick",
}

export const ACTIVATION_COLOR_MAP: { [key: string]: string } = {
    "Full"      : "la-bckg-action--full",
    "Quick"     : "la-bckg-action--quick",
    "Reaction"  : "la-bckg-npc--reaction",
    "Protocol"  : "la-bckg-action--protocol",
    "Free"      : "la-bckg-action--free",
    "Full Tech" : "la-bckg-action--tech",
    "Quick Tech": "la-bckg-action--tech",
    "Invade"    : "la-bckg-action--tech",
    "Passive"   : "la-bckg-repcap",
}

export const SYSTEM_ICON_MAP: { [key: string]: string } = {
    "Deployable": "cci-deployable",
    "Drone"     : "cci-drone",
    "Mod"       : "cci-mod",
    "System"    : "cci-system",
    "Tech"      : "cci-tech-quick"
}

export const MOUNT_LOCALIZE_MAP: { [key: string]: string } = {
    "Main"      : "LA.mech.mount.main.label",
    "Heavy"     : "LA.mech.mount.heavy.label",
    "Aux/Aux"   : "LA.mech.mount.auxAux.label",
    "Aux"       : "LA.mech.mount.aux.label",
    "Main/Aux"  : "LA.mech.mount.mainAux.label",
    "Flex"      : "LA.mech.mount.flex.label",
    "Integrated": "LA.mech.mount.integrated.label",
    "Superheavy": "LA.mech.mount.superheavy.label",
    "Unknown"   : "LA.mech.mount.unknown.label",
}

export const MOUNT_FITTINGS: { [key: string]: Array<string> } = {
    "Main"      : ["Main"],
    "Heavy"     : ["Heavy"],
    "Aux/Aux"   : ["Auxiliary", "Auxiliary"],
    "Aux"       : ["Auxiliary"],
    "Main/Aux"  : ["Main", "Auxiliary"],
    "Flex"      : ["Flex"],
    "Integrated": ["Integrated"],
    "Superheavy": ["Superheavy"],
    "Unknown"   : ["Integrated"],
}

export const SLOT_LOCALIZE_MAP: { [key: string]: string } = {
    "Auxiliary" : "LA.mech.slot.aux.label",
    "Main"      : "LA.mech.slot.main.label",
    "Flex"      : "LA.mech.slot.flex.label",
    "Heavy"     : "LA.mech.slot.heavy.label",
    "Superheavy": "LA.mech.slot.superheavy.label",
    "Integrated": "LA.mech.slot.integrated.label",
}

export const SYSTEM_LOCALIZE_MAP: { [key: string]: string } = {
    "Deployable": "LA.mech.system.deployable.label",
    "Drone"     : "LA.mech.system.drone.label",
    "Mod"       : "LA.mech.system.mod.label",
    "System"    : "LA.mech.system.system.label",
    "Tech"      : "LA.mech.system.tech.label"
}

export const RESERVE_LOCALIZE_MAP: { [key: string]: string } = {
    "Resources"     : "LA.pilot.reserve.resources.label",
    "Tactical"      : "LA.pilot.reserve.tactical.label",
    "Mech"          : "LA.pilot.reserve.mech.label",
    "Project"       : "LA.pilot.reserve.project.label",
    "Organization"  : "LA.pilot.reserve.organization.label",
    "Bonus"         : "LA.pilot.reserve.bonus.label",
}

export const RESERVE_ICON_MAP: { [key: string]: string } = {
    "Resources"     : "cci-orbit",
    "Tactical"      : "cci-reserve-tac",
    "Mech"          : "cci-reserve-mech",
    "Project"       : "cci-ship",
    "Organization"  : "cci-orbital",
    "Bonus"         : "cci-npc-feature",
}

import { ChatCardType } from "@/enums/ChatCardType";
// Since the chat window is outside the scope of the sheets, most 
// of the CSS is unavailable, so we fallback onto the base Lancer system's
export const CHAT_CARD_COLOR_MAP: Record<ChatCardType | string, string> = {
    [ChatCardType.Weapon]: "lancer-weapon",
    [ChatCardType.Gear]: "lancer-weapon",
    [ChatCardType.Armor]: "lancer-weapon",
    [ChatCardType.System]: "lancer-system",
    [ChatCardType.Tech]: "lancer-tech",
    [ChatCardType.Trait]: "lancer-trait",
    [ChatCardType.Reaction]: "lancer-reaction",
    [ChatCardType.Quick]: "lancer-quick",
    [ChatCardType.Full]: "lancer-full",
    [ChatCardType.Protocol]: "lancer-protocol",
    [ChatCardType.Free]: "lancer-free",
    [ChatCardType.Primary]: "lancer-primary",
    [ChatCardType.Secondary]: "lancer-secondary",
};

export const CHAT_CARD_ACTIVATION_COLOR_MAP: { [key: string]: string } = {
    "Full"      : CHAT_CARD_COLOR_MAP[ChatCardType.Full],
    "Quick"     : CHAT_CARD_COLOR_MAP[ChatCardType.Quick],
    "Reaction"  : CHAT_CARD_COLOR_MAP[ChatCardType.Reaction],
    "Protocol"  : CHAT_CARD_COLOR_MAP[ChatCardType.Protocol],
    "Free"      : CHAT_CARD_COLOR_MAP[ChatCardType.Free],
    "Full Tech" : CHAT_CARD_COLOR_MAP[ChatCardType.Tech],
    "Quick Tech": CHAT_CARD_COLOR_MAP[ChatCardType.Tech],
    "Invade"    : CHAT_CARD_COLOR_MAP[ChatCardType.Tech],
}
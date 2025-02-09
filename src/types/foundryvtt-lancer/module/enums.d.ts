export declare enum PilotEquipType {
    PilotArmor = "armor",
    PilotWeapon = "weapon",
    PilotGear = "gear"
}
export declare enum EffectType {
    Generic = "Generic",
    Basic = "Basic",
    Charge = "Charge",
    Deployable = "Deployable",
    AI = "AI",
    Protocol = "Protocol",
    Reaction = "Reaction",
    Tech = "Tech",
    Drone = "Drone",
    Bonus = "Bonus",
    Offensive = "Offensive",
    Profile = "Profile"
}
export declare enum StatusConditionType {
    Condition = "Condition",
    Status = "Status",
    Effect = "Effect"
}
export declare enum ChargeType {
    Grenade = "Grenade",
    Mine = "Mine"
}
export declare enum NPCTag {
    Mech = "Mech",
    Vehicle = "Vehicle",
    Ship = "Ship",
    Biological = "Biological",
    Squad = "Squad"
}
export declare enum ActivationOptions {
    ACTION = "Action",
    DEPLOYABLE = "Deployable"
}
export declare enum ChipIcons {
    Roll = "<i class=\"fas fa-dice-d20\"></i>",
    Chat = "<i class=\"mdi mdi-message\"></i>",
    Deployable = "<i class=\"cci cci-deployable\"></i>",
    Core = "<i class=\"cci cci-corebonus\"></i>"
}
export declare enum StabOptions1 {
    Cool = "Cool",
    Repair = "Repair"
}
export declare enum StabOptions2 {
    Reload = "Reload",
    ClearBurn = "ClearBurn",
    ClearOwnCond = "ClearOwnCond",
    ClearOtherCond = "ClearOtherCond"
}
enum EntryType {
    CORE_BONUS = "core_bonus",
    DEPLOYABLE = "deployable",
    FRAME = "frame",
    MECH = "mech",
    LICENSE = "license",
    NPC = "npc",
    NPC_CLASS = "npc_class",
    NPC_TEMPLATE = "npc_template",
    NPC_FEATURE = "npc_feature",
    WEAPON_MOD = "weapon_mod",
    MECH_SYSTEM = "mech_system",
    MECH_WEAPON = "mech_weapon",
    ORGANIZATION = "organization",
    PILOT_ARMOR = "pilot_armor",
    PILOT_GEAR = "pilot_gear",
    PILOT_WEAPON = "pilot_weapon",
    PILOT = "pilot",
    RESERVE = "reserve",
    SKILL = "skill",
    STATUS = "status",
    TALENT = "talent",
    BOND = "bond"
}
export declare enum MountType {
    Main = "Main",
    Heavy = "Heavy",
    AuxAux = "Aux/Aux",
    Aux = "Aux",
    MainAux = "Main/Aux",
    Flex = "Flex",
    Integrated = "Integrated",
    Superheavy = "Superheavy",
    Unknown = "Unknown"
}
export declare enum NpcFeatureType {
    Trait = "Trait",
    System = "System",
    Reaction = "Reaction",
    Weapon = "Weapon",
    Tech = "Tech"
}
export declare enum NpcTechType {
    Quick = "Quick",
    Full = "Full"
}
export declare function getMountType(raw: string): MountType;
export declare enum FittingSize {
    Auxiliary = "Auxiliary",
    Main = "Main",
    Flex = "Flex",
    Heavy = "Heavy",
    Superheavy = "Superheavy",
    Integrated = "Integrated"
}
export declare function fittingsForMount(mount: MountType): FittingSize[];
export declare function getFittingSize(raw: string): FittingSize;
export declare enum WeaponSize {
    Aux = "Auxiliary",
    Main = "Main",
    Heavy = "Heavy",
    Superheavy = "Superheavy"
}
export type WeaponSizeChecklist = {
    [key in WeaponSize]: boolean;
};
export declare function getWeaponSize(raw: string): WeaponSize;
export declare enum WeaponType {
    Rifle = "Rifle",
    Cannon = "Cannon",
    Launcher = "Launcher",
    CQB = "CQB",
    Nexus = "Nexus",
    Melee = "Melee"
}
export type WeaponTypeChecklist = {
    [key in WeaponType]: boolean;
};
export declare enum DefenseType {
    EDef = "E-Defense",
    Evasion = "Evasion"
}
export declare enum SystemType {
    System = "System",
    AI = "AI",
    Shield = "Shield",
    Deployable = "Deployable",
    Drone = "Drone",
    Tech = "Tech",
    Armor = "Armor",
    FlightSystem = "Flight System",
    Integrated = "Integrated",
    Mod = "Mod"
}
export type SystemTypeChecklist = {
    [key in SystemType]: boolean;
};
export declare enum Duration {
    Free = "Free",
    Turn = "Turn",
    NextTurn = "NextTurn",
    Scene = "Scene",
    Mission = "Mission"
}
export declare enum FrameEffectUse {
    Turn = "Turn",
    NextTurn = "Next Turn",
    Round = "Round",
    NextRound = "Next Round",
    Scene = "Scene",
    Encounter = "Encounter",
    Mission = "Mission",
    Unknown = "?"
}
export declare enum ActivationType {
    None = "None",
    Passive = "Passive",
    Quick = "Quick",
    QuickTech = "Quick Tech",
    Invade = "Invade",
    Full = "Full",
    FullTech = "Full Tech",
    Other = "Other",
    Reaction = "Reaction",
    Protocol = "Protocol",
    Free = "Free"
}
export declare enum RangeType {
    Range = "Range",
    Threat = "Threat",
    Thrown = "Thrown",
    Line = "Line",
    Cone = "Cone",
    Blast = "Blast",
    Burst = "Burst"
}
export type RangeTypeChecklist = {
    [key in RangeType]: boolean;
};
export declare enum DamageType {
    Kinetic = "Kinetic",
    Energy = "Energy",
    Explosive = "Explosive",
    Heat = "Heat",
    Burn = "Burn",
    Variable = "Variable"
}
export type DamageTypeChecklist = {
    [key in DamageType]: boolean;
};
export declare enum AttackType {
    Melee = "Melee",
    Ranged = "Ranged",
    Tech = "Tech"
}
export type AttackTypeChecklist = {
    [key in AttackType]: boolean;
};
export declare enum MechType {
    Balanced = "Balanced",
    Artillery = "Artillery",
    Striker = "Striker",
    Controller = "Controller",
    Support = "Support",
    Defender = "Defender",
    Specialty = "Specialty"
}
export declare enum HASE {
    H = "hull",
    A = "agi",
    S = "sys",
    E = "eng"
}
export declare enum ReserveType {
    Resources = "Resources",
    Tactical = "Tactical",
    Mech = "Mech",
    Project = "Project",
    Organization = "Organization",
    Bonus = "Bonus"
}
export declare enum OrgType {
    Military = "Military",
    Scientific = "Scientific",
    Academic = "Academic",
    Criminal = "Criminal",
    Humanitarian = "Humanitarian",
    Industrial = "Industrial",
    Entertainment = "Entertainment",
    Political = "Political"
}
export declare enum EncounterSide {
    Enemy = "Enemy",
    Ally = "Ally",
    Neutral = "Neutral"
}
export type SynergyLocation = "any" | "active_effects" | "rest" | "weapon" | "system" | "deployable" | "drone" | "move" | "boost" | "other" | "ram" | "grapple" | "tech_attack" | "hp" | "armor" | "repair" | "overshield" | "burn" | "structure" | "heat" | "stress" | "overcharge" | "skill_check" | "overwatch" | "skirmish" | "barrage" | "improvised_attack" | "disengage" | "stabilize" | "tech" | "lock_on" | "bolster" | "hase" | "hull" | "agility" | "systems" | "engineering" | "brace" | "cascade";
export declare const AllSynergyLocations: string[];
export declare enum DeployableType {
    Deployable = "Deployable",
    Drone = "Drone",
    Mine = "Mine"
}
export declare enum ActivePeriod {
    Turn = "Turn",
    Round = "Round",
    Encounter = "Encounter",
    Scene = "Scene",
    Mission = "Mission",
    Unlimited = "Unlimited"
}
export declare function makeWeaponTypeChecklist(types: WeaponType[]): WeaponTypeChecklist;
export declare function flattenWeaponTypeChecklist(types: WeaponTypeChecklist): WeaponType[];
export declare function makeWeaponSizeChecklist(types: WeaponSize[]): WeaponSizeChecklist;
export declare function flattenWeaponSizeChecklist(sizes: WeaponSizeChecklist): WeaponSize[];
export declare function makeSystemTypeChecklist(types: SystemType[]): SystemTypeChecklist;
export declare function flattenSystemTypeChecklist(types: SystemTypeChecklist): SystemType[];

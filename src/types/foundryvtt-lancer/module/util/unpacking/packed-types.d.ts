import { ActivationType, DamageType, FittingSize, FrameEffectUse, MountType, NpcFeatureType, OrgType, RangeType, SynergyLocation, SystemType, WeaponSize, WeaponType } from "../../enums";
export interface PackedActionData {
    name?: string;
    activation: ActivationType;
    cost?: number;
    frequency?: string;
    init?: string;
    trigger?: string;
    terse?: string;
    detail: string;
    pilot?: boolean;
    mech?: boolean;
    tech_attack?: boolean;
    hide_active?: boolean;
    synergy_locations?: string[];
    confirm?: string[];
    log?: string;
    ignore_used?: boolean;
    heat_cost?: number;
    id?: string;
    damage?: PackedDamageData[];
    range?: PackedRangeData[];
}
export interface PackedSkillData {
    id: string;
    name: string;
    description: string;
    detail: string;
    family: any;
    rank?: number;
    custom?: true;
    custom_desc?: string;
    custom_detail?: string;
}
export interface PackedDamageData {
    type?: DamageType;
    val?: string | number;
    override?: boolean;
}
export interface PackedRangeData {
    type?: RangeType;
    val?: string | number;
}
export interface PackedBonusData {
    id: string;
    val: string | number;
    damage_types?: DamageType[];
    range_types?: RangeType[];
    weapon_types?: WeaponType[];
    weapon_sizes?: WeaponSize[];
    overwrite?: boolean;
    replace?: boolean;
}
export interface PackedSynergyData {
    locations?: SynergyLocation[] | SynergyLocation;
    detail: string;
    system_types?: Array<SystemType | "any"> | SystemType | "any";
    weapon_types?: Array<WeaponType | "any"> | WeaponType | "any";
    weapon_sizes?: Array<WeaponSize | "any"> | WeaponSize | "any";
}
export interface PackedDeployableData {
    name: string;
    type: string;
    detail: string;
    activation?: ActivationType;
    deactivation?: ActivationType;
    recall?: ActivationType;
    redeploy?: ActivationType;
    range?: Range[];
    size: number;
    instances?: number;
    cost?: number;
    armor?: number;
    hp?: number;
    evasion?: number;
    edef?: number;
    heatcap?: number;
    repcap?: number;
    pilot?: boolean;
    mech?: boolean;
    sensor_range?: number;
    tech_attack?: number;
    save?: number;
    speed?: number;
    resistances?: string[];
    actions?: PackedActionData[];
    bonuses?: PackedBonusData[];
    synergies?: PackedSynergyData[];
    counters?: PackedCounterData[];
    tags?: PackedTagData[];
}
export interface PackedTagTemplateData {
    id: string;
    name: string;
    description: string;
    filter_ignore?: boolean;
    hidden?: boolean;
}
export interface PackedTagData {
    id: string;
    val?: string | number;
}
export interface PackedCounterData {
    id: string;
    name: string;
    min?: number;
    max?: number;
    default_value?: number;
    custom?: boolean;
}
export interface PackedCounterSaveData {
    id: string;
    val: number;
}
export interface PackedRankedData {
    id: string;
    rank: number;
    custom?: boolean;
    custom_desc?: string;
    custom_detail?: string;
}
export interface PackedAmmoData {
    name: string;
    description: string;
    cost?: number;
    allowed_types?: WeaponType[];
    allowed_sizes?: WeaponSize[];
    restricted_types?: WeaponType[];
    restricted_sizes?: WeaponSize[];
}
export interface PackedReserveData {
    type?: string;
    name?: string;
    label?: string;
    description?: string;
    resource_name?: string;
    resource_note?: string;
    resource_cost?: string;
    used: boolean;
    consumable: boolean;
    synergies?: PackedSynergyData[];
    id: string;
    deployables?: PackedDeployableData[];
    counters?: PackedCounterData[];
    integrated?: string[];
    bonuses?: PackedBonusData[];
    actions?: PackedActionData[];
}
export interface PackedOrganizationData {
    name: string;
    purpose: OrgType;
    description: string;
    efficiency: number;
    influence: number;
    actions: string;
    lid: string;
}
export interface PackedPilotData {
    campaign: string;
    group: string;
    sort_index: number;
    cloudID: string;
    cloudOwnerID: string;
    lastCloudUpdate: string;
    level: number;
    callsign: string;
    name: string;
    player_name: string;
    status: string;
    text_appearance: string;
    notes: string;
    history: string;
    portrait: string;
    cloud_portrait: string;
    background: string;
    mechSkills: [number, number, number, number];
    cc_ver: string;
    id: string;
    licenses: PackedRankedData[];
    skills: Array<PackedRankedData | (PackedSkillData & {
        custom: true;
    })>;
    talents: PackedRankedData[];
    reserves: PackedReserveData[];
    orgs: PackedOrganizationData[];
    bondId: string;
    xp: number;
    stress: number;
    maxStress: number;
    burdens: PackedClockBurdenData[];
    clocks: PackedClockBurdenData[];
    bondPowers: PackedBondPowerData[];
    powerSelections: number;
    bondAnswers: string[];
    minorIdeal: string;
    mechs: PackedMechData[];
    state?: IMechState;
    counter_data: PackedCounterSaveData[];
    custom_counters: PackedCounterData[];
    special_equipment?: {
        PilotArmor: [];
        PilotWeapons: [];
        PilotGear: [];
        Frames: [];
        MechWeapons: [];
        WeaponMods: [];
        MechSystems: [];
        SystemMods: [];
    };
    combat_history: {
        moves: 0;
        kills: 0;
        damage: 0;
        hp_damage: 0;
        structure_damage: 0;
        overshield: 0;
        heat_damage: 0;
        reactor_damage: 0;
        overcharge_uses: 0;
        core_uses: 0;
    };
    loadout?: PackedPilotLoadoutData;
    loadouts?: PackedPilotLoadoutData[];
    brews: string[];
    core_bonuses: string[];
    factionID: string;
    quirk: string;
    current_hp: number;
    resistances?: string[];
}
export interface PackedPilotLoadoutData {
    id: string;
    name: string;
    armor: (PackedPilotEquipmentState | null)[];
    weapons: (PackedPilotEquipmentState | null)[];
    gear: (PackedPilotEquipmentState | null)[];
    extendedWeapons: (PackedPilotEquipmentState | null)[];
    extendedGear: (PackedPilotEquipmentState | null)[];
}
export interface PackedPilotEquipmentState {
    id: string;
    destroyed: boolean;
    uses: number;
    cascading: false;
    customDamageType: null;
}
export interface IMechState {
    active_mech_id: string;
    stage: string;
    turn: number;
    actions: number;
    braced: boolean;
    overcharged: boolean;
    prepare: boolean;
    bracedCooldown: boolean;
    redundant: boolean;
    mounted: boolean;
    stats: {
        moves: number;
        kills: number;
        damage: number;
        hp_damage: number;
        structure_damage: number;
        overshield: number;
        heat_damage: number;
        reactor_damage: number;
        overcharge_uses: number;
        core_uses: number;
    };
    deployed: [];
}
export interface PackedMechData {
    name: string;
    notes: string;
    gm_note: string;
    portrait: string;
    cloud_portrait: string;
    overshield: number;
    burn: number;
    ejected: boolean;
    meltdown_imminent: boolean;
    cc_ver: string;
    core_active: boolean;
    id: string;
    active: boolean;
    current_structure: number;
    current_hp: number;
    current_stress: number;
    current_heat: number;
    current_repairs: number;
    current_core_energy: number;
    current_overcharge: number;
    frame: string;
    statuses: string[];
    conditions: string[];
    resistances: string[];
    reactions: string[];
    loadouts: PackedMechLoadoutData[];
    active_loadout_index: number;
    activations: number;
    reactor_destroyed: boolean;
    destroyed: boolean;
    defeat: string;
}
export interface PackedMechLoadoutData {
    id: string;
    name: string;
    systems: PackedEquipmentData[];
    integratedSystems: PackedEquipmentData[];
    mounts: PackedMountData[];
    integratedMounts: {
        weapon: PackedMechWeaponSaveData;
    }[];
    improved_armament: PackedMountData;
    integratedWeapon: PackedMountData;
    superheavy_mounting: PackedMountData;
}
export interface PackedEquipmentData {
    id: string;
    destroyed: boolean;
    cascading: boolean;
    note: string;
    uses?: number;
    flavorName?: string;
    flavorDescription?: string;
    customDamageType?: string;
}
export interface PackedMountData {
    mount_type: string;
    lock?: boolean;
    slots: PackedWeaponSlotData[];
    extra: PackedWeaponSlotData[];
    bonus_effects: string[];
}
export interface PackedWeaponSlotData {
    size: FittingSize;
    weapon: PackedMechWeaponSaveData | null;
}
export interface PackedMechWeaponSaveData extends PackedEquipmentData {
    loaded: boolean;
    mod?: PackedEquipmentData;
    customDamageType?: string;
    maxUseOverride?: number;
}
export interface IContentPackManifest {
    name: string;
    item_prefix: string;
    author: string;
    version: string;
    description?: string;
    website?: string;
    image_url?: string;
}
export interface IContentPackData {
    manufacturers?: PackedManufacturerData[];
    factions?: PackedFactionData[];
    coreBonuses?: PackedCoreBonusData[];
    frames?: PackedFrameData[];
    weapons?: PackedMechWeaponData[];
    systems?: PackedMechSystemData[];
    mods?: PackedWeaponModData[];
    pilotGear?: PackedPilotEquipmentData[];
    talents?: PackedTalentData[];
    bonds?: PackedBondData[];
    tags?: PackedTagTemplateData[];
    npcClasses?: PackedNpcClassData[];
    npcFeatures?: AnyPackedNpcFeatureData[];
    npcTemplates?: PackedNpcTemplateData[];
    skills?: PackedSkillData[];
    statuses?: PackedStatusData[];
    reserves?: PackedReserveData[];
    environments?: PackedEnvironmentData[];
    sitreps?: PackedSitrepData[];
}
export interface IContentPack {
    id: string;
    active: boolean;
    manifest: IContentPackManifest;
    data: IContentPackData;
}
interface PackedManufacturerData {
    name: string;
    logo: string;
    light: string;
    description: string;
    dark: string;
    quote: string;
    logo_url?: string;
    id: string;
}
interface PackedFactionData {
    name: string;
    description: string;
    logo: string;
    color: string;
    logo_url?: string;
    id: string;
}
export interface PackedCoreBonusData {
    name: string;
    effect: string;
    description: string;
    mounted_effect?: string;
    synergies?: PackedSynergyData[];
    id: string;
    bonuses?: PackedBonusData[];
    deployables?: PackedDeployableData[];
    counters?: PackedCounterData[];
    integrated?: string[];
    source: string;
    actions?: PackedActionData[];
}
export interface PackedFrameData {
    license_id?: string;
    license_level: number;
    name: string;
    mechtype: string[];
    y_pos: number;
    description: string;
    mounts: MountType[];
    stats: IFrameStats;
    image_url?: string;
    other_art?: IArtLocation[];
    id: string;
    traits: PackedFrameTraitData[];
    core_system: PackedCoreSystemData;
    source: string;
    variant?: string;
}
export interface IFrameStats {
    size: number;
    structure: number;
    stress: number;
    armor: number;
    hp: number;
    evasion: number;
    edef: number;
    heatcap: number;
    repcap: number;
    sensor_range: number;
    tech_attack: number;
    save: number;
    speed: number;
    sp: number;
}
export interface PackedCoreSystemData {
    name: string;
    description: string;
    activation: ActivationType;
    deactivation?: ActivationType;
    use?: FrameEffectUse;
    active_name: string;
    active_effect: string;
    active_synergies: PackedSynergyData[];
    passive_name?: string;
    passive_effect?: string;
    passive_synergies?: PackedSynergyData[];
    deployables?: PackedDeployableData[];
    counters?: PackedCounterData[];
    integrated?: string[];
    tags: PackedTagInstanceData[];
    active_bonuses?: PackedBonusData[];
    passive_bonuses?: PackedBonusData[];
    active_actions?: PackedActionData[];
    passive_actions?: PackedActionData[];
}
export interface PackedTagInstanceData {
    id: string;
    val?: string | number;
}
export interface IArtLocation {
    tag?: string;
    src?: string;
    url?: string;
}
export interface PackedFrameTraitData {
    name: string;
    description: string;
    use?: FrameEffectUse;
    synergies?: PackedSynergyData[];
    integrated?: string[];
    counters?: PackedCounterData[];
    deployables?: PackedDeployableData[];
    bonuses?: PackedBonusData[];
    actions?: PackedActionData[];
}
export interface PackedMechWeaponData {
    id: string;
    name: string;
    source: string;
    license: string;
    license_level: number;
    mount: WeaponSize;
    type?: WeaponType;
    damage?: PackedDamageData[];
    range?: PackedRangeData[];
    tags?: PackedTagInstanceData[];
    sp?: number;
    description: string;
    effect?: string;
    on_attack?: string;
    on_hit?: string;
    on_crit?: string;
    actions?: PackedActionData[];
    bonuses?: PackedBonusData[];
    synergies?: PackedSynergyData[];
    deployables?: PackedDeployableData[];
    counters?: PackedCounterData[];
    integrated?: string[];
    cost?: number;
    skirmish?: boolean;
    barrage?: boolean;
    profiles: PackedMechWeaponProfile[];
    no_attack?: boolean;
    no_bonus?: boolean;
    no_synergy?: boolean;
    no_mods?: boolean;
    no_core_bonus?: boolean;
    license_id?: string;
}
export type PackedMechWeaponProfile = Partial<Omit<PackedMechWeaponData, "id" | "profiles" | "source" | "license" | "license_level" | "mount" | "sp">>;
export interface PackedMechSystemData {
    name: string;
    license: string;
    license_level: number;
    type?: SystemType;
    sp: number;
    description: string;
    effect: string;
    synergies?: PackedSynergyData[];
    id: string;
    deployables?: PackedDeployableData[];
    integrated?: string[];
    counters?: PackedCounterData[];
    bonuses?: PackedBonusData[];
    actions?: PackedActionData[];
    ammo?: PackedAmmoData[];
    tags?: PackedTagInstanceData[];
    source: string;
    license_id?: string;
}
export interface PackedWeaponModData {
    name: string;
    sp: number;
    description: string;
    license: string;
    license_level: number;
    effect: string;
    synergies?: PackedSynergyData[];
    id: string;
    source: string;
    tags: PackedTagInstanceData[];
    added_tags?: PackedTagInstanceData[];
    deployables?: PackedDeployableData[];
    counters?: PackedCounterData[];
    bonuses?: PackedBonusData[];
    actions?: PackedActionData[];
    added_damage?: PackedDamageData[];
    added_range?: PackedRangeData[];
    integrated?: string[];
    restricted_types?: WeaponType[];
    restricted_sizes?: WeaponSize[];
    allowed_types?: WeaponType[];
    allowed_sizes?: WeaponSize[];
    license_id?: string;
}
export type PackedPilotEquipmentData = PackedPilotWeaponData | PackedPilotArmorData | PackedPilotGearData;
interface AllPilotStuffPackedData {
    id: string;
    name: string;
    description: string;
    actions?: PackedActionData[];
    bonuses?: PackedBonusData[];
    synergies?: PackedSynergyData[];
    deployables?: PackedDeployableData[];
    tags?: PackedTagInstanceData[];
}
export interface PackedPilotWeaponData extends AllPilotStuffPackedData {
    type: "Weapon";
    damage: PackedDamageData[];
    range: PackedRangeData[];
    effect?: string;
}
export interface PackedPilotGearData extends AllPilotStuffPackedData {
    type: "Gear";
}
export interface PackedPilotArmorData extends AllPilotStuffPackedData {
    type: "Armor";
}
export interface PackedTalentData {
    id: string;
    name: string;
    icon: string;
    terse: string;
    description: string;
    ranks: PackedTalentRank[];
}
export interface PackedTalentRank {
    name: string;
    description: string;
    exclusive: boolean;
    actions?: PackedActionData[];
    bonuses?: PackedBonusData[];
    synergies?: PackedSynergyData[];
    deployables?: PackedDeployableData[];
    counters?: PackedCounterData[];
    integrated?: string[];
}
export interface PackedBondData {
    id: string;
    name: string;
    major_ideals: string[];
    minor_ideals: string[];
    questions: PackedQuestionData[];
    powers: PackedBondPowerData[];
}
export interface PackedQuestionData {
    question: string;
    options: string[];
}
export interface PackedBondPowerData {
    name: string;
    description: string;
    frequency: string | undefined;
    veteran: boolean | undefined;
    master: boolean | undefined;
    prerequisite: string | undefined;
}
export interface PackedClockBurdenData {
    id: string;
    title: string;
    description: string;
    resolution: string;
    segments: number;
    progress: number;
}
interface AllNpcClassData {
    name: string;
    role: string;
    info: {
        flavor: string;
        tactics: string;
    };
    power: number;
}
export interface PackedNpcClassData extends AllNpcClassData {
    id: string;
    base_features: string[];
    optional_features: string[];
    stats: PackedNpcClassStats;
}
export interface PackedNpcClassStats {
    activations: number[];
    armor: number[];
    hp: number[];
    evade: number[];
    edef: number[];
    heatcap: number[];
    speed: number[];
    sensor: number[];
    save: number[];
    hull: number[];
    agility: number[];
    systems: number[];
    engineering: number[];
    size: number[][];
    structure?: number[];
    stress?: number[];
}
export type AnyPackedNpcFeatureData = PackedNpcTechData | PackedNpcTraitData | PackedNpcWeaponData | PackedNpcSystemData | PackedNpcReactionData;
interface PackedNpcFeatureData {
    id: string;
    name: string;
    origin: IOriginData;
    effect?: string;
    bonus?: object;
    override?: object;
    tags: PackedTagInstanceData[];
    locked: boolean;
    hide_active: boolean;
    type: NpcFeatureType;
}
export interface PackedNpcWeaponData extends PackedNpcFeatureData {
    weapon_type: string;
    damage: PackedNpcDamageData[];
    range: PackedRangeData[];
    on_hit: string;
    accuracy?: number[] | null;
    attack_bonus?: number[] | null;
    tags: PackedTagInstanceData[];
    type: NpcFeatureType.Weapon;
}
export interface PackedNpcTraitData extends PackedNpcFeatureData {
    type: NpcFeatureType.Trait;
}
export interface PackedNpcReactionData extends PackedNpcFeatureData {
    type: NpcFeatureType.Reaction;
    trigger: string;
}
export interface PackedNpcSystemData extends PackedNpcFeatureData {
    type: NpcFeatureType.System;
}
export interface PackedNpcTechData extends PackedNpcFeatureData {
    type: NpcFeatureType.Tech;
    tags: PackedTagInstanceData[];
    tech_type: string;
    accuracy?: number[] | null;
    attack_bonus?: number[] | null;
}
export interface IOriginData {
    type: "Class" | "Template";
    name: string;
    base: boolean;
}
export interface PackedNpcDamageData {
    type: string;
    damage: number[];
}
export interface PackedNpcTemplateData {
    name: string;
    description: string;
    power: number;
    id: string;
    base_features: string[];
    optional_features: string[];
}
export interface PackedStatusData {
    name: string;
    icon: string;
    id?: string;
    terse?: string;
    effects: string | string[];
    type: "Status" | "Condition";
}
export interface PackedEnvironmentData {
    id: string;
    name: string;
    description: string;
}
export interface PackedSitrepData {
    name: string;
    description: string;
    pcVictory: string;
    enemyVictory: string;
    noVictory?: string;
    deployment?: string;
    objective?: string;
    controlZone?: string;
    extraction?: string;
    id: string;
}
export {};

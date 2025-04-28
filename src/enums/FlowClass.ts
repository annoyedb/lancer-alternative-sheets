export enum FlowClass
{
    Standard = "lancer-flow-button",
    RollAttack = "roll-attack",
    RollDamage = "roll-damage",
    RollStat = "roll-stat",
    RollHASE = "roll-stat hase",
    RollTech = "roll-tech",
    SendToChat = "chat-flow-button",
    SendEffectToChat = "effect-flow",
    ResetOvercharge = "overcharge-reset",
    CoreActivation = "activation-flow",
    RechargeFeatures = "charge-macro",
    ContextMenu = "lancer-context-menu",
    Skill = "skill-flow",
    DeleteActiveEffect = "", // No flow class for this
    Inventory= "", // No flow class for this
    None = "NO_FLOW_CLASS",
}

export enum CustomFlowClass
{
    SendUnknownToChat = "SendUnknownToChat",
    RunMacro = "RunMacro",
}
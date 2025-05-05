import { preloadTemplates } from "./loader";
import { forwardData, logData } from "./helpers";
import { MechSheetBase } from "@/classes/mech/MechSheetBase";
import { NPCSheetBase } from "@/classes/npc/NPCSheetBase";
import { PilotSheetBase } from "@/classes/pilot/PilotSheetBase";
import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
import { RunMacroBase } from "@/classes/flows/RunMacro";
import { registerModuleSettings } from "@/scripts/settings";
import { registerMechSheetSettings, resetMechSheetData, resetMechSheetLocalData } from "@/scripts/mech/settings";
import { registerNPCSheetSettings, resetNPCSheetData } from "@/scripts/npc/settings";
import { registerPilotSheetSettings, resetPilotSheetData, resetPilotSheetLocalData } from "@/scripts/pilot/settings";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { SkillTriggerOtherBase } from "@/classes/flows/SkillTriggerOther";

Hooks.once("init", () =>
{
    registerHandlebarsHelpers();
    registerSettings();
});

Hooks.once("setup", async () =>
{
    preloadTemplates();

    setupSheets();
    setupEventListeners();
    registerFlows();
});

Hooks.once("ready", async () => {
    // @ts-expect-error It's not undefined; it's lying
    game.modules.get(LancerAlternative.Name).api = {
        settings: {
            resetMechSheetLocalData,
            resetMechSheetData,
            resetNPCSheetData,
            resetPilotSheetLocalData,
            resetPilotSheetData,
        },
    };
});

function registerHandlebarsHelpers()
{
    Handlebars.registerHelper("la_logData", logData);
    Handlebars.registerHelper("la_setDatastore", forwardData);
}

function registerSettings()
{
    registerModuleSettings();
    registerMechSheetSettings();
    registerNPCSheetSettings();
    registerPilotSheetSettings();
}

function registerFlows()
{
    // TODO: write PR to separate flow registration from hook call
    // We miss the 'lancer.registerFlows' hook, since it is called on init, but the 
    // classes are not ready for reading on init, so we have to grab the flows Map 
    // ourselves in the setup step
    const customFlows = [
        SendUnknownToChatBase.getInstance().setupFlow(),
        RunMacroBase.getInstance().setupFlow(),
        SkillTriggerOtherBase.getInstance().setupFlow(),
    ];
    
    const customSteps = [
        ...SendUnknownToChatBase.getInstance().setupFlowSteps(),
        ...RunMacroBase.getInstance().setupFlowSteps(),
        ...SkillTriggerOtherBase.getInstance().setupFlowSteps(),
    ];

    const flows = game.lancer.flows as Map<string, any>;
    for (const flow of customFlows)
    {
        flows.set(flow.name, flow);
    }

    const flowSteps = game.lancer.flowSteps as Map<string, any>;
    for (const step of customSteps)
    {
        flowSteps.set(step.name, step);
    }

    console.info("Lancer Alternative Sheets | Registered flows: ", 
        customFlows.map(flow => flow.name).join(", ")
    );
    console.info("Lancer Alternative Sheets | Registered steps: ", 
        customSteps.map(flowStep => flowStep.name).join(", ")
    );
}

function setupSheets()
{
    // TODO: write PR to define these earlier or separate initialization/exposure 
    // Declare extension classes at runtime since they're only defined at that point
    MechSheetBase.setupSheet();
    NPCSheetBase.setupSheet();
    PilotSheetBase.setupSheet();
}

function setupEventListeners()
{
    
}

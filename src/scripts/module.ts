import { applyTheme } from "./theme";
import { preloadTemplates } from "./loader";
import { logData } from "./helpers";
import { MechSheetBase } from "@/classes/mech/MechSheetBase";
import { NPCSheetBase } from "@/classes/npc/NPCSheetBase";
import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";

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

function registerHandlebarsHelpers()
{
    Handlebars.registerHelper("log", logData);
}

function registerSettings()
{
    // TODO: add settings in v12
    // registerMechSheetSettings();
}

function registerFlows()
{
    // TODO: write PR 
    // We miss the 'lancer.registerFlows' hook, since it is called on init, but the 
    // classes are not ready for reading on init, so we have to grab the flows Map 
    // ourselves in the setup step
    const customFlows = [
        SendUnknownToChatBase.setupFlow(),
    ];

    const flows = game.lancer.flows as Map<string, any>;
    for (const flow of customFlows)
    {
        flows.set(flow.name, flow);
    }

    console.info("Lancer Alternative Sheets | Registered flows: ", customFlows.join(", "));
}

function setupSheets()
{
    // TODO: write PR
    // Declare extension classes at runtime since they're only defined at that point
    MechSheetBase.setupSheet();
    NPCSheetBase.setupSheet();
}

function setupEventListeners()
{
    // TODO: write PR
    // Until a Lancer settings/theme hook is available, 
    // this blasts on every single time the settings close
    Hooks.on("closeSettingsConfig", applyTheme);
}

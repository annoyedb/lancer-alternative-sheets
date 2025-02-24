import { applyTheme, getTheme } from "./theme";
import { preloadTemplates } from "./loader";
import { frameManufacturer, frameName, frameUUID, logData, overchargeStage as overchargeStage, randomExtension } from "./helpers";
import { registerMechSheetSettings } from "./settings/mech-sheet";
import { MechSheetBase } from "@/classes/actor/MechSheetBase";

Hooks.once("init", () =>
{
    registerHandlebarsHelpers();
    registerSettings();
});

Hooks.once("setup", async () =>
{
    setupSheets();
    setupEventListeners();

    preloadTemplates();
});

function registerHandlebarsHelpers()
{
    Handlebars.registerHelper("log", logData);
    Handlebars.registerHelper("print", function (value) { console.log(value); });
    Handlebars.registerHelper("gt", function (this: any, a, b, options)
    {
        if (a > b)
        {
            return options.fn(this);
        } else
        {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("getTheme", getTheme)
    Handlebars.registerHelper("percent", function (a, b) { return (a / b) * 100; });
    Handlebars.registerHelper("getFrameName", frameName);
    Handlebars.registerHelper("getFrameManufacturer", frameManufacturer);
    Handlebars.registerHelper("getFrameUUID", frameUUID);
    Handlebars.registerHelper("overchargeStage", overchargeStage);
    Handlebars.registerHelper("randomExtension", randomExtension);
}

function registerSettings()
{
    registerMechSheetSettings();
}

function setupSheets()
{
    // Declare extension classes at runtime since they're only defined at that point
    MechSheetBase.setupSheet();
}

function setupEventListeners()
{
    // TODO: Until a Lancer settings/theme hook is available, 
    // this blasts on every single time the settings close
    Hooks.on("closeSettingsConfig", applyTheme);
}

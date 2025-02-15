import { getTheme } from "./theme";
import { deleteActiveEffect, LAMechSheetBase, renderActiveEffects, renderMechFrame, renderSystemMounts, renderWeaponMounts } from "./actor/mech-sheet";
import { preloadTemplates } from "./loader";
import { frameManufacturer, frameName, frameUUID, overchargeStage as overchargeStage, randomExtension } from "./helpers";
import { renderCoreBonuses, renderTalents } from "./actor/pilot-sheet";
import { registerMechSheetSettings } from "./settings/mech-sheet";
import { MechSheetBase } from "../classes/actor/MechSheetBase";

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
    Handlebars.registerHelper("renderActiveEffects", renderActiveEffects);
    Handlebars.registerHelper("renderWeaponMounts", renderWeaponMounts);
    Handlebars.registerHelper("renderSystemMounts", renderSystemMounts);
    Handlebars.registerHelper("renderMechFrame", renderMechFrame);
    Handlebars.registerHelper("renderTalents", renderTalents);
    Handlebars.registerHelper("renderCoreBonuses", renderCoreBonuses);
}

function registerSettings()
{
    registerMechSheetSettings();
}

function setupSheets()
{
    // Declare extension classes at runtime since they're only defined at that point
    LAMechSheetBase.setupSheet();
    MechSheetBase.setupSheet();
}

function setupEventListeners()
{
    Hooks.on("renderLASMechSheet", deleteActiveEffect);
}

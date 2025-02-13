import { getTheme } from "./theme";
import { deleteActiveEffect, LASMechSheetBase, renderActiveEffects, renderMechFrame, renderSystemMounts, renderWeaponMounts } from "./actor/mech-sheet";
import { preloadTemplates } from "./loader";
import { frameManufacturer, frameName, frameUUID, overchargeStage as overchargeStage, randomExtension } from "./helpers";
import { renderTalents } from "./actor/pilot-sheet";
import { applyCollapseListeners, initializeCollapses} from "./collapse";
import { registerMechSheetSettings } from "./settings/mech-sheet";
import { LancerAlternative } from "../enums/LancerAlternative";

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
}

function registerSettings()
{
    registerMechSheetSettings();
}

function setupSheets()
{
    // Declare extension classes at runtime since they're only defined at that point
    const LASMechSheet = class extends ((game.lancer.applications as any).LancerMechSheet as typeof ActorSheet)
    {        
        static override get defaultOptions()
        {
            return mergeObject(super.defaultOptions, LASMechSheetBase.mergeOptions);
        }

        override activateListeners(html: JQuery<HTMLElement>)
        {
            super.activateListeners(html);
            // PopOut! compatibility
            initializeCollapses(html);
            applyCollapseListeners(html);
        }
    }

    Actors.registerSheet(LancerAlternative.Name, LASMechSheet, {
        types: ["mech"], 
        label: "LA.SHEET.mech.label",
        makeDefault: false
    });
}

function setupEventListeners()
{
    Hooks.on("renderLASMechSheet", deleteActiveEffect);
}

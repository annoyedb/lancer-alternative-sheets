import { id as moduleID } from '../module.json';

export const TEMPLATE_PATHS = {
    mechSheetSvelte: `modules/${moduleID}/templates/la-mech-svelte.hbs`,
    npcSheetSvelte: `modules/${moduleID}/templates/la-npc-svelte.hbs`,
    pilotSheetSvelte: `modules/${moduleID}/templates/la-pilot-svelte.hbs`,
    deployableSheetSvelte: `modules/${moduleID}/templates/la-deployable-svelte.hbs`,

    featureCard: `modules/${moduleID}/templates/chat/feature-card.hbs`,

    pilotSettingsSubmenu: `modules/${moduleID}/templates/settings/la-pilot-settings-submenu.hbs`,
    mechSettingsSubmenu: `modules/${moduleID}/templates/settings/la-mech-settings-submenu.hbs`,
    npcSettingsSubmenu: `modules/${moduleID}/templates/settings/la-npc-settings-submenu.hbs`,
    deployableSettingsSubmenu: `modules/${moduleID}/templates/settings/la-deployable-settings-submenu.hbs`,
};

export const preloadTemplates = async function ()
{
    return foundry.applications.handlebars.loadTemplates(Object.values(TEMPLATE_PATHS));
}
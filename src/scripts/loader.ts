import { id as moduleID } from '../module.json';

export const TEMPLATE_PATHS = {
    mechSheetSvelte: `modules/${moduleID}/templates/la-mech-svelte.hbs`,
    npcSheetSvelte: `modules/${moduleID}/templates/la-npc-svelte.hbs`,
    pilotSheetSvelte: `modules/${moduleID}/templates/la-pilot-svelte.hbs`,
};

export const preloadTemplates = async function()
{
    //@ts-ignore
    return loadTemplates(TEMPLATE_PATHS);
}
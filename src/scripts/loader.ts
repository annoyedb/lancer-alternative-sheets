import { id as moduleID } from '../module.json';

export const TEMPLATE_PATHS = {
    mechSheetSvelte: `modules/${moduleID}/templates/la-mech-svelte.hbs`,
};

export const preloadTemplates = async function()
{
    //@ts-ignore
    return loadTemplates(TEMPLATE_PATHS);
}
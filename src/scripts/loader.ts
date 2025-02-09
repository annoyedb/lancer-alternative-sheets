import { id as moduleID} from '../module.json';

export const TEMPLATE_PATHS = {
    mechSheet: `modules/${moduleID}/templates/la-mech.hbs`,
};

export const preloadTemplates = async function()
{
    //@ts-ignore
    return loadTemplates(TEMPLATE_PATHS);
}
// Reimplementation of bare-minimum foundryvtt-lancer functionality

export function slugify(name: string, dash: string = "_"): string
{
    return name
        .trim()
        .replace(/[:\\\/-\s]+/g, dash)
        .toLowerCase();
}
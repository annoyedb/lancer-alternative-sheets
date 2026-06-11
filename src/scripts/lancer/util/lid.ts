// Reimplementation of bare-minimum foundryvtt-lancer functionality (src/module/util/lid.ts)

export function slugify(name: string, dash: string = "_"): string
{
    return name
        .trim()
        .replace(/[:\\\/-\s]+/g, dash)
        .toLowerCase();
}

// "Hydrated" DamageData
export class Damage implements Readonly<any>
{
    type: any;
    val: string;
    constructor(data: any)
    {
        this.type = data.type;
        this.val = data.val;
    }

    save(): any
    {
        return {
            type: this.type,
            val: this.val,
        };
    }

    copy(): Damage
    {
        return new Damage(this.save());
    }

    // Methods / getters / Various formatting options
    get icon(): string
    {
        return Damage.IconFor(this.type);
    }

    get text(): string
    {
        return `${this.val} ${this.type} Damage`;
    }

    get discord_emoji(): string
    {
        return Damage.DiscordEmojiFor(this.type);
    }

    get color(): string
    {
        return Damage.ColorFor(this.type);
    }

    // Returns the css font icon corresponding to the provided damage type
    public static IconFor(dt: any): string
    {
        return `cci-${dt.toLowerCase()}`;
    }

    public static DiscordEmojiFor(dt: any): string
    {
        return `:cc_damage_${dt.toLowerCase()}:`;
    }

    // Returns the css color name corresponding to the provided damage type
    public static ColorFor(dt: any): string
    {
        return `damage--${dt.toLowerCase()}`;
    }

    // Convert a damage type array to a checklist. If no damage types provided, assume all
    public static MakeChecklist(damages: any[]): any
    {
        let override = damages.length == 0;
        return {
            Burn: override || damages.includes("Burn"),
            Energy: override || damages.includes("Energy"),
            Explosive: override || damages.includes("Explosive"),
            Heat: override || damages.includes("Heat"),
            Kinetic: override || damages.includes("Kinetic"),
            Variable: override || damages.includes("Variable"),
        };
    }

    // Undo the above conversion
    public static FlattenChecklist(damages: any): any[]
    {
        return Object.keys(damages).filter(d => damages[d as keyof any]) as any[];
    }

    // Combine two arrays of damage. Does not edit originals
    public static CombineLists(base: Damage[], addition: Damage[]): Damage[]
    {
        // Make a copy of a.
        let result = base.map(d => d.copy());

        // For each b, try to find a matching a and add them together
        for (let add of addition)
        {
            // Get a match on
            let to_be_modified = result.find(result_d => result_d.type == add.type);
            if (to_be_modified)
            {
                // We found existing damage of that type. Utilize foundry dice parsing to merge terms
                try
                {
                    let base_formula = new Roll(to_be_modified.val);
                    let add_formula = new Roll(add.val);
                    for (let add_term of add_formula.terms)
                    {
                        let added = false;
                        for (let base_term of base_formula.terms)
                        {
                            // Combine like terms
                            //@ts-expect-error Appropriately narrow types are unavailable as of right now
                            if (add_term.number && base_term.number && add_term.faces === base_term.faces)
                            {
                                //@ts-expect-error Ditto
                                base_term.number += add_term.number;
                                added = true;
                                break;
                            }
                        }
                        //@ts-expect-error Ditto
                        if (!added && !add_term.operator)
                        {
                            // Create a new roll by appending the formulae
                            base_formula = new Roll(base_formula.formula + " + " + add_term.formula);
                        }
                    }
                    // Write back to string
                    to_be_modified.val = base_formula.formula;
                } catch (e)
                {
                    // If the above measure fails, do a simple addition
                    to_be_modified.val += ` + ${add.val}`;
                }
            } else
            {
                // Did not already have that damage type. Add it
                result.push(add.copy());
            }
        }
        return result;
    }
}
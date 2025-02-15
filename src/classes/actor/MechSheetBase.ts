import { mount } from "svelte";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import Sheet from "@/svelte/mech/Sheet.svelte";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { MechSheetData } from "@/interfaces/actor/MechSheetData";

export class MechSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-header__override",
                "lancer", "sheet", "actor", "mech", 
            ],
            template: TEMPLATE_PATHS.mechSheetSvelte,
            width: 900,
            height: 800,
            tabs: [
                {
                    navSelector: ".la-tabs",
                    contentSelector: ".la-content",
                    initial: "loadout"
                },
            ],
            scrollY: [".LA_SCROLL_BODY", ".LA_SCROLL_SIDEBAR"],
        }
    }

    static setupSheet()
    {
        // TODO: rename to LAMechSheet when old one is fully implemented
        const LAMechSheetSvelte = class extends ((game.lancer.applications as any).LancerMechSheet as typeof ActorSheet)
        {
            sheet: Sheet | null = null;

            static override get defaultOptions()
            {
                return mergeObject(super.defaultOptions, MechSheetBase.mergeOptions);
            }

            override async getData(): Promise<MechSheetData>
            {
                let data = await super.getData() as any;
                data.root = data;
                data.isActive = data.is_active;
                data.effectCategories = data.effect_categories;
                data.isLimited = data.limited;

                return data as MechSheetData;
            }
            
            // https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes
            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                super._injectHTML(html);
                let data = await this.getData() as any;
                
                this.sheet = mount(Sheet,
                {
                    target: html.find(".la-svelte")[0],
                    props: data,
                })
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                let data = await this.getData() as any;
                
                this.sheet = mount(Sheet,
                {
                    target: html.find(".la-svelte")[0],
                    props: data,
                })
            }
        }

        Actors.registerSheet(LancerAlternative.Name, LAMechSheetSvelte, {
            types: ["mech"],
            label: "LA.SHEET.mech.svelte.label",
            makeDefault: false
        });
    }
}
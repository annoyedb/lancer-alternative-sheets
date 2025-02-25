import { mount } from "svelte";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
import { applyCollapseListeners, initializeCollapses } from "@/scripts/collapse";
import { applyThemeTarget, getTheme } from "@/scripts/theme";
import Header from "@/svelte/mech/Header.svelte";
import Sidebar from "@/svelte/mech/Sidebar.svelte";
import Status from "@/svelte/mech/Status.svelte";
import Loadout from "@/svelte/mech/Loadout.svelte";
import HaseDisplay from "@/svelte/actor/HaseDisplay.svelte";
import { getLocalized } from "@/scripts/helpers";

export class MechSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-override__header", "clipped-alt",
                "lancer", "sheet", "actor", "mech", getTheme()
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
        // Unfortunately, since we are mounting from a Foundry class, and more specifically,
        // from Lancer's extension of a ActorSheet, we have to essentially run setup 'twice'
        //
        // Hopefully since the 'first time' should end in an early leaf node, it won't be too bad
        const LAMechSheet = class extends ((game.lancer.applications as any).LancerMechSheet as typeof ActorSheet)
        {
            private _themeDirty: boolean;
            private get themeDirty(): boolean { return this._themeDirty; }
            private set themeDirty(value: boolean) { this._themeDirty = value; }

            constructor(...args: [any])
            {
                super(...args);
                this._themeDirty = false;

                // TODO: Until a Lancer settings/theme hook is available, 
                // this blasts on every single time the settings close
                Hooks.on("closeSettingsConfig", () => { this.themeDirty = true });
            }

            static override get defaultOptions()
            {
                return mergeObject(super.defaultOptions, MechSheetBase.mergeOptions);
            }

            override activateListeners(html: JQuery<HTMLElement>)
            {
                super.activateListeners(html);

                this.reapplyImgListener(html);
                initializeCollapses(html); // PopOut! compatibility override
                applyCollapseListeners(html); // PopOut! compatibility override
            }

            override async getData(): Promise<MechSheetProps>
            {
                let data = await super.getData() as any;
                data.isActive = data.is_active;
                data.effectCategories = data.effect_categories;
                data.isLimited = data.limited;
                data.isOwner = data.owner;
                return data as MechSheetProps;
            }
            
            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                // (#2) Super jank way of trying to overload however Foundry decided 
                // to cache this element to apply theme settings at the Application level
                //
                // Only seems to need to be done once and then _injectHTML will recache it
                // That or `html` is mutable data in which case lolwhatever#JavaScript
                if (this.themeDirty) applyThemeTarget(html);

                super._injectHTML(html);
                let data = await this.getData() as any;
                
                this.mountComponents(html, data);

                this.activateListeners(html);
                this.themeDirty = false;
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                let data = await this.getData() as any;
                
                this.mountComponents(html, data);

                this.activateListeners(html);
                // Saving and restoring scroll positions calls before rerender, so 
                // restore the scroll positions after the rerender
                this._restoreScrollPositions(html);
            }

            mountComponents(html: JQuery<HTMLElement>, data: any)
            {
                // (#1)
                mount(Header,
                {
                    target: html.find(".la-SVELTE-HEADER")[0],
                    props: data,
                });
                mount(Sidebar,
                {
                    target: html.find(".la-SVELTE-SIDEBAR")[0],
                    props: data,
                });
                mount(Status,
                {
                    target: html.find(".la-SVELTE-STATUS")[0],
                    props: data,
                });
                mount(Loadout,
                {
                    target: html.find(".la-SVELTE-LOADOUT")[0],
                    props: data,
                });
                mount(HaseDisplay,
                {
                    target: html.find(".la-SVELTE-HASE")[0],
                    props: data,
                });
            }

            reapplyImgListener(html: JQuery<HTMLElement>)
            {
                html.find('img[data-edit="img"]').each((_, img) => {
                    $(img).on('click', this._onEditImage.bind(this));
                });
            }
        }

        Actors.registerSheet(LancerAlternative.Name, LAMechSheet, {
            types: ["mech"],
            label: getLocalized("LA.SHEET.mech.label"),
            makeDefault: false
        });
    }
}
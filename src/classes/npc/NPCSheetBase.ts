import { LancerAlternative } from "@/enums/LancerAlternative";
import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
import { applyCollapseListeners, initializeCollapses } from "@/scripts/collapse";
import { getLocalized } from "@/scripts/helpers";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { applyThemeTarget, getTheme } from "@/scripts/theme";
import Body from "@/svelte/npc/Body.svelte";
import Header from "@/svelte/npc/Header.svelte";
import { mount } from "svelte";

export class NPCSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-override__header", "clipped-alt",
                "lancer", "sheet", "actor", "npc", getTheme()
            ],
            template: TEMPLATE_PATHS.npcSheetSvelte,
            width: 500,
            height: 700,
            scrollY: [".LA_SCROLL_BODY"],
        }
    }

    static setupSheet()
    {
        const LANPCSheet = class extends ((game.lancer.applications as any).LancerNPCSheet as typeof ActorSheet)
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

            static override get defaultOptions(): ActorSheet.Options
            {
                return mergeObject(super.defaultOptions, NPCSheetBase.mergeOptions);
            }
            
            override async getData(): Promise<NPCSheetProps>
            {
                let data = await super.getData() as any;
                data.effectCategories = data.effect_categories;
                data.isLimited = data.limited;
                data.isOwner = data.owner;
                return data as NPCSheetProps;
            }
            
            override activateListeners(html: JQuery<HTMLElement>)
            {
                super.activateListeners(html);

                this.reapplyImgListener(html);
                initializeCollapses(html); // PopOut! compatibility override
                applyCollapseListeners(html); // PopOut! compatibility override
            }
            
            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                // (#2) 
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
                mount(Body,
                {
                    target: html.find(".la-SVELTE-BODY")[0],
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

        Actors.registerSheet(LancerAlternative.Name, LANPCSheet, {
            types: ["npc"],
            label: getLocalized("LA.SHEET.npc.label"),
            makeDefault: false
        });
    }
}
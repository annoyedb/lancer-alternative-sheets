import { LancerAlternative } from "@/enums/LancerAlternative";
import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
import { getLocalized } from "@/scripts/helpers";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { applyThemeTo, getSystemTheme } from "@/scripts/theme";
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
                "lancer", "sheet", "actor", "npc", getSystemTheme()
            ],
            template: TEMPLATE_PATHS.npcSheetSvelte,
            width: 500,
            height: 800,
            scrollY: [".LA_SCROLL_BODY"],
        }
    }

    static setupSheet()
    {
        const LANPCSheet = class extends ((game.lancer.applications as any).LancerNPCSheet as typeof ActorSheet)
        {
            constructor(...args: [any])
            {
                super(...args);

                // TODO: Until a Lancer settings/theme hook is available, 
                // this blasts on every single time the settings close
                Hooks.on("closeSettingsConfig", () =>
                {
                    this.render();
                });
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
            }

            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                super._injectHTML(html);
                applyThemeTo(this.element); // (#1)
                let data = await this.getData() as any;

                this.mountComponents(html, data);

                this.activateListeners(html);
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                applyThemeTo(element);
                let data = await this.getData() as any;

                this.mountComponents(html, data);

                this.activateListeners(html);
                // Saving and restoring scroll positions calls before rerender, so 
                // restore the scroll positions after the rerender
                this._restoreScrollPositions(html);
            }

            mountComponents(html: JQuery<HTMLElement>, data: any)
            {
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
                html.find('img[data-edit="img"]').each((_, img) =>
                {
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
import { mount } from "svelte";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
import { setSheetStore, getSheetStore } from '@/scripts/store/module-store';
import { dataMap, getLocalized } from "@/scripts/helpers";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { getNPCSheetHeight, getNPCSheetWidth } from "@/scripts/npc/settings";
import { applyThemeTo, getSystemTheme } from "@/scripts/theme";
import { getThemeOverride } from '@/scripts/npc/settings';
import { unregisterTrackedHooks } from '@/scripts/store/hooks';
import Loadout from "@/svelte/npc/Loadout.svelte";
import Header from "@/svelte/npc/Header.svelte";
import Activity from '@/svelte/npc/Activity.svelte';
import Status from "@/svelte/npc/Status.svelte";

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
            width: getNPCSheetWidth() || 500,
            height: getNPCSheetHeight() || 800,
            tabs: [
                {
                    navSelector: ".la-tabs",
                    contentSelector: ".la-content",
                    initial: "loadout"
                },
            ],
            scrollY: [".la-SCROLL_BODY"],
        }
    }

    static setupSheet()
    {
        const LANPCSheet = class extends ((game.lancer.applications as any).LancerNPCSheet as typeof ActorSheet)
        {
            constructor(...args: [any])
            {
                super(...args);
                
                Hooks.on("laOverrideTheme", (uuid: string, theme: string) =>
                {
                    if (uuid !== this.actor.uuid)
                        return;
                    setSheetStore(this.actor.uuid, {
                        currentTheme: theme,
                    });
                    this.render();
                })

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
                return data as NPCSheetProps;
            }

            override activateListeners(html: JQuery<HTMLElement>)
            {
                super.activateListeners(html);
            }

            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                super._injectHTML(html);
                setSheetStore(this.actor.uuid, {
                    currentTheme: getThemeOverride(this.actor.uuid)
                });
                applyThemeTo(this.element, getSheetStore(this.actor.uuid).currentTheme);

                let data = dataMap[this.actor.uuid];

                this.mountComponents(html, data);
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                applyThemeTo(element, getSheetStore(this.actor.uuid).currentTheme);

                let data = dataMap[this.actor.uuid];

                this.mountComponents(html, data);

                // Saving and restoring scroll positions calls before rerender, so 
                // restore the scroll positions after the rerender
                this._restoreScrollPositions(html);
            }

            mountComponents(html: JQuery<HTMLElement>, data: any)
            {
                unregisterTrackedHooks(this.actor.uuid); // Untrack all hooks that were registered from Svelte components
                mount(Header,
                    {
                        target: html.find(".la-SVELTE-HEADER")[0],
                        props: data,
                    });
                mount(Loadout,
                    {
                        target: html.find(".la-SVELTE-LOADOUT")[0],
                        props: data,
                    });
                mount(Status,
                    {
                        target: html.find(".la-SVELTE-STATUS")[0],
                        props: data,
                    });
                mount(Activity, 
                    {
                        target: html.find(".la-SVELTE-ACTIVITY")[0],
                        props: data,
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
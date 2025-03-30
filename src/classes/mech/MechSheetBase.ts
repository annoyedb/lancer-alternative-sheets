import { mount } from "svelte";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { applyThemeTo, getSystemTheme } from "@/scripts/theme";
import { setActiveTab } from "@/scripts/advanced";
import { getLocalized } from "@/scripts/helpers";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
import Header from "@/svelte/mech/Header.svelte";
import Sidebar from "@/svelte/mech/Sidebar.svelte";
import Status from "@/svelte/mech/Status.svelte";
import Loadout from "@/svelte/mech/Loadout.svelte";
import HaseDisplay from "@/svelte/actor/HaseDisplay.svelte";
import AdvancedSettings from "@/svelte/mech/settings/AdvancedSettings.svelte";
import AdvancedSettingsNav from "@/svelte/mech/settings/AdvancedSettingsNav.svelte";
import { getThemeOverride } from "@/scripts/mech/settings";
import { unregisterTrackedHooks } from "@/scripts/hooks";
import Activity from "@/svelte/mech/Activity.svelte";
import { ActiveTab } from "@/enums/ActiveTab";
import { setIntroRun } from "@/scripts/text-log";

export class MechSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-override__header", "clipped-alt",
                "lancer", "sheet", "actor", "mech", getSystemTheme()
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
                {
                    navSelector: ".la-tabs-secondary",
                    contentSelector: ".la-content-secondary",
                    initial: "statistics"
                }
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
            constructor(...args: [any])
            {
                super(...args);

                Hooks.on("laOverrideTheme", (uuid: string) =>
                {
                    if (uuid !== this.actor.uuid)
                        return;

                    this.render();
                })

                // TODO: Write a PR. Until a Lancer settings/theme hook is available, 
                // this blasts on every single time the settings close
                Hooks.on("closeSettingsConfig", () =>
                {
                    this.render();
                    setIntroRun(this.actor.uuid, false);
                });
            }

            static override get defaultOptions()
            {
                return mergeObject(super.defaultOptions, MechSheetBase.mergeOptions);
            }

            override activateListeners(html: JQuery<HTMLElement>)
            {
                super.activateListeners(html);

                this.applyTabListener(html);
                this.reapplyImgListener(html);
            }

            // The more pressing issue is whether or not this 
            // function's is networked and if it's return is internally cached
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
                super._injectHTML(html);
                // (#1) Foundry caches the root window somewhere but can't find a way 
                // to update the cached element, so we have to reapply the theme every time. 
                // This isn't currently a huge deal since it's just a targeted class swap
                applyThemeTo(this.element, getThemeOverride(this.actor.uuid));

                let data = await this.getData() as any;

                this.mountComponents(html, data);

                this.activateListeners(html);
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                // (#1)
                applyThemeTo(element, getThemeOverride(this.actor.uuid));
                let data = await this.getData() as any;

                this.mountComponents(html, data);

                this.activateListeners(html);
                // Saving and restoring scroll positions calls before rerender, so 
                // restore the scroll positions after the rerender
                this._restoreScrollPositions(html);
            }

            mountComponents(html: JQuery<HTMLElement>, data: any)
            {
                // Untrack all hooks that are registered in Svelte
                unregisterTrackedHooks();
                mount(Header, {
                    target: html.find(".la-SVELTE-HEADER")[0],
                    props: data,
                });
                mount(AdvancedSettingsNav, {
                    target: html.find(".la-SVELTE-ADVANCEDNAV")[0],
                    props: data,
                });
                mount(Sidebar, {
                    target: html.find(".la-SVELTE-SIDEBARSTATISTICS")[0],
                    props: data,
                });
                mount(Activity, {
                    target: html.find(".la-SVELTE-SIDEBARACTIVITY")[0],
                    props: data,
                })
                mount(Status, {
                    target: html.find(".la-SVELTE-STATUS")[0],
                    props: data,
                });
                mount(AdvancedSettings, {
                    target: html.find(".la-SVELTE-ADVANCED")[0],
                    props: data,
                });
                mount(Loadout, {
                    target: html.find(".la-SVELTE-LOADOUT")[0],
                    props: data,
                });
                mount(HaseDisplay, {
                    target: html.find(".la-SVELTE-HASE")[0],
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

            applyTabListener(html: JQuery<HTMLElement>)
            {
                html.find('.la-nav__island>.la-tabs>.la-tab').each((_, button) =>
                {
                    $(button).on('click', (event) =>
                    {
                        const tab = $(event.currentTarget).data('tab');
                        setActiveTab(this.actor.uuid, ActiveTab.Primary, tab);
                    });
                });

                html.find('.la-nav-secondary__island>.la-tabs-secondary>.la-tab').each((_, button) => 
                {
                    $(button).on('click', (event) =>
                    {
                        const tab = $(event.currentTarget).data('tab');
                        setActiveTab(this.actor.uuid, ActiveTab.Secondary, tab);
                    });
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
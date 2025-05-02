import { mount } from "svelte";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { applyThemeTo, getSystemTheme } from "@/scripts/theme";
import { setActiveTab } from "@/scripts/store/advanced";
import { getLocalized } from "@/scripts/helpers";
import { setIntroRun } from "@/scripts/store/text-log";
import { getPilotSheetTooltipEnabled, getThemeOverride } from "@/scripts/pilot/settings";
import { unregisterTrackedHooks } from "@/scripts/store/hooks";
import { getSheetStore, setSheetStore } from "@/scripts/store/store";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { ActiveTab } from "@/enums/ActiveTab";
import { TextLogHook } from "@/enums/TextLogHook";
import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
import Header from "@/svelte/pilot/Header.svelte";
import Sidebar from "@/svelte/pilot/Sidebar.svelte";
import Equipment from "@/svelte/pilot/Equipment.svelte";
import Bond from "@/svelte/pilot/Bond.svelte";
import HaseDisplay from "@/svelte/actor/HaseDisplay.svelte";
import AdvancedSettings from "@/svelte/pilot/settings/AdvancedSettings.svelte";
import AdvancedSettingsNav from "@/svelte/pilot/settings/AdvancedSettingsNav.svelte";
import Activity from "@/svelte/pilot/Activity.svelte";
import Abilities from "@/svelte/pilot/Abilities.svelte";

export class PilotSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-override__header", "clipped-alt",
                "lancer", "sheet", "actor", "pilot", getSystemTheme()
            ],
            template: TEMPLATE_PATHS.pilotSheetSvelte,
            width: 900,
            height: 800,
            tabs: [
                {
                    navSelector: ".la-tabs",
                    contentSelector: ".la-content",
                    initial: "equipment"
                },
                {
                    navSelector: ".la-tabs-secondary",
                    contentSelector: ".la-content-secondary",
                    initial: "statistics"
                },
                {
                    navSelector: ".la-tabs-tertiary",
                    contentSelector: ".la-content-tertiary",
                    initial: "loadout"
                },
                {
                    navSelector: ".la-tabs-quaternary",
                    contentSelector: ".la-content-quaternary",
                    initial: "mechs"
                }
            ],
            scrollY: [".la-SCROLL_BODY", ".la-SCROLL_SIDEBAR"],
        }
    }

    static setupSheet()
    {
        // Unfortunately, since we are mounting from a Foundry class, and more specifically,
        // from Lancer's extension of a ActorSheet, we have to essentially run setup 'twice'
        //
        // Hopefully since the 'first time' should end in an early leaf node, it won't be too bad
        const LAPilotSheet = class extends ((game.lancer.applications as any).LancerPilotSheet as typeof ActorSheet)
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
                return mergeObject(super.defaultOptions, PilotSheetBase.mergeOptions);
            }

            override activateListeners(html: JQuery<HTMLElement>)
            {
                super.activateListeners(html);

                this.applyTabListener(html);
                this.reapplyImgListener(html);
            }

            // The more pressing issue is whether or not this 
            // function's is networked and if it's return is internally cached
            override async getData(): Promise<PilotSheetProps>
            {
                let data = await super.getData() as any;
                data.effectCategories = data.effect_categories;
                data.isLimited = data.limited;
                data.isOwner = data.owner;
                return data as PilotSheetProps;
            }

            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                super._injectHTML(html);
                setSheetStore(this.actor.uuid, {
                    currentTheme: getThemeOverride(this.actor.uuid)
                });
                applyThemeTo(this.element, getSheetStore(this.actor.uuid).currentTheme);

                let data = await this.getData() as any;

                this.mountComponents(html, data);

                this.activateListeners(html);
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                applyThemeTo(element, getSheetStore(this.actor.uuid).currentTheme);
                let data = await this.getData() as any;

                this.mountComponents(html, data);

                this.activateListeners(html);
                // Saving and restoring scroll positions calls before rerender, so 
                // restore the scroll positions after the rerender
                this._restoreScrollPositions(html);
            }

            mountComponents(html: JQuery<HTMLElement>, data: any)
            {
                unregisterTrackedHooks(this.actor.uuid); // Untrack all hooks that were registered from Svelte components
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
                });
                mount(Equipment, {
                    target: html.find(".la-SVELTE-EQUIPMENT")[0],
                    props: data,
                });
                mount(Abilities, {
                    target: html.find(".la-SVELTE-ABILITIES")[0],
                    props: data,
                });
                mount(Bond, {
                    target: html.find(".la-SVELTE-BONDS")[0],
                    props: data,
                })
                mount(AdvancedSettings, {
                    target: html.find(".la-SVELTE-ADVANCED")[0],
                    props: data,
                });
                mount(HaseDisplay, {
                    target: html.find(".la-SVELTE-HASE")[0],
                    props: {
                        ...data,
                        tooltipEnabled: getPilotSheetTooltipEnabled(),
                        logType: TextLogHook.PilotHeader,
                        logTypeReset: TextLogHook.PilotHeaderReset,
                    },
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

        Actors.registerSheet(LancerAlternative.Name, LAPilotSheet, {
            types: ["pilot"],
            label: getLocalized("LA.SHEET.pilot.label"),
            makeDefault: false
        });
    }
}
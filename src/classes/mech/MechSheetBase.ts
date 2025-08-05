import { mount } from "svelte";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { applyThemeTo, getCSSSystemTheme } from "@/scripts/theme";
import { setActiveTab } from "@/scripts/store/advanced";
import { dataMap, getLocalized } from "@/scripts/helpers";
import { getMechSheetTooltipEnabled, getThemeOverride } from "@/scripts/mech/settings";
import { unregisterTrackedHooks } from "@/scripts/store/hooks";
import { setIntroRun } from "@/scripts/store/text-log";
import { SheetStore } from "@/scripts/store/module-store";
import { LancerAlternative } from "@/enums/LancerAlternative";
import { ActiveTab } from "@/enums/ActiveTab";
import { TextLogHook } from "@/enums/TextLogHook";
import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
import Header from "@/svelte/mech/Header.svelte";
import Sidebar from "@/svelte/mech/Sidebar.svelte";
import Status from "@/svelte/mech/Status.svelte";
import Loadout from "@/svelte/mech/Loadout.svelte";
import HaseDisplay from "@/svelte/actor/HaseArray.svelte";
import AdvancedSettings from "@/svelte/mech/settings/AdvancedSettings.svelte";
import AdvancedSettingsNav from "@/svelte/mech/settings/AdvancedSettingsNav.svelte";
import Activity from "@/svelte/mech/Activity.svelte";

export class MechSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-override__header", "clipped-alt",
                "lancer", "sheet", "actor", "mech", getCSSSystemTheme()
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
            scrollY: [".la-SCROLL-BODY", ".la-SCROLL-SIDEBAR"],
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

                Hooks.on("laOverrideTheme", (uuid: string, theme: string) =>
                {
                    if (uuid !== this.actor.uuid)
                        return;
                    SheetStore.set(this.actor.uuid, {
                        currentTheme: theme,
                    });
                    this.render();
                })

                // (#6)
                Hooks.on("laForceRerender", (uuid: string, callback?: () => void) => {
                    if (uuid !== this.actor.uuid)
                        return;
                    this.render();
                    if (callback)
                        callback();
                });

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
            }

            override async getData(): Promise<MechSheetProps>
            {
                let data = await super.getData() as any;
                return data as MechSheetProps;
            }

            
            /** (#10) - As of V12, there's a section of code in the Lancer system that bugs out actor/token image assignment in the AppV1 LancerActorSheet
             * ...
             * // Update token image if it matches the old actor image - keep in sync
             * if (this.actor.img === token.texture.src && this.actor.img !== formData["img"]) {
             *   formData["prototypeToken.texture.src"] = formData["img"];
             * }
             * ...
             * 
             * We need to ensure prototypeToken.texture.src exists to be set by Foundry
             */
            // @ts-expect-error We're overriding a function in LancerActorSheet
            override _propagateData(formData: any)
            {
                // @ts-expect-error We're overriding a function in LancerActorSheet
                super._propagateData(formData);
                
                delete formData["prototypeToken.texture.src"]; // GO AWAY MYSTERY MAN AAAAAAA
                const updateToken = SheetStore.get(this.actor.uuid).selectedTokenImage; // (#12)
                if (updateToken)
                {
                    formData["prototypeToken.texture.src"] = updateToken;
                }
            }

            override async _injectHTML(html: JQuery<HTMLElement>): Promise<void>
            {
                super._injectHTML(html);
                SheetStore.set(this.actor.uuid, {
                    currentTheme: getThemeOverride(this.actor.uuid)
                });
                applyThemeTo(this.element, SheetStore.get(this.actor.uuid).currentTheme);

                this.mountComponents(html, dataMap[this.actor.uuid]);
            }

            override async _replaceHTML(element: JQuery<HTMLElement>, html: JQuery<HTMLElement>): Promise<void>
            {
                super._replaceHTML(element, html);
                applyThemeTo(element, SheetStore.get(this.actor.uuid).currentTheme);
                
                this.mountComponents(html, dataMap[this.actor.uuid]);
                
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
                    props: {
                        pilot: data.pilot,
                        actor: data.actor,
                        system: data.system,
                        tooltipEnabled: getMechSheetTooltipEnabled(),
                        logType: TextLogHook.MechHeader,
                        logTypeReset: TextLogHook.MechHeaderReset,
                    },
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
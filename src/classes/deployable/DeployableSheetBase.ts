import { mount } from "svelte";
import { LancerAlternative } from "@/enums/LancerAlternative";
import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
import { SheetStore } from '@/scripts/store/module-store';
import { dataMap, getLocalized } from "@/scripts/helpers";
import { TEMPLATE_PATHS } from "@/scripts/loader";
import { getDeployableSheetHeight, getDeployableSheetWidth } from "@/scripts/deployable/settings";
import { applyThemeTo, getCSSSystemTheme } from "@/scripts/theme";
import { getThemeOverride } from '@/scripts/deployable/settings';
import { unregisterTrackedHooks } from '@/scripts/store/hooks';
import Detail from "@/svelte/deployable/Detail.svelte";
import Header from "@/svelte/deployable/Header.svelte";
import Activity from '@/svelte/deployable/Activity.svelte';
// import Status from "@/svelte/deployable/Status.svelte";

export class DeployableSheetBase
{
    static get mergeOptions()
    {
        return {
            classes: [
                "la-common", "la-override__header", "clipped-alt",
                "lancer", "sheet", "actor", "deployable", getCSSSystemTheme()
            ],
            template: TEMPLATE_PATHS.deployableSheetSvelte,
            width: getDeployableSheetWidth() || 500,
            height: getDeployableSheetHeight() || 800,
            tabs: [
                {
                    navSelector: ".la-tabs",
                    contentSelector: ".la-content",
                    initial: "detail"
                },
            ],
            scrollY: [".la-SCROLL_BODY"],
        }
    }

    static setupSheet()
    {
        const LADeployableSheet = class extends ((game.lancer.applications as any).LancerDeployableSheet as typeof ActorSheet)
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

                // TODO: Until a Lancer settings/theme hook is available, 
                // this blasts on every single time the settings close
                Hooks.on("closeSettingsConfig", () =>
                {
                    this.render();
                });
            }

            static override get defaultOptions(): ActorSheet.Options
            {
                return mergeObject(super.defaultOptions, DeployableSheetBase.mergeOptions);
            }

            override async getData(): Promise<DeployableSheetProps>
            {
                let data = await super.getData() as any;
                return data as DeployableSheetProps;
            }

            override activateListeners(html: JQuery<HTMLElement>)
            {
                super.activateListeners(html);
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
                mount(Header,
                    {
                        target: html.find(".la-SVELTE-HEADER")[0],
                        props: data,
                    });
                mount(Detail,
                    {
                        target: html.find(".la-SVELTE-DETAIL")[0],
                        props: data,
                    });
                // mount(Status,
                //     {
                //         target: html.find(".la-SVELTE-STATUS")[0],
                //         props: data,
                //     });
                mount(Activity, 
                {
                    target: html.find(".la-SVELTE-ACTIVITY")[0],
                    props: data,
                });
            }
        }

        Actors.registerSheet(LancerAlternative.Name, LADeployableSheet, {
            types: ["deployable"],
            label: getLocalized("LA.SHEET.deployable.label"),
            makeDefault: false
        });
    }
}
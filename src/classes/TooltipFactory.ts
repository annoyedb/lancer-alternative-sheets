import type { SvelteTooltipProps } from "@/interfaces/actor/SvelteTooltipProps";
import type { TooltipSettings } from "@/interfaces/foundry/TooltipSettings";
import Tooltip from "@/svelte/actor/tooltip/Tooltip.svelte";
import { mount } from "svelte";

export class TooltipFactory
{
    // CSS classes need to be applied via the `data-tooltip-class` attribute
    public static buildTooltip(text: string, header?: string): string 
    {
        return `
            ${header
                ? `<h3 class="la-tooltip__header">${header}</h3>`
                : ""
            }
            <div class="la-tooltip__content">
                ${text}
            </div>
        `;
    }

    // (#5) Locked tooltips (and potentially all tooltips created through the manager) do not 
    // work with modules such as PopOut! A custom solution would have to be rolled out
    public static renderTooltip(
        event: MouseEvent,
        tooltipSettings: TooltipSettings
    )
    {
        //@ts-expect-error Tooltip Manager
        const manager = game.tooltip;

        const options: any = {};

        if (tooltipSettings.direction)
        {
            options.direction = tooltipSettings.direction;
        }

        if (tooltipSettings.text)
        {
            options.text = tooltipSettings.text;
        }

        if (tooltipSettings.locked)
        {
            options.locked = tooltipSettings.locked;
        }

        if (tooltipSettings.cssClass)
        {
            options.cssClass = tooltipSettings.cssClass;
        }

        manager.activate(event.currentTarget, options);
    }

    // (#5)
    public static renderTooltipSvelte(
        event: MouseEvent,
        props: SvelteTooltipProps,
        tooltipSettings: TooltipSettings
    )
    {
        //@ts-expect-error Tooltip Manager
        const manager = game.tooltip;

        const mountDiv: HTMLElement = document.createElement('div');
        mountDiv.className = 'la-tooltip-mount -widthfull';

        mount(Tooltip,
            {
                target: mountDiv,
                props: props,
            }
        )

        const options: any = {
            content: mountDiv,
        };

        if (tooltipSettings.direction)
        {
            options.direction = tooltipSettings.direction;
        }

        if (tooltipSettings.locked)
        {
            options.locked = tooltipSettings.locked;
        }

        if (tooltipSettings.cssClass)
        {
            options.cssClass = tooltipSettings.cssClass;
        }

        manager.activate(event.currentTarget, options);

        // Observe when this is removed from the DOM
        const root = mountDiv.parentElement;
        const observer = new MutationObserver((mutations) =>
        {
            mutations.forEach((mutation) =>
            {
                if (root && Array.from(mutation.removedNodes).includes(root))
                {
                    observer.disconnect();
                    props.unrenderCallback?.();
                }
            });
        });

        if (root && root.parentNode)
        {
            observer.observe(root.parentNode, { childList: true });
        }

        return root;
    }

    public static unrenderTooltip(element: HTMLElement | null | undefined)
    {
        if (!element)
            return;
        //@ts-expect-error Tooltip Manager
        const manager = game.tooltip;

        manager.dismissLockedTooltip(element);
    }

    public static unrenderTooltips()
    {
        //@ts-expect-error Tooltip Manager
        const manager = game.tooltip;

        manager.dismissLockedTooltips();
    }
}
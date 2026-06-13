import type { SvelteTooltipProps } from "@/interfaces/actor/SvelteTooltipProps";
import type { TooltipSettings } from "@/interfaces/foundry/TooltipSettings";
import Tooltip from "@/svelte/shared/tooltip/Tooltip.svelte";
import { mount } from "svelte";

export class TooltipFactory
{
    // CSS classes need to be applied via the `data-tooltip-class` attribute
    public static buildTooltip(text: string, header?: string): string 
    {
        return `
            ${header
                ? `<div class="la-bckg-primary -fontface-stylized -fontsize4 -upper -padding0">${header}</div>`
                : ""
            }
            <div class="la-tooltip__content -fontface-neutral">
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

        if (tooltipSettings.html)
        {
            options.html = tooltipSettings.html;
        }

        if (tooltipSettings.locked)
        {
            options.locked = tooltipSettings.locked;
        }

        if (tooltipSettings.cssClass)
        {
            options.cssClass = tooltipSettings.cssClass;
        }

        manager.activate(event.currentTarget as HTMLElement, options);
    }

    // (#5)
    public static renderTooltipSvelte(
        event: MouseEvent,
        props: SvelteTooltipProps,
        tooltipSettings: TooltipSettings
    )
    {
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

        manager.activate(event.currentTarget as HTMLElement, options);

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
        const manager = game.tooltip;

        manager.dismissLockedTooltip(element);
    }

    public static unrenderTooltips()
    {
        const manager = game.tooltip;

        manager.dismissLockedTooltips();
    }
}
import { TooltipDirection } from "@/enums/TooltipDirection";

export class TooltipFactory
{

    // CSS classes need to be applied via the `data-tooltip-class` attribute
    public static buildTooltip(text: string, header?: string): string 
    {
        return `
            ${header 
                ? `<h3>${header}</h3>` 
                : ""
            }
            <div>
                ${text}
            </div>
        `;
    }

    public static activateLockedTooltip(event: MouseEvent, content: string, direction?: string)
    {
        //@ts-expect-error Tooltip Manager
        const manager = game.tooltip;
        
        manager.activate(
            event.currentTarget,
            {
                direction: direction || TooltipDirection.DOWN,
                text: content,
                locked: true,
            }
        );
    }
}
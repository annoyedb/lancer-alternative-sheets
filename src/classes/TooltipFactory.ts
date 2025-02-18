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
}
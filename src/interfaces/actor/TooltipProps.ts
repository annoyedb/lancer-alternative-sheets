import type { ThemeKey } from '@/enums/ThemeKey';
import { TooltipDirection } from '@/enums/TooltipDirection';

/**
 * Interface representing the properties of a typical Lancer Alternative Sheets item with tooltip support.
 */
export interface TooltipProps
{
    /**
     * Optional flag to enable or disable the tooltip. If set to `false`, the tooltip will not be displayed.
     */
    tooltipEnabled?: boolean;
    
    /**
     * Optional tooltip text to be displayed when hovering over the element. Used in `data-tooltip` attribute.
     */
    tooltip?: string;

    /**
     * Optional header text for the tooltip. Used in `data-tooltip` attribute.
     */
    tooltipHeader?: string;

    /**
     * Optional direction in which the tooltip should be displayed. Used in `data-tooltip-direction` attribute.
     */
    tooltipDirection?: TooltipDirection;

    /**
     * Optional tooltip style class. Used in `data-tooltip-class` attribute in addition to default styles.
     */
    tooltipClass?: string;

    /**
     * Optional theme for the tooltip. This is appended onto `tooltipClass` or its default value (e.g. `.la-tooltip`)
     */
    tooltipTheme?: ThemeKey | string;
}
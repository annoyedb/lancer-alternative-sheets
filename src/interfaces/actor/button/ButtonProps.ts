import type { FlowClass } from '@/enums/FlowClass';
import { TooltipDirection } from '@/enums/TooltipDirection';
/**
 * Interface representing the properties of a typical Lancer Alternative Sheets button.
 */
export interface ButtonProps
{
    /**
     * Lancer system flow class for the button.
     */
    flowClass: FlowClass | string | null;

    /**
     * Required when `flowClass` is `FlowClass.Standard`. Used in `data-flow-type` attribute
     */
    flowType?: string;

    /**
     * Optional flow args, typically used when `flowClass` is set to `FlowClass.Standard`. Used in `data-flow-args` attribute.
     */
    flowArgs?: string;

    /**
     * Optional tooltip text to be displayed when hovering over the button. Used in `data-tooltip` attribute.
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
     * Optional unique identifier for the button. Used in `data-uuid` attribute.
     */
    uuid?: string;

    /**
     * Optional identifier for the item associated with the button. Used in `data-item-id` attribute.
     */
    itemID?: string;

    /**
     * Optional path associated with the button. Used in `data-path` attribute.
     */
    path?: string;
}
import type { FlowClass } from '@/enums/FlowClass';

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

    /**
     * Optional data type for the button. Used in `data-type` attribute.
     */
    type?: string;

    /**
     * Option data index for the button. Used in `data-index` attribute.
     */
    index?: number;

    /**
     * Optional data rank for the button. Used in `data-rank` attribute. Only known use is in Pilot Talents.
     */
    rank?: number;
}
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
     * Optional path associated with the button. Used in `data-path` attribute.
     */
    path?: string;

    /**
     * Whether this button is disabled.
     */
    disabled?: boolean;

    //---- stuff below here is mostly one-off stuff that seems to be technical debt?

    /**
     * Optional identifier for the item associated with the button. Used in `data-item-id` attribute; often LIDs?
     */
    itemID?: string;

    /**
     * Optional data type for the button. Used in `data-type` attribute.
     */
    type?: string;

    /**
     * Optional data index for the button. Used in `data-index` attribute.
     */
    index?: number;

    /**
     * Optional data rank for the button. Used in `data-rank` attribute. Only known use is in Pilot Talents.
     */
    rank?: number;

    /**
     * Optional data value for the button. Used in `data-power-index` attribute for bonds.
     */
    powerIndex?: number;

    /**
     * Optional action type for the button. Used in `data-action` attribute for 'gen-control' events.
     */
    action?: string;

    /**
     * Optional action value for the button that describes the structure or type of data. Used in `data-action-value` attribute for 'gen-control' events.
     */
    actionValue?: string;
}
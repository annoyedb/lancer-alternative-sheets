/**
 * Interface representing the properties for a FlowButton component.
 * Extends the properties from `ButtonProps`.
 */
export interface FlowButtonProps
{
    /**
     * Optional array of style class names to apply to the button.
     */
    style?: Array<string>;

    /**
     * Optional click event handler.
     * @param event 
     * @returns 
     */
    onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => void;
}
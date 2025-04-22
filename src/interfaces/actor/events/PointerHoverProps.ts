export interface PointerHoverProps
{
    /**
     * Optional onPointerEnter function to be called when the button is hovered over.
     */
    onPointerEnter?: () => void;

    /**
     * Optional onPointerLeave function to be called when the button is no longer hovered over.
     */
    onPointerLeave?: () => void;
}
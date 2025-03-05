import type { ButtonProps } from "@/interfaces/actor/button/ButtonProps"
import type { TerminalTextProps } from '@/interfaces/actor/TerminalTextProps';

/**
 * Interface representing the properties for a FlowButton component.
 * Extends the properties from `ButtonProps`.
 */
export interface FlowButtonProps extends ButtonProps, TerminalTextProps
{
    /**
     * Optional array of style class names to apply to the button.
     */
    style?: Array<string>;
}
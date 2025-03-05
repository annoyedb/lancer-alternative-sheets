import type { FlowButtonProps } from "./FlowButtonProps";

/**
 * Interface representing the properties button in a hex with a value
 */
export interface HexButtonProps extends FlowButtonProps
{
    /**
     * The number value of the property name.
     */
    value: number;
    
    /**
     * Whether the value should be displayed as a signed number.
     */
    sign?: boolean;

    /**
     * Optional array of style class names to apply to the text that hovers above the value.
     * Use `anim` prefixed color classes to apply the `--color` CSS attribute.
     */
    outerTextStyle?: Array<string>;
    
    /**
     * Optional array of style class names to apply to the button's value text.
     * Use `anim` prefixed color classes to apply the `--color` CSS attribute.
     */
    innerTextStyle?: Array<string>;
    
    /**
     * Optional array of style class names to apply to the wrapper of the button and outer text span.
     */
    innerStyle?: Array<string>;
    
    /**
     * Optional array of style class names to apply to the button itself.
     */
    buttonStyle?: Array<string>;
}
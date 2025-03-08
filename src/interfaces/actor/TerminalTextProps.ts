/**
 * Interface representing the properties for terminal text display.
 */
export interface TerminalTextProps
{
    /**
     * The text that appears on the button.
     */
    text: string;

    /**
     * The text that appears after the text
     */
    extensionText?: string;

    /**
     * Optional array of style class names to apply to the button's icon, text, and cursor.
     * Use `anim` prefixed color classes to apply the `--color` CSS attribute.
     */
    textStyle?: Array<string>;

    /**
     * Optional flag to disable the terminal display of the button.
     */
    disableTerminal?: boolean;

    /**
     * Optional flag to disable the slide display of the button.
     */
    disableSlide?: boolean;

    /**
     * Optional flag to disable the extension display of the button.
     */
    disableExtension?: boolean;

    /**
     * Optional flag to disable the cursor display of the button.
     */
    disableCursor?: boolean;
}
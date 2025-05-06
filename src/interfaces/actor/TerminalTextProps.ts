import type { Snippet } from "svelte";

/**
 * Interface representing the properties for terminal text display.
 */
export interface TerminalTextProps
{
    children?: Snippet;

    /**
     * The text that appears on the button.
     */
    text: string;

    /**
     * The text that appears after the text
     */
    extensionText?: string;

    /**
     * A function returning the text that appears after the text.
     */
    extensionTextFunction?: () => string | undefined;

    /**
     * Optional array of style class names to apply to the button's icon, text, and cursor.
     * Use `anim` prefixed color classes to apply the `--color` CSS attribute.
     */
    textStyle?: Array<string>;

    /**
     * Optional flag to disable the command line display of the button.
     */
    disableCmdline?: boolean;

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
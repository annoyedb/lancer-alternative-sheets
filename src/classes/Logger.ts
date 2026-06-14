import { getModuleVersion } from "@/scripts/helpers";
import { getVerboseLoggingEnabled } from "@/scripts/settings";

export class Logger
{
    private static moduleName = "LAS";
    private static version: string | undefined;

    private static getVersion(): string
    {
        return this.version ??= getModuleVersion();
    }

    public static log(message: string, ...args: any[]): void
    {
        if (getVerboseLoggingEnabled())
            ui.notifications?.info(message);

        console.log(
            `%c[${this.moduleName} ${this.getVersion()}] ${message}`,
            "color: #00FF00; font-weight: bold;",
            ...args
        );
    }

    public static error(message: string, ...args: any[]): void
    {
        if (getVerboseLoggingEnabled())
            ui.notifications?.error(message);

        console.error(
            `%c[${this.moduleName} ${this.getVersion()}] ${message}`,
            "color: #FF0000; font-weight: bold;",
            ...args
        );
        console.trace();
    }

    public static warn(message: string, ...args: any[]): void
    {
        if (getVerboseLoggingEnabled())
            ui.notifications?.warn(message);

        console.warn(
            `%c[${this.moduleName} ${this.getVersion()}] ${message}`,
            "color: #FFA500; font-weight: bold;",
            ...args
        );
        console.trace();
    }
}

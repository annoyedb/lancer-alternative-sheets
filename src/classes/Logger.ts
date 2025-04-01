import { getModuleVersion } from "@/scripts/helpers";
import { getVerboseLoggingEnabled } from "@/scripts/settings";

export class Logger
{
    private static moduleName = "LAS";

    public static log(message: string, ...args: any[]): void
    {
        const verbose = getVerboseLoggingEnabled();
        if (verbose)
        {
            ui.notifications?.info(message);
            console.log(
                `%c[${this.moduleName} ${getModuleVersion()}] ${message}`,
                "color: #00FF00; font-weight: bold;",
                ...args
            );
        } 
        else
        {
            console.log(
                `%c[${this.moduleName} ${getModuleVersion()}] ${message}`,
                "color: #00FF00; font-weight: bold;"
            );
        }
    }

    public static error(message: string, ...args: any[]): void
    {
        const verbose = getVerboseLoggingEnabled();
        if (verbose)
        {
            ui.notifications?.error(message);
            console.error(
                `%c[${this.moduleName} ${getModuleVersion()}] ${message}`,
                "color: #FF0000; font-weight: bold;",
                ...args
            );
        } 
        else
        {
            console.error(
                `%c[${this.moduleName} ${getModuleVersion()}] ${message}`,
                "color: #FF0000; font-weight: bold;"
            );
        }
    }

    public static warn(message: string, ...args: any[]): void
    {
        const verbose = getVerboseLoggingEnabled();
        if (verbose)
        {
            ui.notifications?.warn(message);
            console.warn(
                `%c[${this.moduleName} ${getModuleVersion()}] ${message}`,
                "color: #FFA500; font-weight: bold;",
                ...args
            );
        } 
        else
        {
            console.warn(
                `%c[${this.moduleName} ${getModuleVersion()}] ${message}`,
                "color: #FFA500; font-weight: bold;"
            );
        }
    }
}
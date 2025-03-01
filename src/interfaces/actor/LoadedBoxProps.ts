/**
 * Interface representing a weapon with the Loaded property.
 */
export interface LoadedBoxProps
{
    /**
     * The weapon in question. Should have a 'type' and 'system' identifier in the root
     */
    item: any,

    /**
     * The data path of the weapon
     */
    path?: string,
}
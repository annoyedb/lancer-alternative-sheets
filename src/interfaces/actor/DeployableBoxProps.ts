/**
 * Interface representing the properties of a deployable box.
 */
export interface DeployableBoxProps {
    /**
     * The source of the deployable box.
     * Should be able to be checked with isToken and is_deployable.
     */
    source: any;

    /**
     * The source of the lid of the deployable box.
     * Should have a deployables array.
     */
    lidSource: any;

    /**
     * UUID of the deployable's sheet
     */
    uuid?: string

    /**
     * UUID of the sheet that the deployable box is owned by.
     * Used to determine the color of the deployable image.
     */
    sheetUUID: string;
}
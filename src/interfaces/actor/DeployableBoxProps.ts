/**
 * Interface representing the properties of a deployable box.
 */
export interface DeployableBoxProps {
    collapse?: any;

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
}
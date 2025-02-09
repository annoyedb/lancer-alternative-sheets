/**
 * A port of the spell template feature from DnD5e
 * https://gitlab.com/foundrynet/dnd5e/-/blob/master/module/pixi/ability-template.js
 */
import { RangeData } from "../models/bits/range";
/**
 * MeasuredTemplate sublcass to create a placeable template on weapon attacks
 * @example
 * ```javascript
 * const template = WeaponRangeTemplate.fromRange({
 *   type: "Cone",
 *   val: "5",
 * });
 * template?.placeTemplate()
 *   .catch(() => {}) // Handle canceled
 *   .then(t => {
 *     if (t) {
 *       // t is a MeasuredTemplate with flag data
 *     }
 * });
 * ```
 */
export declare class WeaponRangeTemplate extends MeasuredTemplate {
    get range(): RangeData;
    get isBurst(): boolean;
    private actorSheet;
    /**
     * Creates a new WeaponRangeTemplate from a provided range object
     * @param type - Type of template. A RangeType in typescript, or a string in js.
     * @param val  - Size of template. A numeric string
     * @param creator - A token that is designated as the owner of the template.
     *                  Used to deterimine the character sheet to close as well
     *                  as a default ignore target for Cones and Lines.
     */
    static fromRange({ type, val }: WeaponRangeTemplate["range"], creator?: Token): WeaponRangeTemplate | null;
    /**
     * Start placement of the template. Returns immediately, so cannot be used to
     * block until a template is placed.
     * @deprecated Since 1.0
     */
    drawPreview(): void;
    /**
     * Start placement of the template.
     * @returns A Promise that resolves to the final MeasuredTemplateDocument or
     * rejects when creation is canceled or fails.
     */
    placeTemplate(): Promise<MeasuredTemplateDocument>;
    private activatePreviewListeners;
    /**
     * Snapping function to only snap to the center of spaces rather than corners.
     */
    private snapToCenter;
    /**
     * Snapping function to snap to the center of a hovered token. Also resizes
     * the template for bursts.
     */
    private snapToToken;
    /**
     * Get fine-tuned sizing data for Burst templates
     */
    private getBurstDistance;
}
declare global {
    interface FlagConfig {
        MeasuredTemplate: {
            [game.system.id]: {
                range: RangeData;
                creator?: string;
                burstToken?: string;
                ignore: {
                    tokens: string[];
                    dispositions: TokenDocument["data"]["disposition"][];
                };
                isAttack?: boolean;
            };
        };
    }
}

import { FullBoundedNumberField, LIDField } from "../shared";
/**
 * Tracks core statuses, and allows for active effects to easily and non-exclusively apply impaired.
 * We use the names of keys from lancer-data, but with dashes removed
 */
export interface StatConMap {
    dangerzone: boolean;
    downandout: boolean;
    engaged: boolean;
    exposed: boolean;
    invisible: boolean;
    prone: boolean;
    shutdown: boolean;
    immobilized: boolean;
    impaired: boolean;
    jammed: boolean;
    lockon: boolean;
    shredded: boolean;
    slow: boolean;
    stunned: boolean;
}
export declare function template_universal_actor(): {
    lid: LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: FullBoundedNumberField;
    overshield: FullBoundedNumberField;
    inherited_effects: any;
};
export declare function template_action_tracking(): {
    action_tracker: any;
};
export declare function template_heat(): {
    heat: FullBoundedNumberField;
};
export declare function template_struss(): {
    stress: FullBoundedNumberField;
    structure: FullBoundedNumberField;
};
export declare function template_statuses(): {};

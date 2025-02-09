import { FakeBoundedNumberField, LIDField } from "../shared";
export declare function template_universal_item(): {
    lid: LIDField;
};
export declare function template_destructible(): {
    cascading: any;
    destroyed: any;
};
export declare function template_uses(): {
    uses: FakeBoundedNumberField;
};
export declare function template_bascdt(): {
    bonuses: any;
    actions: any;
    synergies: any;
    counters: any;
    deployables: any;
    integrated: any;
    tags: any;
};
export declare function template_licensed(): {
    manufacturer: any;
    license_level: any;
    license: any;
};
export declare function migrateManufacturer(source: {
    id?: string;
    fallback_lid?: string;
    type?: string;
    reg_name?: string;
}): string;

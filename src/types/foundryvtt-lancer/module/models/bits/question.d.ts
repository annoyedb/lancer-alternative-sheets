declare const fields: any;
export interface BondQuestionData {
    question: string;
    options: Array<string>;
}
export declare class BondQuestionField extends fields.SchemaField {
    constructor(options?: {});
}
export declare function unpackQuestion(data: any): BondQuestionData;
export {};

import type { LancerActor } from "../actor/lancer-actor";
/**
 *
 */
export declare function renderTemplateStep(actor: LancerActor, template: string, templateData: any, flags?: any): Promise<void>;
export declare function createChatMessageStep(actor: LancerActor, html: HTMLElement | string, roll?: Roll, flags?: any): Promise<void>;

import { LancerItem } from "../item/lancer-item";
/**
 * Select and begin a chat flow for the given item.
 * @param item The item to print to chat
 * @param data Additional data required by some flows
 * @returns Promise<boolean> Whether the flow completed successfully
 */
export declare function beginItemChatFlow(item: LancerItem, data: any): Promise<boolean>;

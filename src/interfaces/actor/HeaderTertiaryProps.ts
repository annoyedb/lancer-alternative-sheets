import type { TooltipDirection } from "@/enums/TooltipDirection";
import type { Snippet } from "svelte";

export interface HeaderTertiaryProps
{
    children?: any;
    renderOutsideCollapse?: Snippet; 
    
    title: string;
    subTitle: string;
    itemID: string;
    uuid: string;
    path: string;
    acceptTypes: string;
    
    headerStyle?: Array<string>;
    headerFontStyle?: Array<string>;
    subHeaderFontStyle?: Array<string>;
    borderStyle?: Array<string>;
    iconStyle?: Array<string>;
    rootStyle?: Array<string>;
    collapseID?: string;
    collapse?: any;
    startCollapsed?: Boolean;

    editOption?: Boolean;
    editStyle?: Array<string>;
    editIconStyle?: Array<string>;

    messageOption?: Boolean;
    messageStyle?: Array<string>;
    messageIconStyle?: Array<string>;

    spOption?: Boolean;
    spValue?: number;
    spTextStyle?: Array<string>;
    spIconStyle?: Array<string>;

    weaponOption?: Boolean;
    weaponDestroyed?: boolean;
    weaponStyle?: Array<string>;
    weaponDamage?: Array<any>;
    weaponRange?: Array<any>;
    weaponTooltipDirection?: string | TooltipDirection;

    rollAttackOption?: Boolean;
    rollAttackStyle?: Array<string>;
    rollAttackTooltipDirection?: string | TooltipDirection;
    rollAttackTooltip?: string;
}
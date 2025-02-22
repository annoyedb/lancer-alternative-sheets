import { EntryType } from "../../enums";
import { ActionData } from "../../models/bits/action";
import { BonusData } from "../../models/bits/bonus";
import { SourceData, SourceDataType } from "../../source-template";
import { DamageData } from "../../models/bits/damage";
import { RangeData } from "../../models/bits/range";
import { CounterData } from "../../models/bits/counter";
import { SystemTemplates } from "../../system-template";
import { PowerData } from "../../models/bits/power";
import { BondQuestionData } from "../../models/bits/question";
import { TagData } from "../../models/bits/tag";
export declare function BONUS(): BonusData;
export declare function ACTION(): ActionData;
export declare function COUNTER(): CounterData;
export declare function TAG(): TagData;
export declare function BOND_QUESTION(): BondQuestionData;
export declare function POWER(): PowerData;
export declare function FRAME_TRAIT(): SourceDataType<EntryType.FRAME>["traits"][0];
export declare function DAMAGE(): DamageData;
export declare function RANGE(): RangeData;
export declare function TALENT_RANK(): SourceDataType<EntryType.TALENT>["ranks"][0];
export declare function WEAPON_PROFILE(): SourceData.MechWeapon["profiles"][0];
export declare function WEAPON_MOUNT(): SourceData.Mech["loadout"]["weapon_mounts"][0];
export declare function MOUNT_SLOT(): SourceData.Mech["loadout"]["weapon_mounts"][0]["slots"][0];
export declare function ROLL_BONUS_TARGETS(): SystemTemplates.RollBonusTargets;

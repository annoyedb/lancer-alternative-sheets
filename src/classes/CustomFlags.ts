import { CustomFlagContentType } from "@/enums/CustomFlagContentType";
import type { CustomFlag, CustomFlagData } from "@/interfaces/actor/CustomFlagData";

export class CustomFlags implements CustomFlagData
{
    [id: string]: CustomFlag;

    static emptyContent(id: string): CustomFlag
    {
        return {
            id,
            name: "",
            contentType: CustomFlagContentType.Value,
            content: {
                min: 0,
                max: 0,
                value: 0,
            },
            showInSidebar: false,
            color: "#ffffff",
            icon: "mdi mdi-abacus",
            tooltip: "",
        };
    }
}

<script lang="ts">
    import { ActiveTab } from "@/enums/ActiveTab";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getActiveTab, getAdvancedState } from "@/scripts/store/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import InventoryButton from "@/svelte/actor/button/InventoryButton.svelte";
    import { SETTINGS_BUTTON_STYLE, SETTINGS_HEADER_STYLE } from "@/svelte/mech/settings/AdvancedSettings.svelte";
    
    const props: MechSheetProps = $props();
    const {
        actor,
    } = props;

    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let active = $derived(getActiveTab(actor.uuid, ActiveTab.Primary) || "loadout");// This is set to match the initial tab on the sheet setup

    const tooltipEnabled = getMechSheetTipEnabled();
</script>

<div class="-heightfull
    {advancedOptions && active === "loadout" ? "la-combine-h" : "-displaynone"}"
>
    <span class="{SETTINGS_HEADER_STYLE} -alignend">
        {getLocalized("LA.advanced.inventory.label")}
    </span>
    <div class="la-combine-v -alignstart -padding0-b -heightfull">
        <InventoryButton
            style={[SETTINGS_BUTTON_STYLE, "mdi mdi-archive"]}
            
            flowClass={FlowClass.Inventory}
            
            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    </div>
</div>
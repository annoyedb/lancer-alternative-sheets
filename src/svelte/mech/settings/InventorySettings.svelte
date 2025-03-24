<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { activeTab, advancedStates } from "@/scripts/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import InventoryButton from "@/svelte/actor/button/InventoryButton.svelte";
    import { SETTINGS_BUTTON_STYLE, SETTINGS_HEADER_STYLE } from "@/svelte/mech/settings/AdvancedSettings.svelte";
    
    const props: MechSheetProps = $props();
    const {
        actor,
    } = props;

    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);// This is initialized in the Header's onMount function
    let active = $derived($activeTab);
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
            
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    </div>
</div>
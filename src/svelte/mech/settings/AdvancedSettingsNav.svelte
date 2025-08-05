<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getMechSheetTooltipEnabled, getSidebarRatio, setSidebarRatio, setThemeOverride } from "@/scripts/mech/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { TextLogHook } from "@/enums/TextLogHook";
    import SidebarRatioSlider from "@/svelte/actor/input/SidebarRatioSlider.svelte";
    import ThemeOverrideButton from "@/svelte/actor/button/ThemeOverrideButton.svelte";

    const props = $props();
    const {
        actor,
    }: MechSheetProps = props
    
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    const tooltipEnabled = getMechSheetTooltipEnabled();
</script>

<SidebarRatioSlider
    uuid={actor.uuid}
    ratioGetter={getSidebarRatio}
    ratioSetter={setSidebarRatio}
    style={["-aligncontentcenter"]}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>

<ThemeOverrideButton
    disabled={!advancedOptions}
    uuid={actor.uuid}
    style={["-alignselfstart"]}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    setOverride={setThemeOverride}

    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
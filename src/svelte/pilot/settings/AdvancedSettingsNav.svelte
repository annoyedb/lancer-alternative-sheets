<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { getPilotSheetTooltipEnabled, getSidebarRatio, setSidebarRatio, setThemeOverride } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { TextLogHook } from "@/enums/TextLogHook";
    import SidebarRatioSlider from "@/svelte/shared/input/SidebarRatioSlider.svelte";
    import ThemeOverrideButton from "@/svelte/shared/button/ThemeOverrideButton.svelte";

    const props = $props();
    const {
        actor,
    }: PilotSheetProps = $derived(props)

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
</script>

<SidebarRatioSlider
    uuid={actor.uuid}
    ratioGetter={getSidebarRatio}
    ratioSetter={setSidebarRatio}
    style={["-aligncontentcenter"]}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>

<ThemeOverrideButton
    disabled={!advancedOptions}
    uuid={actor.uuid}
    style={["-alignselfstart"]}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}
    setOverride={setThemeOverride}

    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { getPilotSheetTooltipEnabled, getSidebarRatio, setSidebarRatio, setThemeOverride } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { TextLogHook } from "@/enums/TextLogHook";
    import SidebarRatioSlider from "@/svelte/actor/input/SidebarRatioSlider.svelte";
    import ThemeOverrideButton from "@/svelte/actor/button/ThemeOverrideButton.svelte";

    const props = $props();
    const {
        actor,
    }: PilotSheetProps = props
    
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    const tooltipEnabled = getPilotSheetTooltipEnabled();
</script>

<SidebarRatioSlider
    uuid={actor.uuid}
    ratioGetter={getSidebarRatio}
    ratioSetter={setSidebarRatio}
    style={["-aligncontentcenter"]}
    
    tooltipEnabled={tooltipEnabled}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>

<ThemeOverrideButton
    disabled={!advancedOptions}
    uuid={actor.uuid}
    style={["-alignselfstart"]}
    
    tooltipEnabled={tooltipEnabled}
    setOverride={setThemeOverride}

    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
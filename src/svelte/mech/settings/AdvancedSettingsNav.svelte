<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getMechSheetTooltipEnabled, getSidebarRatio, setSidebarRatio, setThemeOverride } from "@/scripts/mech/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { TextConsoleHook } from "@/enums/TextConsoleHook";
    import SidebarRatioSlider from "@/svelte/shared/input/SidebarRatioSlider.svelte";
    import ThemeOverrideButton from "@/svelte/shared/button/ThemeOverrideButton.svelte";
    import { setActorContext } from "@/scripts/context";

    const props = $props();
    const {
        actor,
    }: MechSheetProps = $derived(props)
    setActorContext(actor);

    const tooltipEnabled = getMechSheetTooltipEnabled();
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
    logType={TextConsoleHook.MechHeader}
    logTypeReset={TextConsoleHook.MechHeaderReset}
/>

<ThemeOverrideButton
    disabled={!advancedOptions}
    uuid={actor.uuid}
    style={["-alignselfstart"]}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}
    setOverride={setThemeOverride}

    logType={TextConsoleHook.MechHeader}
    logTypeReset={TextConsoleHook.MechHeaderReset}
/>
<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { getPilotSheetTooltipEnabled, getSidebarRatio, setSidebarRatio, setThemeOverride } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import SidebarRatioSlider from "@/svelte/shared/input/SidebarRatioSlider.svelte";
    import ThemeOverrideButton from "@/svelte/shared/button/ThemeOverrideButton.svelte";
    import { setActorContext } from "@/scripts/context";

    const props = $props();
    const {
        actor,
    }: PilotSheetProps = $derived(props)
    setActorContext(actor);

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
    logging={true}
/>

<ThemeOverrideButton
    disabled={!advancedOptions}
    uuid={actor.uuid}
    style={["-alignselfstart"]}
    
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}
    setOverride={setThemeOverride}

    logging={true}
/>
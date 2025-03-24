<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getSidebarRatio, setSidebarRatio } from "@/scripts/mech/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import SidebarRatioSlider from "@/svelte/actor/input/SidebarRatioSlider.svelte";
    import ThemeOverrideButton from "@/svelte/actor/button/ThemeOverrideButton.svelte";

    const props = $props();
    const {
        actor,
    }: MechSheetProps = props
    
</script>

<SidebarRatioSlider
    uuid={actor.uuid}
    ratioGetter={getSidebarRatio}
    ratioSetter={setSidebarRatio}
    style={["-aligncontentcenter"]}
    
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>

<ThemeOverrideButton
    uuid={actor.uuid}
    style={["-alignselfstart"]}
    
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}
/>
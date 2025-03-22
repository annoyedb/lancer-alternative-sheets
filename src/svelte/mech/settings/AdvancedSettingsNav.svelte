<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getSidebarRatio, setSidebarRatio } from "@/scripts/settings/mech-sheet";
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
/>

<ThemeOverrideButton
    uuid={actor.uuid}
    style={["-alignselfstart"]}
/>
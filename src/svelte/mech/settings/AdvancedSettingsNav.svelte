<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getSidebarRatio, setSidebarRatio } from "@/scripts/settings/mech-sheet";
    import SidebarRatioSlider from "@/svelte/actor/button/SidebarRatioSlider.svelte";

    const props = $props();
    const {
        actor,
    }: MechSheetProps = props
</script>
<SidebarRatioSlider
    uuid={actor.uuid}
    ratioGetter={getSidebarRatio}
    ratioSetter={setSidebarRatio}
/>
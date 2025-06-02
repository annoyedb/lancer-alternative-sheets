<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import MountSettings from "@/svelte/mech/settings/MountSettings.svelte";
    import InventorySettings from "@/svelte/mech/settings/InventorySettings.svelte";

    const props: MechSheetProps = $props();
    const {
    } = props;
</script>
<script lang="ts" module>
    export const SETTINGS_BUTTON_STYLE = " la-text-secondary la-prmy-primary -glow-prmy-hover -fontsize3 -height2";
    export const SETTINGS_HEADER_STYLE = " la-bckg-primary la-text-header clipped-top -width5 -writingmode-v -fontsize1 -padding0-b -padding1-t ";
</script>

<InventorySettings
    {...props}
/>
<MountSettings
    {...props}
/>

<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import MountSettings from "@/svelte/mech/settings/MountSettings.svelte";
    import InventorySettings from "@/svelte/mech/settings/InventorySettings.svelte";

    const props: MechSheetProps = $props();
    const {
    } = $derived(props);
</script>
<script lang="ts" module>
    import { getExtraEffectsEnabled } from "@/scripts/settings";
    import { logographicLanguage } from "@/scripts/helpers";

    export const SETTINGS_BUTTON_STYLE = () => " la-text-secondary la-prmy-primary -fontsize5 -height4 " + (getExtraEffectsEnabled() ? "-glow-prmy-hover " : " ");
    export const SETTINGS_HEADER_STYLE = () => " la-bckg-primary la-text-header clipped-top -width7 -writingmode-v -padding0-b -padding1-t -fontface-stylized " + (logographicLanguage() ? "-fontsizemedium" : "-fontsizemediumer");
</script>

<InventorySettings
    {...props}
/>
<MountSettings
    {...props}
/>

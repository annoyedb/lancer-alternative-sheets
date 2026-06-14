<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import LevelSettings from "@/svelte/pilot/settings/LevelSettings.svelte";
    import HullSettings from "@/svelte/pilot/settings/HullSettings.svelte";
    import AgilitySettings from "@/svelte/pilot/settings/AgilitySettings.svelte";
    import SystemsSettings from "@/svelte/pilot/settings/SystemsSettings.svelte";
    import EngineeringSettings from "@/svelte/pilot/settings/EngineeringSettings.svelte";

    const props: PilotSheetProps = $props();
    const {
    } = $derived(props);
</script>
<script lang="ts" module>
    import { getExtraEffectsEnabled } from "@/scripts/settings";
    import { logographicLanguage } from "@/scripts/helpers";

    export const SETTINGS_BUTTON_STYLE = () => " la-text-secondary la-prmy-primary -fontsize5 -height4 " + (getExtraEffectsEnabled() ? "-glow-prmy-hover " : " ");
    export const SETTINGS_HEADER_STYLE = () => " la-bckg-primary la-text-header clipped-top -width7 -writingmode-v -padding0-b -padding1-t -fontface-stylized " + (logographicLanguage() ? "-fontsizemedium" : "-fontsizemediumer");
</script>

<LevelSettings
    {...props}
/>
<HullSettings
    {...props}
/>
<AgilitySettings
    {...props}
/>
<SystemsSettings
    {...props}
/>
<EngineeringSettings
    {...props}
/>
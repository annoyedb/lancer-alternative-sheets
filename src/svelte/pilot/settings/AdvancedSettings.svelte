<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import LevelSettings from "@/svelte/pilot/settings/LevelSettings.svelte";
    import HullSettings from "@/svelte/pilot/settings/HullSettings.svelte";
    import AgilitySettings from "@/svelte/pilot/settings/AgilitySettings.svelte";
    import SystemsSettings from "@/svelte/pilot/settings/SystemsSettings.svelte";
    import EngineeringSettings from "@/svelte/pilot/settings/EngineeringSettings.svelte";

    const props: PilotSheetProps = $props();
    const {
    } = props;
</script>
<script lang="ts" module>
    export const SETTINGS_BUTTON_STYLE = " la-text-secondary la-prmy-primary -glow-prmy-hover -fontsize3 -height2";
    export const SETTINGS_HEADER_STYLE = " la-bckg-primary la-text-header clipped-top -width5 -writingmode-v -fontsize1 -padding0-b -padding1-t ";
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
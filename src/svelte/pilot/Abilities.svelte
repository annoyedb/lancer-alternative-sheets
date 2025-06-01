<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import CoreBonus from "@/svelte/pilot/CoreBonus.svelte";
    import Talents from "@/svelte/pilot/Talents.svelte";
    import SkillTriggers from "@/svelte/pilot/SkillTriggers.svelte";
    import License from "./License.svelte";

    const props = $props();
    const {
        actor,
        itemTypes,
    } : PilotSheetProps = props;
</script>

<SkillTriggers
    actor={actor}
    skills={itemTypes.skill}
/>
<License
    actor={actor}
    licenses={itemTypes.license}
/>
<CoreBonus
    actor={actor}
    sheetActor={actor}
/>
<Talents
    actor={actor}
    sheetActor={actor}
/>
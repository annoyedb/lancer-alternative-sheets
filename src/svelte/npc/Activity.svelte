<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { getNPCSheetLogActionDontSaveCollapse, getNPCSheetLogActionStartCollapsed } from "@/scripts/npc/settings";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";

    const props = $props();
    const {
        actor,
    }: NPCSheetProps = props;

    const actionLogSaveCollapse = getNPCSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getNPCSheetLogActionStartCollapsed();
</script>

<ActionLog
    uuid={actor.uuid}
    dontSaveCollapse={actionLogSaveCollapse}
    startCollapsed={actionLogStartCollapsed}
    collapsePrefix={ActionLogCollapsePrefix.NPCSheet}
/>
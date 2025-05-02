<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { getPilotSheetLogActionDontSaveCollapse, getPilotSheetLogActionStartCollapsed } from "@/scripts/pilot/settings";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";

    const props = $props();
    const {
        actor
    }: PilotSheetProps = props;
    const actionLogSaveCollapse = getPilotSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getPilotSheetLogActionStartCollapsed();
</script>

<div class="-margin5-t">
    <ActionLog
        uuid={actor.uuid}
        dontSaveCollapse={actionLogSaveCollapse}
        startCollapsed={actionLogStartCollapsed}
        collapsePrefix={ActionLogCollapsePrefix.PilotSheet}
    />
</div>
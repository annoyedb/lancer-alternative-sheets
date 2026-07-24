<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { getPilotSheetLogActionDontSaveCollapse, getPilotSheetLogActionStartCollapsed } from "@/scripts/pilot/settings";
    import ActionLog from "@/svelte/shared/ActionLog.svelte";
    import { setActorContext } from "@/scripts/context";

    const props = $props();
    const {
        actor
    }: PilotSheetProps = $derived(props);
    setActorContext(actor);
    const actionLogSaveCollapse = getPilotSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getPilotSheetLogActionStartCollapsed();
</script>

<div class="-margin7-t">
    <ActionLog
        uuid={actor.uuid}
        dontSaveCollapse={actionLogSaveCollapse}
        startCollapsed={actionLogStartCollapsed}
        collapsePrefix={ActionLogCollapsePrefix.PilotSheet}
    />
</div>
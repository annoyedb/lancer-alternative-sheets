<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
    import { getDeployableSheetLogActionDontSaveCollapse, getDeployableSheetLogActionStartCollapsed } from "@/scripts/deployable/settings";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";

    const props = $props();
    const {
        actor,
    }: DeployableSheetProps = props;

    const actionLogSaveCollapse = getDeployableSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getDeployableSheetLogActionStartCollapsed();
</script>

<ActionLog
    uuid={actor.uuid}
    dontSaveCollapse={actionLogSaveCollapse}
    startCollapsed={actionLogStartCollapsed}
    collapsePrefix={ActionLogCollapsePrefix.DeployableSheet}
/>
<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getMechSheetLogActionDontSaveCollapse, getMechSheetLogActionStartCollapsed } from "@/scripts/mech/settings";
    import ActionLog from "@/svelte/shared/ActionLog.svelte";

    const props = $props();
    const {
        actor
    }: MechSheetProps = props;
    const actionLogSaveCollapse = getMechSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getMechSheetLogActionStartCollapsed();
</script>

<div class="-margin7-t">
    <ActionLog
        uuid={actor.uuid}
        dontSaveCollapse={actionLogSaveCollapse}
        startCollapsed={actionLogStartCollapsed}
        collapsePrefix={ActionLogCollapsePrefix.MechSheet}
    />
</div>
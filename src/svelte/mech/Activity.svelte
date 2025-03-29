<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getMechSheetLogActionMainSaveCollapse, getMechSheetLogActionMainStartCollapsed } from "@/scripts/mech/settings";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";

    const props = $props();
    const {
        actor
    }: MechSheetProps = props;
    const actionLogSaveCollapse = getMechSheetLogActionMainSaveCollapse();
    const actionLogStartCollapsed = getMechSheetLogActionMainStartCollapsed();
</script>

<div class="-margin5-t">
    <ActionLog
        id={actor.id}
        saveCollapse={actionLogSaveCollapse}
        startCollapsed={actionLogStartCollapsed}
        collapsePrefix={ActionLogCollapsePrefix.MechSheet}
    />
</div>
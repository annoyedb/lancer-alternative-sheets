<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getMechSheetLogActionMainDontSaveCollapse, getMechSheetLogActionMainStartCollapsed } from "@/scripts/mech/settings";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";

    const props = $props();
    const {
        actor
    }: MechSheetProps = props;
    const actionLogSaveCollapse = getMechSheetLogActionMainDontSaveCollapse();
    const actionLogStartCollapsed = getMechSheetLogActionMainStartCollapsed();
</script>

<div class="-margin5-t">
    <ActionLog
        id={actor.id}
        dontSaveCollapse={actionLogSaveCollapse}
        startCollapsed={actionLogStartCollapsed}
        collapsePrefix={ActionLogCollapsePrefix.MechSheet}
    />
</div>
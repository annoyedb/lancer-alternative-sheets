<script lang="ts">
    import { ActionLogCollapsePrefix } from "@/enums/ActionLogCollapsePrefix";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getMechSheetLogActionDontSaveCollapse, getMechSheetLogActionStartCollapsed } from "@/scripts/mech/settings";
    import ActionLog from "@/svelte/actor/ActionLog.svelte";

    const props = $props();
    const {
        actor
    }: MechSheetProps = props;
    const actionLogSaveCollapse = getMechSheetLogActionDontSaveCollapse();
    const actionLogStartCollapsed = getMechSheetLogActionStartCollapsed();
</script>

<div class="-margin5-t">
    <ActionLog
        id={actor.id}
        dontSaveCollapse={actionLogSaveCollapse}
        startCollapsed={actionLogStartCollapsed}
        collapsePrefix={ActionLogCollapsePrefix.MechSheet}
    />
</div>
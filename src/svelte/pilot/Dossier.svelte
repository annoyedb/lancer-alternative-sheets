<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import History from "@/svelte/pilot/History.svelte";
    import Note from "@/svelte/pilot/Note.svelte";
    import Sync from "@/svelte/pilot/Sync.svelte";
    import ActiveEffects from "@/svelte/shared/ActiveEffects.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";

    const props = $props();
    const {
        actor
    } = props;

    const collID = `${actor.uuid}.status.activeEffects`;
</script>

<Sync
    {...props}
/>
<HeaderMain
    text={getLocalized("LA.tab.status.effects.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
    textStyle={["la-text-header", "-fontsize4", "-overflowhidden"]}
    borderStyle={["la-brdr-primary"]}
    
    collapseID={collID}
    startCollapsed={false}
>
    <ActiveEffects
        {...props}
    />
</HeaderMain>
<History
    {...props}
/>
<Note
    {...props}
/>
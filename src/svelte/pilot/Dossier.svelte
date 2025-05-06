<script lang="ts">
    import History from "@/svelte/pilot/History.svelte";
    import Note from "@/svelte/pilot/Note.svelte";
    import Sync from "@/svelte/pilot/Sync.svelte";

    const props = $props();
    const {

    } = props;
</script>

<Sync
    {...props}
/>
<History
    {...props}
/>
<Note
    {...props}
/>
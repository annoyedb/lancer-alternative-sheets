<script lang="ts">
    import type { Snippet } from "svelte";

    const {
        content,
    }: { content: Snippet } = $props();
</script>

{@render content()}
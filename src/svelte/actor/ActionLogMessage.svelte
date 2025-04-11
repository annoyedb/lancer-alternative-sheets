<script lang="ts">
    import { onMount } from "svelte";
    import { rebindButtons } from "@/scripts/action-log";

    const {
        messageData,
    } = $props();

    let component: HTMLElement | null = $state(null);
        
    onMount(() =>
    {
        if (component)
            rebindButtons(messageData, component);
    });
</script>

<div class="-fontsize1"
    bind:this={component}
>
    {@html messageData.content}
</div>

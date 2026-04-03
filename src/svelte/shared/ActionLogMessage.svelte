<script lang="ts">
    import { onMount } from "svelte";
    import { rebindButtons } from "@/scripts/action-log";

    let {
        messageData,
    } = $props();

    let component: HTMLElement | null = null;
        
    onMount(() =>
    {
        if (component)
        {
            rebindButtons(messageData, component);
        }
    });
</script>

<div class="-fontsizemedium"
    bind:this={component}
>
    {@html messageData.content}
</div>

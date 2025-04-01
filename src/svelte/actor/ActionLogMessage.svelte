<script lang="ts">
    import { onMount } from "svelte";
    import { rebindButtons } from "@/scripts/action-log";
    import { getLocalized } from "@/scripts/helpers";

    const {
        messageData,
        nameFoundCallback,
    } = $props();

    let component: HTMLElement | null = $state(null);
        
    onMount(() =>
    {
        if (component)
            rebindButtons(messageData, component);
        if (nameFoundCallback && component)
            nameFoundCallback(extractName(component));
    });

    // TODO: write PR so that more information (e.g. name, caller, etc) 
    // gets stored in ChatMessage flags, so we don't have to do this jank
    // to simply get the name of the item
    function extractName(component: HTMLElement) 
    {   
        const headerElement = component.querySelector('.lancer-header, .lancer-stat-header') as HTMLElement | null;

        if (!headerElement) 
        {
            return getLocalized("LA.placeholder");
        }

        const headerText = headerElement.firstChild?.textContent?.trim();
        if (headerText) {
            return headerText;
        }

        const spanElement = headerElement.querySelector('span') as HTMLElement | null;
        return spanElement?.textContent?.trim() || getLocalized("LA.placeholder");
    }
</script>

<div class="-fontsize1"
    bind:this={component}
>
    {@html messageData.content}
</div>
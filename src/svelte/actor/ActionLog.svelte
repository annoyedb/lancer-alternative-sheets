<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { trackHook } from "@/scripts/store/hooks";
    import type { ActionLogProps } from "@/interfaces/actor/ActionLogProps";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import { getLocalized } from "@/scripts/helpers";
    import ActionLogMessage from "@/svelte/actor/ActionLogMessage.svelte";

    const {
        uuid,
        maxHeight,
        dontSaveCollapse,
        startCollapsed,
        collapsePrefix,
    }: ActionLogProps = $props();

    const idParts = uuid.split('.');
    //@ts-ignore Foundry native
    const messages = game.messages as Array<any>;

    let filteredMessages: Array<any> = $state(messages?.filter((m: any) => {
        const msgActorID = m.speaker.token || m.speaker.actor;
        return idParts.includes(msgActorID) && m.content?.trim().startsWith('<div c'); // (#9) I hate this check. But the system doesn't offer any other way to distinguish between chat and actions and using the DOM api to check HTML content would be slower
    }) || []);
    let component: HTMLElement | null = $state(null);
    let extractedTimes: Array<string> = $state([]);
    let extractedNames: Array<string> = $state([]);
    let animationFrame: number;

    onMount(() => 
    {
        filteredMessages.forEach((message) => 
        {
            extractedTimes.push(extractTime(message.timestamp));
            extractedNames.push(extractName(message.content));
        });

        trackHook(uuid, Hooks.on("createChatMessage", (message: any) => 
        {
            const msgActorID = message.speaker.token || message.speaker.actor;
            if (idParts.includes(msgActorID) && message.content?.trim().startsWith('<div c')) // (#9)
            {
                filteredMessages.push(message);
                extractedTimes.push(extractTime(message.timestamp));
                extractedNames.push(extractName(message.content));
            }
        }), "createChatMessage");
        trackHook(uuid, Hooks.on("deleteChatMessage", (message: any) => 
        {
            const index = filteredMessages.findIndex((msg) => msg.id === message.id);
            if (index !== -1) 
            {
                filteredMessages.splice(index, 1);
                extractedTimes.splice(index, 1);
                extractedNames.splice(index, 1);
            }
        }), "deleteChatMessage");

        function refreshTimes() 
        {
            extractedTimes = filteredMessages.map((message) => extractTime(message.timestamp));
            animationFrame = requestAnimationFrame(() => 
            {
                setTimeout(refreshTimes, 15000); // Update every 15 seconds like Foundry does
            });
        }
        refreshTimes();
    });

    onDestroy(() => 
    {
        cancelAnimationFrame(animationFrame);
    });

    $effect(() => 
    {
        component?.scrollTo(0, component.scrollHeight);
    });

    function extractTime(messageTime: number)
    {
        const now = Math.floor(Date.now()); // Current time in milliseconds
        const diff = now - messageTime;

        if (diff < 60000) {
            const seconds = Math.round(diff / 1000);
            return `${seconds}s ago`;
        } else if (diff < 3600000) {
            const minutes = Math.round(diff / 60000);
            return `${minutes}m ago`;
        } else if (diff < 86400000) {
            const hours = Math.round(diff / 3600000);
            return `${hours}h ago`;
        } else {
            const days = Math.round(diff / 86400000);
            return `${days}d ago`;
        }
    }

    // TODO: write PR so that more information (e.g. name, caller, etc) 
    // gets stored in ChatMessage flags, so we don't have to do this jank
    // to simply get the name of the item
    function extractName(content: string) 
    {
        const element = document.createElement("div");
        element.innerHTML = content;

        const headerElement = jQuery(element).find('.lancer-header, .lancer-stat-header').get(0) as HTMLElement | null;

        if (!headerElement)
            return getLocalized("LA.placeholder");

        const headerText = headerElement.firstChild?.textContent?.trim();
        if (headerText)
            return headerText;

        const spanElement = jQuery(headerElement).find('span').get(0) as HTMLElement | null;
        return spanElement?.textContent?.trim() || getLocalized("LA.placeholder");
    }
</script>

{#snippet headerSecondaryLeftOptions()}
    <i class="mdi mdi-message-text -fontsize1 -padding0"></i>
{/snippet}

<div
    class="la-actionlog -main la-combine-v -gap0 -widthfull -displayflex -directioncolumnreverse"
    style={maxHeight ? `max-height: ${maxHeight}rem;` : ""}
    bind:this={component}
>
{#each filteredMessages as message, index}
{#snippet headerSecondaryRightOptions()}
    <span class="-fontsize0">{extractedTimes[index]}</span>
{/snippet}
    <HeaderSecondary
        text={extractedNames[index]}
        headerStyle={[H2_HEADER_STYLE, "la-bckg-header-anti"]}
        textStyle={["la-text-header", "la-prmy-header", "-fontsize1", "-upper"]}
        borderStyle={["la-brdr-header-anti"]}
        
        itemID={message.id}
        collapseID={`chat.${collapsePrefix ? collapsePrefix + '.' : ''}${message.id}`}
        startCollapsed={startCollapsed}
        dontSaveCollapse={dontSaveCollapse}

        contentLeft={headerSecondaryLeftOptions}
        contentRight={headerSecondaryRightOptions}
    >
        <ActionLogMessage
            messageData={message}
        />
    </HeaderSecondary>
{/each}
</div>
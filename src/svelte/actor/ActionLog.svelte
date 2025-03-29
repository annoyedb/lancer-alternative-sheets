<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { trackHook } from "@/scripts/hooks";
    import type { ActionLogProps } from "@/interfaces/actor/ActionLogProps";
    import ActionLogMessage from "@/svelte/actor/ActionLogMessage.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";

    const {
        id,
        maxHeight,
        saveCollapse,
        startCollapsed,
        collapsePrefix,
    }: ActionLogProps = $props();
    //@ts-ignore Foundry native
    const messages = game.messages as Array<any>;

    let filteredMessages: Array<any> = $state(messages?.filter((m: any) => {
        const msgActorID = m.speaker.actor;
        return msgActorID === id && m.rolls.length;
    }) || []);
    let component: HTMLElement | null = $state(null);
    let extractedTimes: Array<string> = $state([]);
    let extractedNames: Array<string> = $state([]);
    let animationFrame: number;

    onMount(() => 
    {
        function refreshTimes() 
        {
            extractedTimes = filteredMessages.map((message) => extractTime(message.timestamp));
            animationFrame = requestAnimationFrame(() => 
            {
                setTimeout(refreshTimes, 15000); // Update every 15 seconds like Foundry does
            });
        }
        
        filteredMessages.forEach((message) => 
        {
            extractedTimes.push(extractTime(message.timestamp));
        });

        trackHook(Hooks.on("createChatMessage", (message: any) => 
        {
            if (message.speaker.actor === id && message.rolls.length) 
            {
                filteredMessages.push(message);
                extractedTimes.push(extractTime(message.timestamp));
            }
        }), "createChatMessage");

        refreshTimes();
    });

    onDestroy(() => {
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
</script>

{#snippet headerSecondaryLeftOptions()}
    <i class="mdi mdi-message-text -fontsize1 -padding0"></i>
{/snippet}

<div
    class="la-actionlog -main la-combine-v -gap0 -widthfull"
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
        textStyle={["la-text-header", "la-anim-header", "-fontsize1", "-upper"]}
        borderStyle={["la-brdr-header-anti"]}
        
        itemID={message.id}
        collapseID={`chat.${collapsePrefix ? collapsePrefix + '.' : ''}${message.id}`}
        startCollapsed={startCollapsed}
        saveCollapse={saveCollapse}

        headerContentLeft={headerSecondaryLeftOptions}
        headerContentRight={headerSecondaryRightOptions}
    >
        <ActionLogMessage
            messageData={message}
            nameFoundCallback={(n: string) => {extractedNames[index] = n}}
        />
    </HeaderSecondary>
{/each}
</div>
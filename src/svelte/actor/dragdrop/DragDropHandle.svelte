<!-- Wrapper handle for sorting -->
<script lang="ts">
    import { advancedStates } from "@/scripts/advanced";
    import type { Snippet } from "svelte";

    const {
        children,
        uuid,
        index,
        root,
        data,
        style,
        iconStyle,
        onDragStart,
        onDrop,
        onDropError,
    }: {
        children: Snippet,
        uuid: string,
        index: number,
        root: HTMLElement,
        style?: Array<string>,
        iconStyle?: Array<string>,
        data?: any,
        onDragStart?: (event: DragEvent, thisData: any) => void,
        onDrop?: (event: DragEvent, dropData: any, thisData: any) => void,
        onDropError?: (event: DragEvent, dropData: any) => void,
    } = $props();
    let component: HTMLElement | null = $state(null);
    let advancedOptions = $derived($advancedStates[uuid]?.enabled || false);// This is initialized in the Header's onMount function

    function handleDragStart(event: DragEvent): void {
        try 
        {
            const jsonData = JSON.stringify(data);
            event.dataTransfer?.setData('text/plain', jsonData);
            onDragStart?.(event, data);
        } 
        catch (error) 
        {
            console.error('Lancer Alternative Sheets: Failed to handle drag start:', error);
        }
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        const dropData = event.dataTransfer?.getData('text/plain');
        if (!dropData) return;

        try 
        {
            const obj = JSON.parse(dropData);
            if (obj.index !== index) 
            {
                const eventTarget = event.target as HTMLElement;
                // Do an additional check just in case this was being dropped
                // on a completely different root element that is listening for drops
                if (component && eventTarget && root &&
                    root.contains(component) && root.contains(eventTarget)) 
                {
                    onDrop?.(event, obj, data);
                }
                else 
                {
                    onDropError?.(event, obj);
                }
            }
        } 
        catch (error) 
        {
            console.error('Lancer Alternative Sheets: Failed to parse drop data:', error);
        }
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="la-combine-h -widthfull -aligncenter
        {style?.join(' ')}"
    ondragstart={handleDragStart}
    ondrop={handleDrop}
    draggable={advancedOptions}
    bind:this={component}
>
    <i
        class="fas fa-grip-lines -positionabsolute -left0 -pointergrab {advancedOptions ? '-visibilityvisible' : '-visibilityhidden'}
            {iconStyle?.join(' ')}"
    ></i>
    {#if children}
        {@render children()}
    {/if}
</div>
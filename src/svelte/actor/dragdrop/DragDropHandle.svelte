<!-- Wrapper handle for sorting -->
<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { DragDropHandleProps } from "@/interfaces/dragdrop/DragDropHandleProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        children,
        index,
        root,
        
        data,
        style,
        iconStyle,

        onDragStart,
        onDrop,
        onDropError,
        onDelete,

        disabled,
        deleteDisabled,

        tooltipDirection,
        tooltipClass,
        tooltipTheme,

        logType,
        logTypeReset,
    }: DragDropHandleProps & TooltipProps & TextLogEventProps = $props();
    let component: HTMLElement | null = $state(null);

    const deleteTip = TooltipFactory.buildTooltip(getLocalized("LA.delete.tooltip"));
    const logging = logType && logTypeReset;

    function handleDragStart(event: DragEvent): void 
    {
        try 
        {
            const jsonData = JSON.stringify(data);
            event.dataTransfer?.setData('text/plain', jsonData);
            onDragStart?.(event, data);
        } 
        catch (error) 
        {
            Logger.error('Failed to handle drag start', error);
        }
    }

    function handleDrop(event: DragEvent) 
    {
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
            Logger.error('Failed to parse drop data', error);
        }
    }

    function handleOnDelete(event: MouseEvent) 
    {
        event.stopPropagation();
        onDelete?.(event);
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="la-combine-h -widthfull -aligncenter -positionrelative
        {style?.join(' ')}"
    ondragstart={handleDragStart}
    ondrop={handleDrop}
    draggable={!disabled}
    bind:this={component}
>
{#if !disabled}
    <i class="fas fa-grip-lines -positionabsolute -left0 -pointergrab la-prmy-primary -glow-prmy-hover {iconStyle?.join(' ')}"
        onpointerenter={ logging ? event => sendToLog(event, getLocalized("LA.advanced.reorderMacro.tooltip"), logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        aria-label={getLocalized("LA.advanced.reorderMacro.tooltip")}
        style="z-index: 1;"
    ></i>
{/if}
{#if children}
    {@render children()}
{/if}
{#if !disabled && !deleteDisabled}
    <button type="button"
        class="fas fa-delete-left -positionabsolute -right0 la-prmy-primary -glow-prmy-hover {iconStyle?.join(' ')}"
        onpointerenter={ logging ? event => sendToLog(event, getLocalized("LA.delete.tooltip"), logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        onclick={handleOnDelete}
        data-tooltip={deleteTip}
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.RIGHT}
        aria-label={getLocalized("LA.delete.tooltip")}
    ></button>
{/if}
</div>
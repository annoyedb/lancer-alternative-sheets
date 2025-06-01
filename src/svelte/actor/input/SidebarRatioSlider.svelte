<script lang="ts">
    import { onMount } from "svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { SidebarRatioSliderProps } from "@/interfaces/actor/button/SidebarRatioSliderProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const props = $props();
    const { 
        uuid,
        ratioGetter,
        ratioSetter,
        
        style,

        tooltipEnabled,

        logText,
        logType,
        logTypeReset,
    }: SidebarRatioSliderProps & TooltipProps & TextLogEventProps = props
    
    let advancedOptions = $derived(getAdvancedState(uuid));
    let ratio = $state(ratioGetter(uuid));
    let component: HTMLElement | null = $state(null);
    let sidebar: JQuery<HTMLElement> | null = null;
        
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.sidebarRatio.tooltip"));
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.advanced.sidebarRatio.tooltip");

    // Force the sidebar to update its flex value based on the changes we make to ratio
    onMount(() => 
    {
        if (component)
        {
            sidebar = jQuery(component).closest('.la-root').find('.la-sidebar');
        }
    });

    function handleOnInput(event: Event)
    {
        const target = event.target as HTMLInputElement;
        const value = parseFloat(target.value);
        ratio = value;
        if (sidebar)
            sidebar.css('flex', value.toString());
    }

    function handleOnRelease(event: Event)
    {
        const target = event.target as HTMLInputElement;
        const value = parseFloat(target.value);
        ratio = value;
        ratioSetter(uuid, value);
    }
    
</script>
<!-- Ratio Slider -->
<div class="la-range {style?.join(' ')}
        {advancedOptions ? '-displayblock' : '-displaynone'}"
    bind:this={component}
>
    <input type="range"
        class="la-prmy-primary -glow-prmy-hover"
        min={0.5}
        max={2}
        value={ratio}
        step={0.1}
        data-tooltip={tooltipEnabled ? tip : undefined }
        data-tooltip-class={"la-tooltip clipped-bot"}
        data-tooltip-direction={TooltipDirection.UP}
        oninput={event => handleOnInput(event)}
        onpointerup={event => handleOnRelease(event)}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        aria-label={getLocalized("LA.advanced.sidebarRatio.tooltip")}
    />
</div>
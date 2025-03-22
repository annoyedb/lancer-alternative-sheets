<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { SidebarRatioSliderProps } from "@/interfaces/actor/button/SidebarRatioSliderProps";
    import { advancedStates } from "@/scripts/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { onMount } from "svelte";

    const props = $props();
    const { 
        uuid,
        ratioGetter,
        ratioSetter,
        
        style
    }: SidebarRatioSliderProps = props
    
    let advancedOptions = $derived($advancedStates[uuid]?.enabled || false);// This is initialized in the Header's onMount function
    let ratio = $state(ratioGetter(uuid));
    let component: HTMLElement | null = $state(null);
    let sidebar: JQuery<HTMLElement> | null = null;

    onMount(() => 
    {
        if (component)
        {
            sidebar = jQuery(component).closest('.la-root').find('.la-SVELTE-SIDEBAR');
            if (sidebar)
                sidebar.css('flex', ratio.toString());
        }
    });

    function handleOnInput(event: Event)
    {
        const target = event.target as HTMLInputElement;
        const value = parseFloat(target.value);
        if (sidebar)
            sidebar.css('flex', value.toString());
        ratioSetter(uuid, value);
    }
    
</script>
<!-- Ratio Slider -->
{#if advancedOptions}
<div class="{style?.join(' ')}"
    bind:this={component}
>
    <input type="range"
        class="la-range -glow-active-hover"
        min={0.5}
        max={2}
        value={ratio}
        step={0.1}
        data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.sidebarRatio.tooltip"))}
        data-tooltip-class={"la-tooltip clipped-bot"}
        data-tooltip-direction={TooltipDirection.UP}
        oninput={event => handleOnInput(event)}
    />
</div>
{/if}
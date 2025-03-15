<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { advancedStates } from "@/scripts/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { setSidebarRatio } from "@/scripts/settings/mech-sheet";

    const props = $props();
    const { 
        actor, 
    }: MechSheetProps = props
    
    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);// This is initialized in the Header's onMount function
    
    // Dragging ---------------------------------------------------------------
    let dragging = false;
    let offset = { x: 0, y: 0 };
    let position = $state({ x: 0, y: 0 });

    $effect(() => {
        console.log('Header content width:', getBoundedRatio(position.x), position.x);
    });

    function handlePointerDown(event: PointerEvent) 
    {
        if (!advancedOptions) return;

        const image = event.currentTarget as HTMLImageElement;
        dragging = true;

        offset = {
            x: event.clientX - image.offsetLeft,
            y: event.clientY - image.offsetTop
        };
    }

    function handlePointerMove(event: PointerEvent) 
    {
        if (dragging) 
            position = {
                x: event.clientX - offset.x,
                y: event.clientY - offset.y
            };
    }

    function handlePointerUp(_event: PointerEvent, _callback?: () => void) 
    {
        dragging = false;
        // if (callback)
        //     callback();
    }

    function getBoundedRatio(position: number)
    {
        const width = jQuery('.la-header-content').width()!;
        const ratio = position / width * 2;
        return Math.min(Math.max(ratio, 1/3), 1/2);
    }
</script>
<!-- Ratio Slider -->
{#if advancedOptions}
<div class="-positionabsolute -bottom0 -leftthird"
        style="z-index: 1; margin-left: -3rem;"
>
    <div class="la-combine-h -fontsize4"
        style="margin-left: {position.x}px;"
        onpointerdown={event => handlePointerDown(event)}
        onpointermove={event => handlePointerMove(event)}
        onpointerup={event => handlePointerUp(event, () => { setSidebarRatio(actor.uuid, getBoundedRatio(position.x)); })}
        onpointerleave={event => handlePointerUp(event, () => { setSidebarRatio(actor.uuid, getBoundedRatio(position.x)); })}
    >
        <i class="mdi mdi-arrow-left-thin"></i>
        <i
            class="mdi mdi-mouse la-text-background -fontsize3 -pointermove"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.SETTINGS.mech.ratio.tooltip"))}
            data-tooltip-class={"la-tooltip clipped-bot"}
            data-tooltip-direction={TooltipDirection.UP}
        >
        </i>
        <i class="mdi mdi-arrow-right-thin"></i>
    </div>
</div>
{/if}
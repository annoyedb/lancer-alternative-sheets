<script lang="ts">
    import type { BoundImageProps } from "@/interfaces/actor/BoundImageProps";
    import { id as moduleID } from '@/module.json';
    import { getAdvancedState } from "@/scripts/store/advanced";

    const {
        children,
        image,
        uuid,
        xySetter,
        yGetter,
        ySetter,
        xGetter,
        xSetter,
    }: BoundImageProps = $props();

    let advancedOptions = $derived(getAdvancedState(uuid));

    // Dragging ---------------------------------------------------------------
    let dragging = false;
    let offset = { x: 0, y: 0 };
    let position = $state({ 
        x: xGetter ? xGetter(uuid) : 0, 
        y: yGetter ? yGetter(uuid) : 0 
    });

    function handlePointerDown(event: PointerEvent) 
    {
        if (!advancedOptions) return;

        dragging = true;

        offset = {
            x: event.clientX - position.x,
            y: event.clientY - position.y
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

    function handlePointerUp(_event: PointerEvent, callback?: () => void) 
    {
        if (dragging && callback)
            callback();
        dragging = false;
    }

    function handleAssignment(event: PointerEvent)
    {
        handlePointerUp(event, () => {
            // NOTE: Better to just handle these seperately the avoid weird (threading?race?idk) conditions
            // in any case, it's better to just handle it one call over the network anyway
            if (xySetter)
            {
                xySetter(uuid, position.x, position.y);
            }
            if (ySetter) 
            {
                ySetter(uuid, position.y);
            }
            if (xSetter) 
            {
                xSetter(uuid, position.x);
            }
        });
    }

</script>
<!-- (#2) -->
<!-- svelte-ignore event_directive_deprecated -->
<div class="la-boundimage -flex1 -widthfull -heightfull"
    >
    {#if children}
        {@render children()}
    {/if}
    <img 
        class="la-boundimage__image -heightfull -overflowhidden -float-r
            {advancedOptions ? "-pointermove" : ""}" 
        src={image} 
        alt={`modules/${moduleID}/assets/assets/nodata.png`}
        style="
            margin-top: { xySetter || ySetter ? position.y : 0 }px;
            margin-right: { xySetter || xSetter ? -position.x : 0 }px;
            mask-image: linear-gradient(to bottom, black 6.6rem, transparent calc(10rem - { position.y }px));
            -webkit-mask-image: linear-gradient(to bottom, black 6.6rem, transparent calc(10rem - { position.y }px));
            -moz-mask-image: linear-gradient(to bottom, black 6.6rem, transparent calc(10rem - { position.y }px));"
        on:pointerdown={event => handlePointerDown(event)}
        on:pointermove={event => handlePointerMove(event)}
        on:pointerup={ handleAssignment }
        on:pointerleave={ handleAssignment }
        draggable={false}
    />
</div>
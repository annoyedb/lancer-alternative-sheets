<script lang="ts">
    import type { BoundImageProps } from "@/interfaces/actor/BoundImageProps";
    import { id as moduleID } from '@/module.json';
    import { advancedStates } from "@/scripts/advanced";

    const {
        image,
        uuid,
        yGetter,
        ySetter,
    }: BoundImageProps = $props();

    let advancedOptions = $derived($advancedStates[uuid]?.enabled || false);// This is initialized in the Header's onMount function

    // Dragging ---------------------------------------------------------------
    let dragging = false;
    let offset = { x: 0, y: 0 };
    let position = $state({ x: 0, y: yGetter ? yGetter(uuid) : 0 });

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

    function handlePointerUp(_event: PointerEvent, callback?: () => void) 
    {
        dragging = false;
        if (callback)
            callback();
    }
</script>
<!-- (#2) -->
<!-- svelte-ignore event_directive_deprecated -->
<div class="la-mechhead__container -flex1 -widthfull -heightfull">
    <img 
        class="la-mechhead__img -heightfull -overflowhidden -float-r
            {advancedOptions ? "-pointermove" : ""}" 
        src={image} 
        alt={`modules/${moduleID}/assets/assets/nodata.png`}
        style="
            margin-top: { position.y }px;
            mask-image: linear-gradient(to bottom, black 6.6rem, transparent calc(10rem - { position.y }px));
            -webkit-mask-image: linear-gradient(to bottom, black 6.6rem, transparent calc(10rem - { position.y }px));
            -moz-mask-image: linear-gradient(to bottom, black 6.6rem, transparent calc(10rem - { position.y }px));"
        on:pointerdown={event => handlePointerDown(event)}
        on:pointermove={event => handlePointerMove(event)}
        on:pointerup={event => ySetter ? handlePointerUp(event, () => { ySetter(uuid, position.y); }) : undefined }
        on:pointerleave={event => ySetter ? handlePointerUp(event, () => { ySetter(uuid, position.y); }) : undefined }
        draggable={false}
    />
</div>
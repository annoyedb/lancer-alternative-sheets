<script lang="ts">
    import { id as moduleID } from '@/module.json';
    import { resetLog, sendToLog } from '@/scripts/store/text-log';
    import { browseTokenImage, getLocalized, getMimeType } from "@/scripts/helpers";
    import { TextLogHook } from '@/enums/TextLogHook';

    const { 
        actor,
    } = $props();
    const actorImgVid = actor.prototypeToken?.texture.src ?? actor.img;
    const srcImage = actorImgVid === "systems/lancer/assets/icons/mech.svg" || actorImgVid === "icons/svg/mystery-man.svg" 
        ? `modules/${moduleID}/assets/nodata.png` 
        : actorImgVid
    const tokenVideoMimeType = getMimeType(actorImgVid);
</script>

<div class="la-combine-h">
{#if tokenVideoMimeType}
    <!-- svelte-ignore a11y_media_has_caption -->
    <video autoplay loop
        class="la-actor__img -pointercursor"
        onpointerenter={ event => sendToLog(event, getLocalized("LA.edit.image.tooltip"), TextLogHook.MechHeader) }
        onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
        onclick={event => browseTokenImage(event, actor)}
    >
        <source src={actorImgVid} type={tokenVideoMimeType}>
    </video>
{:else}
    <button type="button"
        onpointerenter={ event => sendToLog(event, getLocalized("LA.edit.image.tooltip"), TextLogHook.PilotHeader) }
        onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
        onclick={event => browseTokenImage(event, actor)}
    >
        <img 
            class="la-actor__img -pointercursor" 
            src={srcImage}
            alt={getLocalized("LA.placeholder")}
        >
    </button>
{/if}
</div>
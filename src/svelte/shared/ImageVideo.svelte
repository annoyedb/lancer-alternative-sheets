<script lang="ts">
    import { id as moduleID } from '@/module.json';
    import { resetTextConsole, sendToTextConsole } from '@/scripts/store/text-log';
    import { getActorContext } from '@/scripts/context';
    import { getLocalized, getVideoMimeType } from "@/scripts/helpers";
    import type { TextLogEventProps } from '@/interfaces/actor/TextLogEventProps';
    import type { TooltipProps } from '@/interfaces/actor/TooltipProps';
    import { TooltipDirection } from '@/enums/TooltipDirection';
    import { TooltipFactory } from '@/classes/TooltipFactory';
    import type { PointerClickProps } from '@/interfaces/actor/events/PointerClickProps';

    const { 
        actor,
        editDisabled,

        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipClass,
        tooltipTheme,
        tooltipDirection,

        logText,
        logging: loggingEnabled,

        onPointerClick,
    }: {actor: any; editDisabled?: boolean;} & TooltipProps & TextLogEventProps & PointerClickProps = $props();
    const actorUuid = getActorContext()?.uuid;
    const actorImgVid = $derived(actor.prototypeToken?.texture.src ?? actor.img);
    const srcImage = $derived(actorImgVid === "icons/svg/mystery-man.svg"
        ? `modules/${moduleID}/assets/nodata.png`
        : actorImgVid);
    const tokenVideoMimeType = $derived(getVideoMimeType(actorImgVid));

    const tip = $derived(TooltipFactory.buildTooltip(tooltip || getLocalized("LA.edit.image.token.tooltip"), tooltipHeader));
    const tokenErrorTip = $derived(TooltipFactory.buildTooltip(getLocalized("LA.edit.image.token.error")));

    const logging = $derived(loggingEnabled && !editDisabled);
    const log = $derived(logText || getLocalized("LA.edit.image.token.tooltip"));
</script>

<div class="la-flexrow">
{#if tokenVideoMimeType}
    <video autoplay loop muted
        class="la-actor__img {editDisabled ? '-pointerdisable' : '-pointercursor'}"
        data-tooltip={tooltipEnabled 
            ? !editDisabled 
                ? tip
                : tokenErrorTip
            : undefined }
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
        onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
        onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
        onclick={editDisabled ? undefined : onPointerClick}
    >
        <source src={actorImgVid} type={tokenVideoMimeType}>
    </video>
{:else}
    <button type="button"
        class="{editDisabled ? '-pointerblock' : ''}"
        data-tooltip={tooltipEnabled 
            ? !editDisabled 
                ? tip
                : tokenErrorTip
            : undefined }
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
        onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
        onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
        onclick={editDisabled ? undefined : onPointerClick}
    >
        <img 
            class="la-actor__img" 
            src={srcImage}
            alt={getLocalized("LA.placeholder")}
        >
    </button>
{/if}
</div>
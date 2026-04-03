<script lang="ts">
    import { id as moduleID } from '@/module.json';
    import { resetLog, sendToLog } from '@/scripts/store/text-log';
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
        logType,
        logTypeReset,

        onPointerClick,
    }: {actor: any; editDisabled?: boolean;} & TooltipProps & TextLogEventProps & PointerClickProps = $props();
    const actorImgVid = actor.prototypeToken?.texture.src ?? actor.img;
    const srcImage = actorImgVid === "icons/svg/mystery-man.svg" 
        ? `modules/${moduleID}/assets/nodata.png` 
        : actorImgVid
    const tokenVideoMimeType = getVideoMimeType(actorImgVid);
    
    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.edit.token.tooltip"), tooltipHeader);
    const tokenErrorTip = TooltipFactory.buildTooltip(getLocalized("LA.edit.token.error"))

    const logging = logType && logTypeReset && !editDisabled;
    const log = logText || getLocalized("LA.edit.token.tooltip");
</script>

<div class="la-combine-h">
{#if tokenVideoMimeType}
    <video autoplay loop
        class="la-actor__img {editDisabled ? "-pointerdisable" : "-pointercursor"}"
        data-tooltip={tooltipEnabled 
            ? !editDisabled 
                ? tip
                : tokenErrorTip
            : undefined }
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        onclick={editDisabled ? undefined : onPointerClick}
    >
        <track kind="captions">
        <source src={actorImgVid} type={tokenVideoMimeType}>
    </video>
{:else}
    <button type="button"
        class="{editDisabled ? "-pointerblock" : ""}"
        data-tooltip={tooltipEnabled 
            ? !editDisabled 
                ? tip
                : tokenErrorTip
            : undefined }
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
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
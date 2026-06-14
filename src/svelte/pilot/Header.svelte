<script lang="ts">
    import { onMount } from "svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { browseActorImage, getLocalized, photosensitiveStyling } from "@/scripts/helpers";
    import {
        getActorTokenSync,
        getImageOffsetX,
        getImageOffsetY,
        getImageWidth,
        getPilotSheetTooltipEnabled,
        setActorTokenSync,
        setImageBatched,
        setImageOffsetXY,
        setImageWidth
    } from "@/scripts/pilot/settings";
    import { getAdvancedState, getTokenImageLock, setTokenImageLock } from "@/scripts/store/advanced";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import AdvancedButton from "@/svelte/shared/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/shared/BoundImage.svelte";
    import TextLog from "@/svelte/shared/TextLog.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import LockImageButton from "@/svelte/shared/button/LockImageButton.svelte";
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    const props = $props();
    const {
        actor,
        system,
        owner,
    } : PilotSheetProps = $derived(props);

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = getExtraEffectsEnabled();
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const tokenImageLocked = $derived(getTokenImageLock(actor.uuid));
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
    let imageComponent: BoundImage;

    onMount(() => {
        setTokenImageLock(actor.uuid, getActorTokenSync(actor.uuid));
    });

    function resetImageSettings()
    {
        imageComponent.resetLocalState();
        setImageBatched(actor.uuid, 0, 0, 0);
    }
</script>

<!-- Advanced Options Toggle -->
{#snippet advancedOptionsToggle()}
<div
    class="la-settings__island la-flexcol -alignend -padding1-r -positionabsolute -right0 -top0"
    style="z-index: 2;"
>
    <div
        class="la-flexrow -alignend"
    >
    {#if advancedOptions}
        <i
            class="mdi mdi-mouse-move-vertical -fontsize6 la-text-header la-prmy-primary
                {qualityMode ? '-glow-prmy' : ''}"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized(["LA.advanced.imageOffset.tooltip", "LA.advanced.imageSize.tooltip"]))}
            data-tooltip-class="clipped-bot la-tooltip {theme}"
            data-tooltip-direction={TooltipDirection.LEFT}
        ></i>
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-image-sync -fontsize6 la-text-header -width7 la-prmy-primary la-scdy-header",
                qualityMode ? "-glow-prmy -glow-scdy-hover" : ""]}
            onClick={resetImageSettings}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltip={getLocalized("LA.edit.image.reset.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
            logText={getLocalized("LA.edit.image.reset.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
        />
    {/if}
        <AdvancedButton
            style={["-fontsize5 la-prmy-primary la-scdy-header",
                qualityMode ? "-glow-prmy -glow-scdy-hover" : ""]}
            uuid={actor.uuid}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
        />
    </div>
{#if advancedOptions}
    <LockImageButton
        style="-fontsize7 la-text-header la-prmy-primary la-scdy-header
            {qualityMode ? '-glow-prmy -glow-scdy-hover' : ''}"
        actor={actor}
        setState={setActorTokenSync}
        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.LEFT}
        logType={TextLogHook.PilotHeader}
        logTypeReset={TextLogHook.PilotHeaderReset}
    />
    {#if !tokenImageLocked}
    <GlyphButton
        flowClass={FlowClass.None}
        style={["mdi mdi-image-edit -fontsize6 la-text-header -width7 la-prmy-primary la-scdy-header",
            qualityMode ? "-glow-prmy -glow-scdy-hover" : ""]}
        onClick={event => browseActorImage(event, actor)}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.edit.image.actor.tooltip")}
        tooltipDirection={TooltipDirection.LEFT}
        logText={getLocalized("LA.edit.image.actor.tooltip")}
        logType={TextLogHook.PilotHeader}
        logTypeReset={TextLogHook.PilotHeaderReset}
    />
    {/if}
{/if}
</div>
{/snippet}

<!-- Name, Callsign, Background -->
{#snippet identificationMain()}
<div class="la-actorname la-flexcol -padding3-l -padding3-t -widthfull">
    <div class="la-flexrow -widthfull">
        <input type="text"
            class="la-actorname__input la-pilotname la-text-header -fontsize6 -upper -letterspacing1 -textalignleft -textoverflowellipsis
                charname"
            name={"name"}
            value={actor.name}
            placeholder={getLocalized("LA.namePlaceholder")}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.alias.tooltip"), TextLogHook.PilotHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
        />
        <span class="-fontsizesmall la-text-darken-4 -fontface-stylized">
            {getLocalized("LA.pilot.alias.label")}
        </span>
    </div>
</div>
{/snippet}

{#snippet identificationSecondary()}
<div class="la-actorname la-flexcol -padding3-l -widthfull">
    <div class="la-flexrow -widthfull">
        <input type="text"
            class="la-actorname__input la-callsign la-text-header -upper -fontsize4 -letterspacing0 -textalignleft -fontface-stylized
                charname"
            name={"system.callsign"}
            value={system.callsign}
            placeholder={getLocalized("LA.placeholder")}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.callsign.tooltip"), TextLogHook.PilotHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
        />
        <span class="-fontsizesmall la-text-darken-4 -fontface-stylized">
            {getLocalized("LA.pilot.callsign.label")}
        </span>
    </div>
    <div class="la-flexrow -widthfull">
        <input type="text"
            class="la-actorname__input la-pilotbackground la-text-header -upper -fontsizemedium -letterspacing0 -textalignleft -fontface-stylized
            charname"
            name={"system.background"}
            value={system.background}
            placeholder={getLocalized("LA.placeholder")}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.background.tooltip"), TextLogHook.PilotHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
        />
        <span class="-fontsizesmall la-text-darken-4 -fontface-stylized">
            {getLocalized("LA.pilot.background.label")}
        </span>
    </div>
</div>
{/snippet}

<!-- Text Log -->
{#snippet textLog()}
<span
    class="la-textlog__wrapper -left0 -positionabsolute -padding1
        -pointerdisable"
>
    <TextLog
        style={["-widthfull -heightfull -fontface-stylized"]}
        uuid={actor.uuid}
        hookID={TextLogHook.PilotHeader}
        hookResetID={TextLogHook.PilotHeaderReset}
        runIntro={false}
    />
</span>
{/snippet}

{#snippet actorImage()}
<BoundImage bind:this={imageComponent}
    image={actor.img}
    uuid={actor.uuid}
    yGetter={getImageOffsetY}
    xGetter={getImageOffsetX}
    xySetter={setImageOffsetXY}
    widthGetter={getImageWidth}
    widthSetter={setImageWidth}
>
</BoundImage>
{/snippet}

{#snippet actorImageFluff()}
<div
    class="la-pilotfluff la-flexrow -positionabsolute la-flexcol -padding0-lr -pointerdisable"
>
    <span class="la-text-darken-2 -textalignjustify -flex1">
        {getLocalized("LA.pilot.fluff.1")} {getLocalized("LA.pilot.fluff.1")} {getLocalized("LA.pilot.fluff.1")}
    </span>
</div>
<div class="-positionrelative">
    <div
        class="la-flexcol -positionabsolute -padding3-t -padding1-lr la-text-lighten-7"
    >
        <div
            class="la-flexrow -justifystart -widthfull"
        >
            <i class="mdi mdi-fingerprint -fontsize6"></i>
            <span class="-fontsizesmall -aligncontentcenter -fontface-stylized">
                {getLocalized("LA.pilot.fluff.2")}
            </span>
        </div>
        <div
            class="la-flexrow -justifystart -widthfull"
        >
            {#if owner}
                <i class="mdi mdi-cable-data -fontsize6"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized">
                {getLocalized("LA.pilot.isOwner.label")}
            </span>
            {:else}
                <i class="mdi mdi-cable-data -fontsize6 {photosensitiveStyling('horus--subtle')}"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized {photosensitiveStyling('horus--subtle')}">
                {getLocalized("LA.pilot.isLimited.label")}
            </span>
            {/if}
        </div>
        <div
            class="la-flexrow -justifystart -widthfull"
        >
            {#if system.hp.value >= system.hp.max}
                <i class="mdi mdi-heart-pulse -fontsize6"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized">
                {getLocalized("LA.pilot.activity.1.label")}
            </span>
            {:else if system.hp.value <= system.hp.max && system.hp.value > system.hp.max * 0.75}
                <i class="mdi mdi-heart-pulse -fontsize6"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized">
                {getLocalized("LA.pilot.activity.2.label")}
            </span>
            {:else if system.hp.value <= system.hp.max * 0.75 && system.hp.value > system.hp.max * 0.5}
                <i class="mdi mdi-heart-pulse -fontsize6 {photosensitiveStyling('horus--subtle')}"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized {photosensitiveStyling('horus--very--subtle')}">
                {getLocalized("LA.pilot.activity.3.label")}
            </span>
            {:else if system.hp.value <= system.hp.max * 0.5 && system.hp.value > system.hp.max * 0.25}
                <i class="mdi mdi-heart-pulse -fontsize6 {photosensitiveStyling('horus--subtle')}"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized {photosensitiveStyling('horus--very--subtle')}">
                {getLocalized("LA.pilot.activity.4.label")}
            </span>
            {:else if system.hp.value <= system.hp.max * 0.25 && system.hp.value > 0}
                <i class="mdi mdi-heart-pulse -fontsize6 {photosensitiveStyling('horus--subtle')}"></i>
                <span class="-fontsizesmall -aligncontentcenter -fontface-stylized {photosensitiveStyling('horus--subtle')}">
                {getLocalized("LA.pilot.activity.5.label")}
            </span>
            {:else}
                <i class="mdi mdi-heart-pulse -fontsize6 {photosensitiveStyling('horus--subtle')}"></i>
                <span class="-fontsizesmall -aligncontentcenter {photosensitiveStyling('horus--subtle')}">
                {getLocalized("LA.pilot.activity.6.label")}
            </span>
            {/if}
        </div>
    </div>
</div>
{/snippet}

<!-- Header -->
<div
    class="la-header-content -positionrelative -heightfull -overflowhidden -aligncontentstart"
    style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto auto;"
>
    {@render advancedOptionsToggle()}
    <div
        class="-positionrelative -alignstart -overflowhidden"
        style="grid-area: 1 / 1; z-index: 0;"
    >
        {@render identificationMain()}
    </div>

    <hr class="la-divider-h -spacemedium -padding0-b la-bckg-header"
        style="grid-area: 2 / 1 / 2 / -1; z-index: 1;" />

    <div
        class="-positionrelative -overflowhidden"
        style="grid-area: 3 / 1; z-index: 0;"
    >
        {@render identificationSecondary()}
    </div>

    <div
        class="-positionabsolute -widthhalf -right0 -top0"
        style="z-index: 0;"
    >
        {@render actorImageFluff()}
    </div>
    <div
        class="-positionabsolute -widthhalf -right0 -top0"
        style="z-index: 1;"
    >
        {@render actorImage()}
    </div>

    {@render textLog()}
</div>
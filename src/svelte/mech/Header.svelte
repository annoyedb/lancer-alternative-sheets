<script lang="ts">
    import { onMount } from "svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";

    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogIntro } from "@/enums/TextLogIntro";
    import { TextLogHook } from "@/enums/TextLogHook";

    import { browseActorImage, getLocalized, logographicLanguage, photosensitiveStyling } from "@/scripts/helpers";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import {
        getActorTokenSync,
        getImageOffsetX,
        getImageOffsetY,
        getImageWidth,
        getMechSheetTooltipEnabled,
        setActorTokenSync,
        setImageBatched,
        setImageOffsetXY,
        setImageWidth,
    } from "@/scripts/mech/settings";
    import {
        getAdvancedState,
        getTokenImageLock,
        setTokenImageLock,
    } from "@/scripts/store/advanced";
    import { getIntroRun, resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    import TerminalText from "@/svelte/shared/TerminalText.svelte";
    import AdvancedButton from "@/svelte/shared/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/shared/BoundImage.svelte";
    import TextLog from "@/svelte/shared/TextLog.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import LockImageButton from "@/svelte/shared/button/LockImageButton.svelte";

    const props = $props();
    const {
        actor,
        pilot 
    }: MechSheetProps = $derived(props);

    const logographic = logographicLanguage();
    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = getExtraEffectsEnabled();

    const introPlayed = $derived(getIntroRun(actor.uuid));
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const tokenImageLocked = $derived(getTokenImageLock(actor.uuid));
    const theme = $derived(getCSSDocumentTheme(actor.uuid));

    let imageComponent: BoundImage;

    function resetImageSettings(uuid: string, imageComponent: BoundImage)
    {
        imageComponent.resetLocalState();
        setImageBatched(uuid, 0, 0, 0);
    }

    onMount(() => {
        setTokenImageLock(actor.uuid, getActorTokenSync(actor.uuid));
    });
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
            onClick={() => resetImageSettings(actor.uuid, imageComponent)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltip={getLocalized("LA.edit.image.reset.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
            logText={getLocalized("LA.edit.image.reset.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    {/if}
        <AdvancedButton
            style={["-fontsize5 la-prmy-primary la-scdy-header",
            qualityMode ? "-glow-prmy -glow-scdy-hover" : ""]}
            uuid={actor.uuid}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
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
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
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
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
{/if}
{/if}
</div>
{/snippet}

<!-- Mech/Pilot Name -->
{#snippet identificationMain()}
<div
    class="la-actorname la-flexcol -padding3-l -padding3-t -widthfull"
>
    <div class="la-flexrow -widthfull">
        <input type="text"
            class="la-actorname__input la-text-header -fontsize6 -upper -letterspacing1 -textalignleft -textoverflowellipsis
                charname"
            name={"name"}
            value={actor.name}
            placeholder={getLocalized("LA.namePlaceholder")}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.mech.name.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
        />
        <span class="-fontsizesmall la-text-darken-4 -fontface-stylized">
            {getLocalized("LA.name.label")}
        </span>
    </div>
</div>
{/snippet}

{#snippet identificationSecondary()}
<div class="la-actorname la-flexcol -padding3-l -widthfull -">
    <div class="la-flexrow -widthfull">
        <span role="none"
            class="la-actorname__span la-callsign -widthfull la-text-header -upper -letterspacing0 -fontface-stylized
                ref set pilot click-open"
            data-uuid={pilot?.uuid}
            data-path={"system.pilot"}
            data-accept-types={"pilot"}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.open.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
        >
            <TerminalText
                text="LL{pilot?.system.level || '?'}"
                extensionText={`--${getLocalized('LA.search.label')}`}
                textStyle={["-fontsizemedium la-prmy-header"]}
                disableCmdline={true}
            >
                <span class="-fontsize4">
                    {pilot?.system.callsign || getLocalized("LA.pilotPlaceholder")}
                </span>
            </TerminalText>
        </span>
        <span class="-fontsizesmall la-text-darken-4 -fontface-stylized">
            {getLocalized("LA.pilot.label")}
        </span>
    </div>
{#if pilot?.system.active_mech?.value?.uuid !== actor.uuid}
    <div
        class="la-flexrow -widthfull -fontface-stylized -fontsizesmall
            {photosensitiveStyling('horus--very--subtle')}"
    >{getLocalized("LA.mech.noPilot.label")}</div>
{/if}
</div>
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
></BoundImage>
{/snippet}

{#snippet textLog()}
{#if pilot?.system.active_mech?.value?.uuid === actor.uuid}
<span
    class="la-textlog__wrapper -left0 -positionabsolute -padding1
        -pointerdisable"
>
    <TextLog
        style={["-widthfull -heightfull -fontface-stylized", logographic ? "-fontsize3" : "-fontsizemediumer"]}
        uuid={actor.uuid}
        hookID={TextLogHook.MechHeader}
        hookResetID={TextLogHook.MechHeaderReset}
        introType={TextLogIntro.Header}
        runIntro={!introPlayed}
    />
</span>
{/if}
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

    <hr
        class="la-divider-h -spacemedium -padding0-b la-bckg-header"
        style="grid-area: 2 / 1 / 2 / -1; z-index: 1;"
    />

    <div
        class="-positionrelative -overflowhidden"
        style="grid-area: 3 / 1; z-index: 0;"
    >
        {@render identificationSecondary()}
    </div>

    <div
        class="-positionabsolute -widthhalf -right0 -top0"
        style="z-index: 1;"
    >
        {@render actorImage()}
    </div>

    {@render textLog()}
</div>
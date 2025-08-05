<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { browseActorImage, getLocalized } from "@/scripts/helpers";
    import { getImageOffsetX, getImageOffsetY, getPilotSheetTooltipEnabled, setImageOffsetXY } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getIntroRun, resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/actor/BoundImage.svelte";
    import TextLog from "@/svelte/actor/TextLog.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

    const props = $props();
    const {
        actor,
        system,
        owner,
    } : PilotSheetProps = props;
    let introPlayed = $derived(getIntroRun(actor.uuid));
    let advancedOptions = $derived(getAdvancedState(actor.uuid));

    const tooltipEnabled = getPilotSheetTooltipEnabled();
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <!-- Advanced Options Toggle -->
    <div 
        class="la-combine-v -alignend la-settings__island -padding1 -positionabsolute -right0 -top0" 
        style="z-index: 2;"
    >
        <div
            class="la-combine-h"
        >
        {#if advancedOptions}
            <i 
                class="mdi mdi-mouse-move-vertical -fontsize4 -aligncontentcenter la-text-header -glow-prmy la-prmy-primary"
                data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.imageOffset.tooltip"))}
                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.LEFT}
            ></i>
        {/if}
            <AdvancedButton
                style={["-fontsize3", "-glow-prmy", "la-prmy-primary"]}
                uuid={actor.uuid}
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        </div>
    {#if advancedOptions}
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-image-edit", "-fontsize4", "la-text-header", "-width5", "-glow-prmy", "la-prmy-primary"]}
            onClick={event => browseActorImage(event, actor)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.edit.image.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
            logText={getLocalized("LA.edit.image.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
        />
    {/if}
    </div>
    <div class="la-names -margin3-l -margin3-t -flex1">
        <div class="la-combine-h">
            <input type="text"
                class="la-actorname__input la-text-header -fontsize4 -upper -letterspacing1
                    charname"
                name={"name"}
                value={actor.name}
                placeholder={getLocalized("LA.namePlaceholder")}
                onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.alias.tooltip"), TextLogHook.PilotHeader) }
                onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
            />
            <span class="-fontsize0 la-text-darken-3">
                {getLocalized("LA.pilot.alias.label")}
            </span>
        </div>
        <hr class="la-divider-h -spacemedium -margin0-b la-bckg-header">
        <div class="la-combine-h">
            <input type="text"
                class="la-pilotcallsign__input la-text-header -upper -fontsize2 -letterspacing0
                    charname"
                name={"system.callsign"}
                value={system.callsign}
                placeholder={getLocalized("LA.placeholder")}
                onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.callsign.tooltip"), TextLogHook.PilotHeader) }
                onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
            />
            <span class="-fontsize0 la-text-darken-3">
                {getLocalized("LA.pilot.callsign.label")}
            </span>
        </div>
        <div class="la-combine-h">
            <input type="text"
                class="la-pilotbackground__input la-text-header -upper -fontsize1 -letterspacing0
                    charname"
                name={"system.background"}
                value={system.background}
                placeholder={getLocalized("LA.placeholder")}
                onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.background.tooltip"), TextLogHook.PilotHeader) }
                onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
            />
            <span class="-fontsize0 la-text-darken-3">
                {getLocalized("LA.pilot.background.label")}
            </span>
        </div>
    </div>
    <span 
        class="la-textlog__wrapper -left0 -positionabsolute -padding1
            -pointerdisable"
    >
        <TextLog
            style={["-widthfull", "-heightfull"]}
            uuid={actor.uuid}
            hookID={TextLogHook.PilotHeader}
            hookResetID={TextLogHook.PilotHeaderReset}
            runIntro={!introPlayed}
        />
    </span>
    <BoundImage
        image={actor.img}
        uuid={actor.uuid}
        yGetter={getImageOffsetY}
        xGetter={getImageOffsetX}
        xySetter={setImageOffsetXY}
    >
        <div
            class="la-pilotfluff la-combine-h -positionabsolute la-combine-v -padding0-lr"
        >
            <span class="la-text-darken-2 -textalignjustify -flex1">
                {getLocalized("LA.pilot.fluff.1")}
            </span>
        </div>
        <div class="-positionrelative">
            <div 
                class="la-combine-v -positionabsolute -margin3-t -margin1-lr la-text-lighten-7"
            >
                <div 
                    class="la-combine-h -justifystart -widthfull"
                >
                    <i class="mdi mdi-fingerprint -fontsize4"></i>
                    <span class="-fontsize0 -aligncontentcenter">
                        {getLocalized("LA.pilot.fluff.2")}
                    </span>
                </div>
                <div 
                    class="la-combine-h -justifystart -widthfull"
                >
                {#if owner}
                    <i class="mdi mdi-cable-data -fontsize4"></i>
                    <span class="-fontsize0 -aligncontentcenter">
                        {getLocalized("LA.pilot.isOwner.label")}
                    </span>
                {:else}
                    <i class="mdi mdi-cable-data -fontsize4 horus--subtle"></i>
                    <span class="-fontsize0 -aligncontentcenter horus--subtle">
                        {getLocalized("LA.pilot.isLimited.label")}
                    </span>
                {/if}
                </div>
                <div 
                    class="la-combine-h -justifystart -widthfull"
                >
                {#if system.hp.value >= system.hp.max}
                    <i class="mdi mdi-heart-pulse -fontsize4"></i>
                    <span class="-fontsize0 -aligncontentcenter">
                        {getLocalized("LA.pilot.activity.1.label")}
                    </span>
                {:else if system.hp.value <= system.hp.max && system.hp.value > system.hp.max * 0.75}
                    <i class="mdi mdi-heart-pulse -fontsize4"></i>
                    <span class="-fontsize0 -aligncontentcenter">
                        {getLocalized("LA.pilot.activity.2.label")}
                    </span>
                {:else if system.hp.value <= system.hp.max * 0.75 && system.hp.value > system.hp.max * 0.5}
                    <i class="mdi mdi-heart-pulse -fontsize4 horus--subtle"></i>
                    <span class="-fontsize0 -aligncontentcenter horus--very--subtle">
                        {getLocalized("LA.pilot.activity.3.label")}
                    </span>
                {:else if system.hp.value <= system.hp.max * 0.5 && system.hp.value > system.hp.max * 0.25}
                    <i class="mdi mdi-heart-pulse -fontsize4 horus--subtle"></i>
                    <span class="-fontsize0 -aligncontentcenter horus--very--subtle">
                        {getLocalized("LA.pilot.activity.4.label")}
                    </span>
                {:else if system.hp.value <= system.hp.max * 0.25 && system.hp.value > 0}
                    <i class="mdi mdi-heart-pulse -fontsize4 horus--subtle"></i>
                    <span class="-fontsize0 -aligncontentcenter horus--subtle">
                        {getLocalized("LA.pilot.activity.5.label")}
                    </span>
                {:else}
                    <i class="mdi mdi-heart-pulse -fontsize4 horus--subtle"></i>
                    <span class="-fontsize0 -aligncontentcenter horus--subtle">
                        {getLocalized("LA.pilot.activity.6.label")}
                    </span>
                {/if}
                </div>
            </div>
        </div>
    </BoundImage>
</div>
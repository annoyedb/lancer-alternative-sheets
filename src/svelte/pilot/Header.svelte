<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getLocalized } from "@/scripts/helpers";
    import { getImageOffsetX, getImageOffsetY, getPilotSheetTooltipEnabled, setImageOffsetX, setImageOffsetY } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getIntroRun, resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getDocumentTheme } from "@/scripts/theme";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/actor/BoundImage.svelte";
    import TextLog from "@/svelte/actor/TextLog.svelte";

    const props = $props();
    const {
        actor,
        system,
        owner,
    } = props;

    let introPlayed = $derived(getIntroRun(actor.uuid));
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <!-- Advanced Options Toggle -->
    <div 
        class="la-combine-v la-settings__island -padding1 -positionabsolute -right0 -top0" 
        style="z-index: 2;"
    >
        <AdvancedButton
            uuid={actor.uuid}
            tooltipEnabled={getPilotSheetTooltipEnabled()}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
        />
    {#if advancedOptions}
        <i 
            class="mdi mdi-mouse-move-vertical -fontsize4 -aligncontentcenter la-text-header"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.imageOffset.tooltip"))}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.LEFT}
        ></i>
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
        ySetter={setImageOffsetY}
        xGetter={getImageOffsetX}
        xSetter={setImageOffsetX}
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
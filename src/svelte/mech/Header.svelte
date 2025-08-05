<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { browseActorImage, getLocalized } from "@/scripts/helpers";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getImageOffsetY, getMechSheetTooltipEnabled, setImageOffsetY } from "@/scripts/mech/settings";
    import { getIntroRun, resetLog, sendToLog } from "@/scripts/store/text-log";
    import { TextLogIntro } from "@/enums/TextLogIntro";
    import { TextLogHook } from "@/enums/TextLogHook";
    import TerminalText from "@/svelte/actor/TerminalText.svelte";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/actor/BoundImage.svelte";
    import TextLog from "@/svelte/actor/TextLog.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

    const props = $props();
    const {
        actor,
        pilot 
    }: MechSheetProps = props
    let introPlayed = $derived(getIntroRun(actor.uuid));
    let advancedOptions = $derived(getAdvancedState(actor.uuid));

    const tooltipEnabled = getMechSheetTooltipEnabled();
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <!-- Advanced Options Toggle -->
    <div 
        class="la-combine-v -alignend la-settings__island -padding1 -positionabsolute -right0 -top0" 
        style="z-index: 3;"
    >
        <div
            class="la-combine-h"
        >
        {#if advancedOptions}
            <i 
                class="mdi mdi-mouse-move-vertical -fontsize4 -aligncontentcenter la-text-header -width5 -glow-prmy la-prmy-primary"
                data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.imageOffset.tooltip"))}
                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.LEFT}
            ></i>
        {/if}
            <AdvancedButton
                style={["-fontsize3", "-width5", "-glow-prmy", "la-prmy-primary"]}
                uuid={actor.uuid}
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
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
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    {/if}
    </div>
    <!-- Mech/Pilot Name -->
    <div class="la-names -margin3 -alignselfstart -flex1"
        style="z-index: 2;"
    >
        <div class="la-combine-h">
            <input type="text"
                class="la-actorname__input la-text-header -upper -fontsize5 -bold -letterspacing1
                    charname"
                name={"name"}
                value={actor.name}
                placeholder={getLocalized("LA.namePlaceholder")}
                onpointerenter={ event => sendToLog(event, getLocalized("LA.mech.name.tooltip"), TextLogHook.MechHeader) }
                onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
            />
            <span class="-fontsize0 la-text-darken-3">
                {getLocalized("LA.name.label")}
            </span>
        </div>
        <hr class="la-divider-h -large -spacemedium -margin0-b la-bckg-header">
        <div class="la-combine-h">
            <span class="la-pilotcallsign__span la-combine-h -justifystart -upper la-text-header -widthfull -overflowhidden
                    ref set pilot click-open"
                data-uuid={pilot?.uuid}
                data-path={"system.pilot"}
                data-accept-types={"pilot"}
                onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.open.tooltip"), TextLogHook.MechHeader) }
                onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
            >
                <TerminalText
                    text="LL{pilot?.system.level || 0}"
                    extensionText="--{getLocalized("LA.search.label")}"
                    textStyle={["-fontsize1", "la-prmy-header"]}
                    disableCmdline={true}
                >
                    <span class="-fontsize3">
                        {pilot?.system.callsign || getLocalized("LA.pilotPlaceholder")}
                    </span>
                </TerminalText>
            </span>
            <span class="-fontsize0 la-text-darken-3">
                {getLocalized("LA.pilot.label")}
            </span>
        </div>
    {#if pilot?.system.active_mech?.value?.uuid !== actor.uuid}
        <div>{getLocalized("LA.mech.noPilot.label")}</div>
    {/if}
    </div>
    {#if pilot?.system.active_mech?.value?.uuid === actor.uuid}
    <span 
        class="la-textlog__wrapper -left0 -positionabsolute -padding1
            -pointerdisable"
    >
        <TextLog
            style={["-widthfull", "-heightfull"]}
            uuid={actor.uuid}
            hookID={TextLogHook.MechHeader}
            hookResetID={TextLogHook.MechHeaderReset}
            introType={TextLogIntro.Header}
            runIntro={!introPlayed}
        />
    </span>
    {/if}
    <BoundImage
        image={actor.img}
        uuid={actor.uuid}
        yGetter={getImageOffsetY}
        ySetter={setImageOffsetY}
    />
</div>
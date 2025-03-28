<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { advancedStates } from "@/scripts/advanced";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/actor/BoundImage.svelte";
    import { getImageOffsetY, setImageOffsetY } from "@/scripts/mech/settings";
    import TextLog from "../actor/TextLog.svelte";
    import { TextLogIntro } from "@/enums/TextLogIntro";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { resetLog, sendToLog } from "@/scripts/text-log";

    const props = $props();
    const { 
        actor, 
        pilot 
    }: MechSheetProps = props
    
    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);// This is initialized in the Header's onMount function
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <!-- Advanced Options Toggle -->
    <div class="la-combine-v la-settings__island -padding1">
        <AdvancedButton
            uuid={actor.uuid}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    {#if advancedOptions}
        <i 
            class="mdi mdi-mouse-move-vertical -fontsize4 -aligncontentcenter la-text-header"
            data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.imageOffset.tooltip"))}
            data-tooltip-class={"la-tooltip clipped-bot"}
            data-tooltip-direction={TooltipDirection.LEFT}
        ></i>
    {/if}
    </div>
    <!-- Mech/Pilot Name -->
    <div class="la-names las-combine-v -flex1 -margin3">
        <input type="text"
            class="la-mechname__input la-text-header -upper -fontsize5
                charname"
            name={"name"}
            value={actor.name}
            placeholder="{getLocalized("LA.namePlaceholder")}"
            onpointerenter={ event => sendToLog(event, getLocalized("LA.mech.name.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
        />
        <hr class="la-divider-h -large -spacemedium -margin0-b la-bckg-header">
        <span class="la-pilotname__span -upper la-text-header -fontsize3
                ref set pilot click-open"
            data-uuid={pilot?.uuid}
            data-path={"system.pilot"}
            data-accept-types={"pilot"}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.open.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
        >
            {pilot?.system.callsign || getLocalized("LA.pilotPlaceholder")}
        </span>
    {#if pilot}
        <span class="la-pilotlevel__span -upper la-text-header">LL{pilot.system.level} </span>
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.search.label")}</span><!--
    ---><span class="la-cursor la-anim-header -fadein"></span>
    {/if}
    {#if pilot?.system.active_mech.value.uuid !== actor.uuid}
        <div>{getLocalized("LA.mech.noPilot.label")}</div>
    {/if}
    </div>
    {#if pilot?.system.active_mech.value.uuid === actor.uuid}
    <span class="la-textlog__wrapper -left0 -positionabsolute -padding1">
        <TextLog
            style={["-widthfull", "-heightfull"]}
            hookID={TextLogHook.MechHeader}
            hookResetID={TextLogHook.MechHeaderReset}
            introType={TextLogIntro.Header}
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
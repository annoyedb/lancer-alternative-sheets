<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { advancedStates } from "@/scripts/advanced";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import BoundImage from "@/svelte/actor/BoundImage.svelte";
    // import SidebarRatioHandle from "@/svelte/actor/button/SidebarRatioHandle.svelte";

    const props = $props();
    const { 
        actor, 
        pilot 
    }: MechSheetProps = props
    
    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);// This is initialized in the Header's onMount function

    // @ts-expect-error
    function getVersion()
    {
        // @ts-expect-error
        return game.release.version;
    }
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <!-- <SidebarRatioHandle
        {...props}
    /> -->
    <!-- Advanced Options Toggle -->
    <div class="la-combine-v la-settings__island -padding1">
        <AdvancedButton
            key={actor.uuid}
        />
        {#if advancedOptions}
            <i 
                class="mdi mdi-mouse-move-vertical -fontsize4 -aligncontentcenter"
                data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.imageOffset.tooltip"))}
                data-tooltip-class={"la-tooltip clipped-bot"}
                data-tooltip-direction={TooltipDirection.LEFT}
            ></i>
        {/if}
    </div>
    <div class="la-names las-combine-v -flex1 -margin3">
        <input 
            class="la-mechname__input la-text-header -upper -fontsize5
                charname"
            name="name" type="text" value="{actor.name}" 
            placeholder="{getLocalized("LA.namePlaceholder")}" />
        <hr class="la-divider-h -large -spacemedium -margin0-b la-bckg-header">
        <span class="la-pilotname__span -upper la-text-header -fontsize3
                ref set pilot click-open"
            data-uuid="{pilot ? pilot.uuid : ""}" 
            data-path="system.pilot"
            data-accept-types="pilot">{pilot ? pilot.system.callsign : getLocalized("LA.pilotPlaceholder")} </span>
    {#if pilot}
        <span class="la-pilotlevel__span -upper la-text-header">LL{pilot.system.level} </span>
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.search.label")}</span><!--
    ---><span class="la-cursor la-anim-header -fadein"></span>
    {/if}
    {#if pilot && pilot.system.active_mech.value.uuid !== actor.uuid}
        <div>{getLocalized("LA.mech.noPilot.label")}</div>
    {/if}
    </div>
    <BoundImage
        {...props}
    />
</div>
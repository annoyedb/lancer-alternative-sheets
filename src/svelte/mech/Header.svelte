<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';

    const { actor, pilot }: MechSheetProps = $props();

    async function openSheetSettings(_event: MouseEvent)
    {
        
    }

    function getVersion()
    {
        // @ts-expect-error
        return game.release.version;
    }
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <!-- Actor Sheet Settings -->
    {#if getVersion() >= 12}
    <div class="la-settings__island -padding1">
        <button type="button" 
            class=""
            aria-label="{getLocalized("LA.setting.customize.label")}"
            onclick={(event) => openSheetSettings(event)}
        >
            <i class="mdi mdi-cogs"></i>
        </button>
    </div>
    {/if}
    <div class="la-names las-combine-v -margin3">
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
    <img 
        class="la-mechhead__img" src="{actor.img}" 
        alt={`modules/${moduleID}/assets/assets/nodata.png`}
    />
</div>
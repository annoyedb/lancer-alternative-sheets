<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';

    const { actor, pilot }: MechSheetProps = $props();
</script>

<!-- Header -->
<div class="la-header-content la-combine-h">
    <div class="la-names las-combine-v -margin3">
        <input 
            class="la-mechname__input la-text-header -upper -fontsize5
                charname"
            name="name" type="text" value="{actor.name}" 
            placeholder="{getLocalized(" LA.namePlaceholder")}" />
        <hr class="la-divider-h -large -spacemedium la-bckg-header">
        <span class="la-pilotname__span -upper la-text-header -fontsize3
                ref set pilot click-open"
            data-uuid="{pilot ? pilot.uuid : ""}" 
            data-path="system.pilot"
            data-accept-types="pilot">{pilot ? pilot.system.callsign : getLocalized("LA.pilotPlaceholder")} </span>
    {#if pilot}
        <span class="la-pilotlevel__span -upper la-text-header">LL{pilot.system.level} </span>
        <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.search.label")}</span><!--
    ---><span class="la-cursor la-anim-header -fadein"></span>
    {:else}
        <div>{getLocalized("LA.mech.noPilot.label")}</div>
    {/if}
    </div>
    <img 
        class="la-mechhead__img" src="{actor.img}" 
        alt={`modules/${moduleID}/assets/assets/nodata.png`}
    />
</div>
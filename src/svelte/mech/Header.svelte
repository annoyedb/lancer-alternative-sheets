<script lang="ts">
    import type { MechSheetData } from "@/interfaces/actor/MechSheetData";
    import { getLocalized } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';

    const { actor, pilot }: MechSheetData = $props();
</script>

<header 
    class="la-header la-bg-scroll -flex0
        sheet-header">
    <!-- Header -->
    <div class="la-combine-h">
        <div class="la-names las-combine-v">
            <input 
                class="la-mechname__input la-text-header -upper
                    charname"
                name="name" type="text" value="{actor.name}" 
                placeholder="{getLocalized(" LA.namePlaceholder")}" />
            <hr class="la-divider-h -large -spacemedium la-bckg-header">
            <span class="la-pilotname__span -upper la-text-header \
                    ref set pilot click-open"
                data-uuid="{pilot ? pilot.uuid : ""}" 
                data-path="system.pilot"
                data-accept-types="pilot">{pilot ? pilot.system.callsign : getLocalized("LA.pilotPlaceholder")} </span>
        {#if pilot}
            <span class="la-pilotlevel__span -upper la-text-header"
                >LL{pilot.system.level}</span>
        {:else}
            <div>WARNING</div>
        {/if}
        </div>
        <img 
            class="la-mechhead__img" src="{actor.img}" 
            alt={`modules/${moduleID}/assets/assets/nodata.png`}
        />
    </div>
    <!-- Navigation -->
    <div class="la-island">
        <nav class="la-tabs la-bckg-pilot clipped-alt" 
            data-group="primary">
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="la-tab clipped-bot-alt la-text-header -fontsize2"
                data-tab="status" 
                data-text="{getLocalized("LA.tab.status.label")}">
                {getLocalized("LA.tab.status.label")}
            </a>
            <!-- svelte-ignore a11y_missing_attribute -->
            <a class="la-tab clipped-bot-alt la-text-header -fontsize2" 
                data-tab="loadout" 
                data-text="{getLocalized("LA.tab.loadout.label")}">
                {getLocalized("LA.tab.loadout.label")}
            </a>
        </nav>
    </div>
</header>

<style lang="scss">
    @use "src/styles/mech/header";
</style>
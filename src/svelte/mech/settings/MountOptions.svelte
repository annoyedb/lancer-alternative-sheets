<script lang="ts">
    import { MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { handleMountChange } from "@/scripts/mech/mount-helpers";

    const {
        actorSheet,
        mount,
        mountIndex,
        mountNames,
    } = $props();

    let bracing = $state(false);

    function swapMount(event: MouseEvent, mountIndex: number, morphIndex: number)
    {
        event.stopPropagation();
        let mountPath = `system.loadout.weapon_mounts.${mountIndex}`;
        handleMountChange(
            mount, 
            mountPath, 
            morphIndex, 
            bracing, 
            actorSheet,
            callback
        );
    }

    function callback(localizationString: string)
    {
        mountNames[mountIndex] = localizationString;
    }
</script>
<h3>{getLocalized(MOUNT_LOCALIZE_MAP[mount.type])}<i class="mdi mdi-arrow-down-right"></h3>
<div class="la-combine-v -widthfull -gap0 -padding0">
{#each Object.keys(MOUNT_LOCALIZE_MAP) as mountType, morphIndex}
    <!-- (#5*) 
    * Normally (#2) would apply here, 
    but because we're not concerned with event bubbling issues 
    because of (#5), we use the non-depreciated way of applying 
    the event. If this is changed, the issue turns to (#2) -->
    <button type="button"
        class="la-bckg-scrollbar-secondary la-text-header -fontsize1 -letterspacing0 la-prmy-secondary -glow-prmy-hover la-scdy-accent -glow-scdy-focus"
        onclick={event => swapMount(event, mountIndex, morphIndex)}
    >
        {getLocalized(MOUNT_LOCALIZE_MAP[mountType])}
    </button>
{/each}
    <div
        class="la-combine-h"
    >
        <input type="checkbox" 
            bind:checked={bracing}
        />
        <span
            class="-lineheight4"
        >
            {getLocalized("LA.mech.mount.locked.subLabel")}
        </span>
    </div>
</div>
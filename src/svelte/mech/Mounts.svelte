<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import MountSlots from "@/svelte/mech/MountSlots.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        collapse,
        system,
    } = props;

    let weaponMounts = system.loadout.weapon_mounts;
    
    function getCollapseID(index: number)
    {
        return `${actor.uuid}_mount_${index}`;
    }
</script>

{#if system.loadout.frame && weaponMounts.length}
{#each weaponMounts as mount, index}
    <HeaderMain
        title={getLocalized(MOUNT_LOCALIZE_MAP[mount.type])}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-brdr-primary"]}
        collapse={collapse}
        collapseID={getCollapseID(index)}
        startCollapsed={true}
        spTextStyle={["la-text-header", "-fontsize2"]}
        spIconStyle={["la-text-header", "-fontsize5", "-lineheight3", "-width3"]}
    >
    {#if mount.bracing}
        <details class="la-details -widthfull la-combine-v">
            <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l">
                <div class="la-left la-combine-h">
                    <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                    <span class="la-name__span -fontsize2">{getLocalized("LA.mech.mount.locked.label")}</span>
                </div>
            </summary>
            <div class="la-details-wrapper -borderoff">
                <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">{getLocalized("LA.mech.system.empty.subLabel")}</span>
            </div>
        </details>
    {:else}
        <MountSlots
            mount={mount}
            mountIndex={index}
            collapse={collapse}
        />
    {/if}
    </HeaderMain>
{/each}
{/if}